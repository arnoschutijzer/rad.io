const google = require('googleapis');
const youtube = google.youtube('v3');
const config = require('../config/settings');

const findVideoById = (id, callback) => {
  youtube.videos.list({
    auth: config.apiKey,
    part: 'contentDetails',
    id: id
  }, callback);
};

module.exports = {
  findVideoById
};