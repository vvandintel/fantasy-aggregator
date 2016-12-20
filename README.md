# Fantasy Aggregrator
##### Author: Vincent P. Van Dintel
##### Tech stack
 - Frontend: Handlebars, jQuery, Bootstrap
 - Web Server: Express
 - Backend services: Node, Mongo, Mongoose
 - External hosting: Pivotal Web Services (PWS)

##### Description
Fantasy Aggregator is a cloud-enabled website that aggregates NFL fantasy data and displays in real-time

This app uses internal asynchronous services to retrieve data from the [NFL Fantasy API](http://api.fantasy.nfl.com/v1/docs) and persist it to the database. It then displays the data in web application views using jQuery AJAX calls

The app can also hosted on PWS, with the environment details included in the manifest.yml. You will also need to configure a custom MongoDB service within PWS and name it "fantasy-aggregator-mongod"

Note: This site is not mobile-friendly as the AJAX calls do not work on that platform

**Not compatible with older versions of Internet Explorer! Chrome or Firefox are recommended**

#### Installation

Fantasy Aggregator requires [Node.js](https://nodejs.org/) v6.7+ and a local [MongoDB](https://mongodb.com/) instance to run.

Install the dependencies and start the server:

```sh
$ npm install
$ node app.js
```
The app runs locally on *http://localhost:6001* by default, using *fantasy-aggregator-mongod* as the database

Log files are available in the logs directory

If the app is run on PWS the host, port, and database settings are automatically configured from app.js, env.js, and dbConnection.js

#### Details
##### Architecture
This app consists of three parts:
1. Backend fantasy service which retrieves and stores data on a schedule
2. REST APIs which provide read access to the data 
3. Web app which uses the REST APIs to retrieve the data and display it

##### REST APIs
- *GET /fantasy/leaders* - JSON, Retrieve all fantasy leaders for all weeks
- *GET /fantasy/leaders/:id* - JSON, Retrieve all fantasy leaders for specified week
- *GET /fantasy/news/:id* - JSON, Retrieve current player news cache

##### Web App Navigation
- *GET /* - redirects to /leaders
- *GET /leaders* - HTML, returns view of all weeks of fantasy leaders
- *GET /leaders/:id* - HTML, returns view of all fantasy leaders for specified week, filtered by position


License
----
MIT

