# CoachMe Health Automated SMS Dashboard

Automated SMS dashboard with chatbot for automatically monitoring and tabulating patient data. Built Fall 2020 under Hack4Impact Penn.

**Project Manager/Technical Lead:** Ben Demers, Carol Li

**Team Members:**
* Cindy Jiang
* Jared Asch
* Subin Lee
* Alex Xu
* Gautam Narayan
* Grace Fujinaga
* Matthew Dong

## Setting Up

#### Recommended Tools Checklist

- Git Clone this repository
- Create a [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)
- Create a [Heroku account](https://www.heroku.com/)
- Install [Node.JS](https://nodejs.org/en/download/)
- Install [Yarn Package Manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

#### Installing Requirements

```bash
$ git clone https://github.com/Orang-utan/ts-boilerplate.git
$ cd ts-boilerplate
$ yarn setup
```

##### Configuring Enviromental Variable

Create file called ".env.development" in root directory, it should look like the following:

```
ATLAS_URI=mongodb-connection-string-placeholder
JWT_SECRET=my-secret-jwt-key-placeholder
```

Then, create another file called ".env" in "src/client", it should look like the following:

```
REACT_APP_API_URL="http://localhost:5000"
```

Create a file called `twilio.ts` in src/keys/, it should look like the following: 
```
const accountSid = '<insert_here>';
const authToken = '<insert_here>';
export {accountSid, authToken};

#### Running Project

```bash
$ # run both server and client
$ yarn dev
$ # run server only
$ yarn server
$ # run client only
$ yarn client
```

#### To Deploy

Deploying this project on Heroku is dead simple. Basically, go on Heroku and create a new Heroku app, connect your project Github to your new Heroku app, and hit Deploy. Note, that you will need to configure the enviromental variable under settings.
