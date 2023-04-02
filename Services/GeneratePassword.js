async function generatePassword() {
    var pass = '';
    var laterStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var numberStr = '123456789';
    var specialStr = '@#$%&';

    for (let i = 1; i <= 10; i++) {
        let char;
        if (i === 8) {
            char = Math.floor(Math.random() * specialStr.length + 1);
            pass += specialStr.charAt(char);
        } else if (i > 8) {
            char = Math.floor(Math.random() * numberStr.length + 1);
            pass += numberStr.charAt(char);
        } else {
            char = Math.floor(Math.random() * laterStr.length + 1);
            pass += laterStr.charAt(char);
        }
    }
    return pass;
}

module.exports = generatePassword;