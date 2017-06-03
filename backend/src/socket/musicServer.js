const Link = require('../models/link');
const youtube = require('./youtube');
const _ = require('underscore');

module.exports = (id, socket, userId) => {
  return new MusicServer(id, socket, userId);
};

class MusicServer {
  constructor(id, socket, userId) {
    this.id = id;
    this.socket = socket;
    this.users = [
      userId
    ];
    this.rtvVotes = [];

    this.__refreshPlaylist().then(() => {
      this.startPlaying();
    });
  }

  add(data) {
    return youtube.parseUrl(data.url).then((response) => {
      return youtube.findVideoById(response.videoId).then((metadata) => {
        const linkData = Object.assign({}, response, {
          submitter: data.user,
          room: this.id,
          metadata,
          isActive: true
        });

        const link = new Link(linkData);

        return link.save().then(() => {
          this.activePlaylist.push(link);
        });
      });
    });
  }

  join(userId) {
    if (this.users.indexOf(userId) > -1) {
      return;
    }

    this.users.push(userId);
  }

  leave(user) {
    if (this.users.indexOf(user._id) > -1) {
      this.users = _.without(this.users, user._id);
    }
  }

  rtv(userId) {
    if (!this.latestLink) {
      return Promise.reject('Nothing is playing');
    }

    if (this.rtvVotes.indexOf(userId) === -1) {
      this.rtvVotes.push(userId);
    }

    // Check if the majority has voted...
    if (this.rtvVotes.length >= this.users.length / 2) {
      // clear the RTV votes
      this.rtvVotes.length = 0;

      // We don't want to skip if this is the last video in the playlist...
      if (this.activePlaylist.length === 1) {
        return Promise.reject('This is the last video in the playlist!');
      }

      clearTimeout(this.playing);

      this.__stopPlaying();
      this.skipOneAndPlay();
    }

    return Promise.resolve();
  }

  skipOneAndPlay() {
    this.activePlaylist = this.activePlaylist.slice(1, this.activePlaylist.length);
    this.startPlaying();
  }

  startPlaying() {
    if (this.activePlaylist.length > 0) {
      const latestLink = this.activePlaylist[0];
      this.socket.emit('play', latestLink);

      this.latestLink = latestLink;

      latestLink.isActive = false;
      latestLink.save();

      this.playing = setTimeout(() => {
        this.skipOneAndPlay();
      }, latestLink.metadata.duration);
    } else {
      /* after 2 seconds, check again if we have items to play */
      setTimeout(() => {
        this.startPlaying();
      }, 2000);
    }
  }

  __refreshPlaylist() {
    return Link.find({ isActive: true }).then((links) => {
      this.activePlaylist = links;
    }).catch((err) => {
      console.log(err);
    });
  }

  __stopPlaying() {
    this.socket.emit('stop');
  }
}