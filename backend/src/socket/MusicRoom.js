const User = require('../models/user');
const Link = require('../models/link');
const Message = require('../models/message');
const notificationTypes = require('../models/constants').notifications;
const youtube = require('./youtube');
const moment = require('moment');

const JOIN = 'join';
const DISCONNECT = 'disconnect';
const ADD = 'add';
const START_PLAYING = 'start_playing';
const REFRESH = 'refresh';

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
        rtvVotes: [],
        startTime: undefined,
        isPlaying: false
      }
    );

    this.___initializePlaylist().then(() => {
      setTimeout(() => {
        this.notify({ type: START_PLAYING });
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
          const shouldStartPlaying = this.playlist.length === 0;
          this.playlist.push(link);

          this.sendNotification(userId, {
            type: notificationTypes.info,
            message: 'Successfully added video'
          });

          if (shouldStartPlaying) {
            this.notify({ type: START_PLAYING });
          }
        });
      }).catch((err) => {
        console.error(`ERROR FETCHING METADATA: ${JSON.stringify(err)}`);
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

    if (this.isPlaying) {
      this.notify({
        type: START_PLAYING,
        startAt: moment.duration(moment().diff(this.startTime)),
        socket: socket
      });
    }
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
    if (!event) return;

    const keys = Object.keys(this.eventBus);
    keys.forEach((key) => {
      this.eventBus[key].apply(this, [ event ]);
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

  sendEvent(event = {}) {
    this.socket.emit(event.type, event);
  }

  skipOneAndPlay() {
    this.playlist = this.playlist.slice(1, this.playlist.length);
    this.rtvVotes = [];
    this.notify({ type: START_PLAYING });
  }

  startPlaying(event = {}) {
    if (event.type !== START_PLAYING) {
      return;
    }

    if (this.playlist.length === 0) {
      this.isPlaying = false;
      return;
    }
      
    if (event.socket && this.isPlaying) {
      const currentLink = Object.assign(
        {}, 
        this.latestLink._doc, 
        { startAt: event.startAt }
      );

      event.socket.emit('play', currentLink);
      return;
    }

    this.isPlaying = true;
    const latestLink = this.playlist[0];
    this.socket.emit('play', latestLink);

    latestLink.isActive = false;
    latestLink.save();

    this.latestLink = latestLink;
    this.startTime = moment();

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
  onJoin(event = {}) {
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

  onDisconnect(event = {}) {
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

  async onRefresh(event = {}) {
    if (event.type !== JOIN && event.type !== DISCONNECT) {
      return;
    }
    
    const userIds = Object.keys(this.users);

    const users = await User.find({
      _id: {
        $in: userIds
      }
    }).then(users =>  users.map(user => user.toJSON()));

    this.sendEvent({
      type: REFRESH,
      payload: {
        users
      }
    });
  }

  ___initializeEventbus() {
    Object.assign(this.eventBus, {
      DISCONNECT: this.onDisconnect,
      JOIN: this.onJoin,
      START_PLAYING: this.startPlaying,
      REFRESH: this.onRefresh
    });
  }
}


module.exports = MusicRoom;