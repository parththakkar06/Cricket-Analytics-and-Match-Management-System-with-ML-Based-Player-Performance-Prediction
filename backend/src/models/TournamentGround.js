const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const TournamentGroundSchema = new Schema({

tournamentId:{
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    // required: true
},
groundname:{
    type: String,
    // required: true  
}
},{
    timestamps: true
})
module.exports = moongoose.model('TournamentGround', TournamentGroundSchema);