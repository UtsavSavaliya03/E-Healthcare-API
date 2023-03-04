const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/User/userRouters.js');
const DatabaseConnection = require('./Database/database.js');

const App = express();

/* --------- Database connection --------- */
DatabaseConnection();

App.use(cors());

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({
    extended: true
  }));

/* --------- Routes --------- */
// Users
App.use('/api/v1/users', userRoutes);

App.use('/', (req, res) => {
    res.status(404).json({
        status: false,
        msg: "Bad request...!"
    })
})

process.on('uncaughtException',(error) => {
    console.error('Caught exception: ' + error)
});

module.exports = App;