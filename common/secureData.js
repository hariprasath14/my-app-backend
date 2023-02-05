const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const secretKey = "GUYg56fg8bg87og7vf677"

module.exports = {
    hashPassword: async (myPlaintextPassword) => {
        let salt = await bcrypt.genSalt(10);
        console.log("salt", salt);
        return await bcrypt.hash(myPlaintextPassword, salt)
    },
    comparePassword: async (myPlaintextPassword, hash) => {
        return await bcrypt.compare(myPlaintextPassword, hash)
    },
    jwtSecretKey: secretKey,
    decodeJwtToken: (token, res) => {
        let user;
        try {
            const decoded = jwt.verify(token, secretKey);
            user = decoded;
        } catch (err) {
            res.status(401).send("Unauthrized access");
            return null;
        }
        return user;
    },
}
