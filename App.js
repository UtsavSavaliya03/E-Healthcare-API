const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const userRoutes = require('./Routes/User/userRouters.js');
const inquiryRoutes = require('./Routes/Inquiry/inquiryRouters.js');
const doctorRoutes = require('./Routes/Doctor/doctorRouters.js');
const departmentRoutes = require('./Routes/Department/departmentRouters.js');
const hospitalRoutes = require('./Routes/Hospital/hospitalRouters.js');
const patientRoutes = require('./Routes/Patient/patientRouters.js');
const appointmentRoutes = require('./Routes/Appointment/appointmentRouters.js');
const newsletterRoutes = require('./Routes/Newsletter/newsletterRoutes.js');
const backupRoutes = require('./Routes/Backup/backupRouters.js');
const prescriptionRoutes = require('./Routes/Prescription/prescriptionRoutes.js');
const laboratoryRoutes = require('./Routes/Laboratory/laboratoryRouters.js');

const DatabaseConnection = require('./Database/database.js');

const App = express();

/* --------- Database connection --------- */
DatabaseConnection();

App.use(cors());

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({
    extended: true
}));

App.use(fileUpload({
    useTempFiles: true
}))

/* --------- Routes --------- */
// Users
App.use('/api/v1/users', userRoutes);

// Contact
App.use('/api/v1/inquiry', inquiryRoutes);

// Doctor
App.use('/api/v1/doctor', doctorRoutes);

// Department
App.use('/api/v1/department', departmentRoutes);

// Hospital
App.use('/api/v1/hospital', hospitalRoutes);

// Patient
App.use('/api/v1/patient', patientRoutes);

// Appointment
App.use('/api/v1/appointment', appointmentRoutes);

// Newsletter
App.use('/api/v1/newsletter', newsletterRoutes);

// Backup
App.use('/api/v1/backup', backupRoutes);

// Prescription
App.use('/api/v1/prescription', prescriptionRoutes);

// Laboratory
App.use('/api/v1/laboratory', laboratoryRoutes);


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