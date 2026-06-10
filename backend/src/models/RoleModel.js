const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const rolechema = new Schema({

    rolename:{
        type:String,
        // unique:true
        
    },
    
 roledescription:{
            type:String,
            require:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Roles',rolechema)