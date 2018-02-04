# rad.io [![Build Status](https://travis-ci.org/arnoschutijzer/rad.io.svg?branch=master)](https://travis-ci.org/arnoschutijzer/rad.io)

>websockets + react

## setup

A React webapp using websockets, jsx, ES6 and Redux communicating with a Node webserver using mongodb.

## pre-requisites

- yarn (`npm install -g yarn`)

## deploy

- Follow the steps in `backend/readme.md` and `frontend/readme.md` to get the app running locally first.
- Create a mongodb server somewhere (MongoDB Atlas, mLabs, ...).
- Grab the mongodb url and set it as the `DATABASE` property `backend/src/config/settings.js`.
- Run `now` inside `backend` or deploy backend to wherever.
- Run `now alias <id> <name>` so it's deployed under the right name.
- Set the `BASE` variable to this value in `frontend/src/config/config.js` if it isn't already.
- Build the frontend and deploy the `dist`-folder somewhere.