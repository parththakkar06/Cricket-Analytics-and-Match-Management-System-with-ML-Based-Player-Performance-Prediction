const bcrypt = require('bcrypt')

const encryptpassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password,salt);
    return hashpassword;

}

const commparepassword = async(password,hashpassword) =>{
    const ismatch = await bcrypt.compare(password,hashpassword);
    return ismatch;

}

module.exports = {encryptpassword,commparepassword}