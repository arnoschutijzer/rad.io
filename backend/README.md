# rad.io

## important notice
The backend requires a config file to be filled in, by default the application won't run unless you specify the correct settings in
`src/config/settings.js`.

A valid [API key for Google](https://console.developers.google.com/apis/dashboard), a JWT secret and a valid MongoDB database address are required. The port on which the server will run is `9001` by default.

```
// example settings.js
module.exports = {
  apiKey: 'ABCDEFG-123',
  secret: 'rad-io-secret',
  database: 'mongodb://127.0.0.1:27017/radio-db',
  port: '9001'
}
```

## get started
```
> yarn

> yarn start
```