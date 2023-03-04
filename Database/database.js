require('dotenv').config();
const mongoose = require('mongoose');

function DatabaseConnection() {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DATABASE_CON_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('MongoDb connected...!')
        })
}

module.exports = DatabaseConnection;