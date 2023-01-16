let appRegex = {
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%^&*+-.,\|}{]).{8,20}$/,
    email: /^[a-zA-Z0-9.!#$%&'*=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
    // email: "",
    alphaNum: /^[a-zA-Z0-9 ]*$/, //with space
    alpha: /^[a-zA-Z ]*$/, //with space
    num: /^[0-9]\d*$/,
    panNumber: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
    contactNumber: "^[0-9]{7,15}$",
    pincode: "^[1-9][0-9]{2}\\s?[0-9]{3}$",
    maxLength40: 40,
    maxLength100: 100,
}

module.exports = {
    checkAlpha: (x) => {
        if (x && x.toString().match(appRegex.alpha)) {
            return x
        } else {
            return null
        }
    },
    checkEmail: (x) => {
        if (x && x.toString().match(appRegex.email)) {
            return x
        } else {
            return null
        }
    },
    checkPassWord: (x) => {
        if (x && x.toString().match(appRegex.password)) {
            return x
        } else {
            return null
        }
    },
    commonResponse: (code = 0, message = "", response = null) => {
        return {
            responseCode: code,
            responseMessage: message,
            response: response,
        }
    }
}