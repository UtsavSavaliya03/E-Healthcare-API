const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/User/userRouters.js');
const enquiryRoutes = require('./Routes/Enquiry/enquiryRouters.js');
const doctorRoutes = require('./Routes/Doctor/doctorRouters.js');
const patientRoutes = require('./Routes/Patient/patientRouters.js');
const appointmentRoutes = require('./Routes/Appointment/appointmentRouters.js');
const newsletterRoutes = require('./Routes/Newsletter/newsletterRoutes.js');

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

// Contact
App.use('/api/v1/enquiry', enquiryRoutes);

// Doctor
App.use('/api/v1/doctor', doctorRoutes);

// Patient
App.use('/api/v1/patient', patientRoutes);

// Appointment
App.use('/api/v1/appointment', appointmentRoutes);

// Newsletter
App.use('/api/v1/newsletter', newsletterRoutes);

App.use('/', (req, res) => {
    res.status(404).json({
        status: false,
        msg: "Bad request...!"
    })
})

process.on('uncaughtException', (error) => {
    console.error('Caught exception: ' + error)
});

module.exports = App;