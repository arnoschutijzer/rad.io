const getConfiguration = () => {
  const RADIO_PORT = process.env.RADIO_PORT || 8080;
  const RADIO_DATABASE = process.env.RADIO_DATABASE || 'mongodb://mongodb:27017/rad-io';
  const RADIO_SECRET = process.env.RADIO_SECRET || 'radiossecret';
  const RADIO_API_KEY = process.env.RADIO_API_KEY || '';
  
  if (!RADIO_API_KEY) {
    console.error('Could not start. No RADIO_API_KEY environment variable found.');
    return process.exit(1);
  }

  return {
    API_KEY: RADIO_API_KEY,
    DATABASE: RADIO_DATABASE,
    PORT: RADIO_PORT,
    SECRET: RADIO_SECRET
  };
};

module.exports = getConfiguration();
