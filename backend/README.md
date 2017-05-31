# rad.io

## important notice
The backend requires a config file to be filled in, by default the application won't run unless you specify the correct settings in
a `src/config/settings.js`-file.

A valid [API key for Google](https://console.developers.google.com/apis/dashboard), a JWT secret and a valid MongoDB database address are required. The port on which the server will run is `8080` by default.

There's an example already present. (`backend/config/settings.example.js`)

## get started
```
> yarn

> yarn start:local
```