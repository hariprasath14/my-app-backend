const bcrypt = require("bcrypt")
module.exports = {
    hashPassword: async (myPlaintextPassword) => {
        let salt = await bcrypt.genSalt(10);
        console.log("salt", salt);
        return await bcrypt.hash(myPlaintextPassword, salt)
    },
    comparePassword: async (myPlaintextPassword, hash) => {
        return await bcrypt.compare(myPlaintextPassword, hash)
    }
}