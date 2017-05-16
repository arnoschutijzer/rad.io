const gradients = require('./gradients.json');

module.exports = () => {
  return gradients[ Math.floor(Math.random() * gradients.length) ];
};