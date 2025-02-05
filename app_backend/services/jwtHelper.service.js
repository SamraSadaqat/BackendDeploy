'use strict';

var jwt = require('jsonwebtoken');

const generateToken = async (payload, type) => {
    try {
        if (type == 'forgot') {
            let token = await jwt.sign(payload, "NephroHealthCoach", {
							expiresIn: '7d',
						});
            return token;
        } else {
            let token = await jwt.sign(payload, "NephroHealthCoach");
            return token;
        }
    } catch (error) {
        return error
    }
}

const verifyToken = async (token) => {
    try {
        let result = await jwt.verify(token, "7d");
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    generateToken,
    verifyToken
}