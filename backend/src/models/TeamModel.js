const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const TeamSechema = new Schema({


teamname:{
    type: String,
    required: true  
},
city:{
    type: String,
    required: true  
},
tournamentId:{
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    // required: true
}
},{
    timestamps: true
})


module.exports = moongoose.model('Team', TeamSechema);