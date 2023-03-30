const User = require('../Models/User/userModel.js');

async function generatePatientId() {

    return await validateId(await getId());

    async function getId() {
        var id = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for (let i = 1; i <= 8; i++) {
            let char;
            char = Math.floor(Math.random() * str.length + 1);
            id += str.charAt(char);
        }
        return id;
    }

    async function validateId(id) {
        const user = await User.findOne({patientId: id});

        if (user !== null) {
            await validateId(await getId());
        } else {
            return id;
        }
    }
}

module.exports = generatePatientId;