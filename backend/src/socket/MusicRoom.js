const User = require('../models/user');
const Link = require('../models/link');
const Message = require('../models/message');
const notificationTypes = require('../models/constants').notifications;
const youtube = require('./youtube');

const JOIN = 'JOIN';
const DISCONNECT = 'DISCONNECT';
const ADD = 'ADD';
const START_PLAYING = 'START_PLAYING';

module.exports.JOIN = JOIN;
module.exports.DISCONNECT = DISCONNECT;
module.exports.ADD = ADD;

class MusicRoom {
  constructor(room, socket) {
    Object.assign(this,
      room._doc,
      {
        users: {},
        socket,
        eventBus: {},
        playlist: [],
        rtvVotes: []
      }
    );

    this.___initializePlaylist().then(() => {
      setTimeout(() => {
        this.startPlaying();
      }, 1000);
    });
    this.___initializeEventbus();
  }

  isInRoom(userId) {
    return this.users.hasOwnProperty(userId);
  }

  add(data, userId) {
    if (!this.isInRoom(userId)) {
      return;
    }

    const { url } = data;
    if (!youtube.isValidUrl(url)) {
      this.sendNotification(userId, { 
        type: notificationTypes.error,
        message: 'Not a valid url!'
      });
      return;
    }

    return youtube.parseUrl(url).then((response) => {
      return youtube.findVideoById(response.videoId).then((metadata) => {
        const linkData = Object.assign({}, response, {
          submitter: userId,
          room: this._id,
          metadata,
          isActive: true
        });

        const link = new Link(linkData);

        return link.save().then(() => {
          const startPlaying = this.playlist.length === 0;
          this.playlist.push(link);

          this.sendNotification(userId, {
            type: notificationTypes.info,
            message: 'Successfully added video'
          });

          if (startPlaying) {
            this.notify({ type: START_PLAYING });
          }
        });
      }).catch((err) => {
        console.log(`ERROR FETCHING METADATA: ${JSON.stringify(err)}`);
        this.sendNotification(userId, {
          type: notificationTypes.error,
          message: 'Failed to add video'
        });
      });
    });
  }

  join(userId, socket) {
    if (this.isInRoom(userId)) {
      return;
    }

    this.users[userId] = socket;

    this.sendNotification(userId, {
      type: notificationTypes.info,
      message: 'Connected!'
    });

    this.notify({
      type: JOIN,
      userId
    });
  }

  leave(userId) {
    if (!this.isInRoom(userId)) {
      return;
    }

    delete this.users[userId];

    User.findOne({
      _id: userId
    }).then((user) => {
      this.notify({
        type: DISCONNECT,
        user
      });  
    });
  }

  notify(event) {
    console.log(`NOTIFICATION FIRED: ${JSON.stringify(event)}`);
    const keys = Object.keys(this.eventBus);
    keys.forEach((key) => {
      this.eventBus[key].apply(this, [event]);
    });
  }

  rtv(userId) {
    if (!this.latestLink) {
      return this.sendNotification(userId, {
        type: notificationTypes.error,
        message: 'Nothing is playing!'
      });
    }

    if (this.rtvVotes.indexOf(userId) === -1) {
      this.rtvVotes.push(userId);
    }

    const totalUsers = Object.keys(this.users).length;
    if (this.rtvVotes.length >= totalUsers / 2) {
      if (this.playlist.length === 1) {
        this.sendNotification(userId, {
          type: notificationTypes.error,
          message: 'You cant skip the last song'
        });

        return;
      }

      this.rtvVotes.length = 0;

      clearTimeout(this.playing);
      this.stopPlaying();
      this.skipOneAndPlay();
      return;
    }

    this.sendNotification(userId, {
      type: notificationTypes.info,
      message: 'Your vote was registered!'
    });
  }

  refresh() {
    const users = Object.keys(this.users);
    User.find({
      '_id': { $in: users }
    }).then((users) => {
      this.socket.emit('userlist', users);
    });
  }

  sendMessage(message) {
    const enrichedMessage = Object.assign({}, message, {
      room: this._id
    });
    const dbMessage = new Message(enrichedMessage);
    dbMessage.save();

    this.socket.send(message);
  }

  sendNotification(userId, notification) {
    if (!this.isInRoom(userId)) {
      return;
    }

    const socket = this.users[userId];
    socket.emit('notification', notification);
  }

  skipOneAndPlay() {
    this.playlist = this.playlist.slice(1, this.playlist.length);
    this.rtvVotes = [];
    this.startPlaying();
  }

  startPlaying(event) {
    if (event && event.type !== START_PLAYING) {
      return;
    }

    if (this.playlist.length === 0) {
      return;
    }

    const latestLink = this.playlist[0];
    this.socket.emit('play', latestLink);

    latestLink.isActive = false;
    latestLink.save();

    this.latestLink = latestLink;

    this.playing = setTimeout(() => {
      this.skipOneAndPlay();
    }, latestLink.metadata.duration);
  }

  stopPlaying() {
    this.socket.emit('stop');
  }

  ___initializePlaylist() {
    return Link.find({
      room: this._id,
      isActive: true
    }).then((links) => {
      this.playlist = links;
    });
  }

  // Events
  onJoin(event) {
    if (event.type !== JOIN) {
      return;
    }

    User.findOne({
      _id: event.userId
    }).then((user) => {
      // Send a message to the room when the user connects...
      this.socket.send({
        message: 'Connected!',
        author: user
      });
    });
  }

  onDisconnect(event) {
    if (event.type !== DISCONNECT) {
      return;
    }

    User.findOne({
      _id: event.userId
    }).then((user) => {
      // Enrich the message to send back to frontend
      this.socket.send({
        message: 'Disconnected!',
        author: user
      });
    });
  }

  ___initializeEventbus() {
    Object.assign(this.eventBus, {
      DISCONNECT: this.onDisconnect,
      JOIN: this.onJoin,
      START_PLAYING: this.startPlaying,
      REFRESH: this.refresh
    });
  }
}


module.exports = MusicRoom;