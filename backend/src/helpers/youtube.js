const google = require('googleapis');
const youtube = google.youtube('v3');
const config = require('../config/settings');
const verEx = require('verbal-expressions');

const findVideoById = (id) => {
  youtube.videos.list({
    auth: config.apiKey,
    part: 'contentDetails',
    id: id
  }, (err, response) => {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.resolve(response);
  });
};

const parseUrl = (url) => {
  const fullUrl = verEx().startOfLine()
    .then('http').maybe('s').then('://')
    .maybe('www.').then('youtube.com/watch?v=')
    .anything().endOfLine().removeModifier('g');

  const mobileUrl = verEx().startOfLine()
      .then('http').maybe('s').then('://')
      .then('youtu.be/').anything().endOfLine().removeModifier('g');

  const isFull = fullUrl.test(url);
  const isMobile = mobileUrl.test(url);

  if (isFull) {
    const queryIndex = url.indexOf('v=');
    const videoId = url.substr(queryIndex + 2, url.length - 1);

    return Promise.resolve({
      originalUrl: url,
      videoId
    });
  } else if (isMobile) {
    const slashIndex = url.lastIndexOf('/');
    const videoId = url.substr(slashIndex + 1, url.length - 1);
    return Promise.resolve({
      originalUrl: url,
      videoId
    });
  } else {
    return Promise.reject();
  }
};

module.exports = {
  findVideoById,
  parseUrl
};