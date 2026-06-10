const jwt  = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (payload)=>{
    const token = jwt.sign(payload,config.JWT_SECRET);
    console.log(token);
    return token;
}


module.exports = {
    generateToken
}