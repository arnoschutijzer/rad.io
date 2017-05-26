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
          metadata,
          isActive: true
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
      const latestLink = this.activePlaylist[0];
      this.socket.emit('play', latestLink);

      latestLink.isActive = false;
      latestLink.save();

      setTimeout(() => {
        this.activePlaylist = this.activePlaylist.slice(1, this.activePlaylist.length);
        this.startPlaying();
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
}