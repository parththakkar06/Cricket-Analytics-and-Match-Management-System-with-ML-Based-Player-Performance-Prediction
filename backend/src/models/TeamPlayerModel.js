const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const TeamPlayerSchema = new Schema({

teamId:{
    type: Schema.Types.ObjectId,
    ref: 'Team',
    // required: true
},
userId:
{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
}

},{
    timestamps: true
})


module.exports = moongoose.model('TeamPlayer', TeamPlayerSchema);