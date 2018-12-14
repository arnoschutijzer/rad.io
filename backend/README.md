# rad.io

## get started

```bash
# install dependencies
$ npm install

# start the database (this will just start the mongod service)
$ npm run start:db

# start the backend
$ npm run start:local
```

## configuration

A valid [API key for Google](https://console.developers.google.com/apis/dashboard), the server port, a JWT secret and a valid MongoDB database address are required to run the backend.
These can all be set with environment variables or they will default to their default values:

|        key       |  value                            |
|------------------|-----------------------------------|
| `RADIO_PORT`     | `8080`                            |
| `RADIO_API_KEY`  | n/a                               |
| `RADIO_DATABASE` | `mongodb://mongodb:27017/rad-io`  |
| `RADIO_SECRET`   | `radiossecret`                    |
