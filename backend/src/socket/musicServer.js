const Link = require('../models/link');
const youtube = require('../helpers/youtube');

module.exports = (id, socket) => {
  return new MusicServer(id, socket);
};

class MusicServer {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;

    this.__refreshPlaylist().then(() => {
      this.startPlaying();
    });
  }

  add(data) {
    youtube.parseUrl(data.url).then((response) => {
      youtube.findVideoById(response.videoId).then((metadata) => {
        const linkData = Object.assign({}, response, {
          submitter: data.user,
          room: data.roomId,
          metadata
        });

        const link = new Link(linkData);

        link.save().then(() => {
          this.activePlaylist.push(link);

          this.socket.send({
            author: {
              username: 'System'
            },
            message: 'Successfully added'
          });
        });
      }).catch((err) => {
        this.socket.send({
          author: {
            username: 'System'
          },
          message: err.message
        });
      });
    }).catch((err) => {
      // Invalid url
      this.socket.send({
        author: {
          username: 'System'
        },
        message: err.message
      });
    });
  }

  startPlaying() {
    if (this.activePlaylist.length > 0) {
      this.socket.emit('play', this.activePlaylist[0]);
      setTimeout(() => {
        this.activePlaylist = this.activePlaylist.slice(1, this.activePlaylist.length);
        this.startPlaying();
      }, 1000 /* song time in ms */);
    } else {
      setTimeout(() => {
        this.startPlaying();
      }, 2000 /* actually a sort of 'interval', we want to start playing when another item was added to the playlist */);
    }
  }

  __refreshPlaylist() {
    return Link.find().then((links) => {
      this.activePlaylist = links;
    }).catch((err) => {
      console.log(err);
    });
  }
}