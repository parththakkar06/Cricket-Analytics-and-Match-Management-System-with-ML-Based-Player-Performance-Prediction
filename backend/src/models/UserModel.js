const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({

        firstname :{
            type:String,
            require:true
        },
        
        lastname:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        contact:{
            type:Number,
            require:true
        },
        gender:{
            type:String,
            require:true,
            enum:['Male','Famale','Other']
        },
        DOB:{
            type:Date,
            require:true
        },
        roleId:{
            type:Schema.Types.ObjectId,
            ref:"Roles"

        },
       active:{
        type:Boolean,
        default:false
       },
       profilePicture:{
           type:String
       },
       
},{
    timestamps:true
})

module.exports = mongoose.model('Users',userSchema);