const google = require('googleapis');
var api = google.youtube('v3');
const settings = require('../config/settings');
const verEx = require('verbal-expressions');

const findVideoById = (id) => {
  return new Promise((resolve, reject) => {
    api.videos.list({
      auth: settings.API_KEY,
      part: 'contentDetails, snippet',
      id
    }, (err, response) => {
      response = response.data;
      console.log(err);
      if (err) {
        return reject(err);
      }

      if (response.items.length < 1) {
        return reject({ message: 'No videos found' });
      }

      // Assume we need the details of first result, which is always correct
      // since we do lookup by id...
      const details = response.items[0].contentDetails;
      const snippet = response.items[0].snippet;

      const metadata = {
        duration: parseDuration(details.duration),
        title: snippet.title,
        description: snippet.description,
        uploader: snippet.channelTitle
      };

      return resolve(metadata);
    });
  });
};

const isMobileUrl = (url) => {
  const mobileUrl = verEx().startOfLine()
    .then('http').maybe('s').then('://')
    .then('youtu.be/').anything().endOfLine().removeModifier('g');

  return mobileUrl.test(url);
};

const isFullUrl = (url) => {
  const fullUrl = verEx().startOfLine()
    .then('http').maybe('s').then('://')
    .maybe('www.').then('youtube.com/watch?v=')
    .anything().endOfLine().removeModifier('g');

  return fullUrl.test(url);
};

const isValidUrl = (url) => {
  return isFullUrl(url) || isMobileUrl(url);
};

const parseUrl = (url) => {
  const isFull = isFullUrl(url);
  const isMobile = isMobileUrl(url);

  if (isFull) {
    const queryIndex = url.indexOf('v=');
    const queryUrl = url.substr(queryIndex + 2, url.length - 1);
    let nextParamIndex = queryUrl.length;
    if (queryUrl.indexOf('&') > -1) {
      nextParamIndex = queryUrl.indexOf('&');
    }
    console.log('doijiozajeiozajd');
    const videoId = queryUrl.substr(0, nextParamIndex);

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
  }

  return Promise.reject('Invalid url');
};

// cfr. https://stackoverflow.com/questions/22148885/converting-youtube-data-api-v3-video-duration-format-to-seconds-in-javascript-no
const parseDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);

  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

module.exports = {
  findVideoById,
  parseDuration,
  parseUrl,
  isValidUrl
};