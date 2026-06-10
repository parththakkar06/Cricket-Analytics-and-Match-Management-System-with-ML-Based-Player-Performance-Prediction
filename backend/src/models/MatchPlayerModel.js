const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const MatchPlayerSchema = new Schema({

matchId:{
    type: Schema.Types.ObjectId,
    ref: 'Match',
    required: true
},
userId:
{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
},
teamId:{
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
},
tournamentId:{
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
},
role:{
    type: String,
    required: true,
    enum: ['batsman' , 'bowler' , 'allrounder' , 'wicketkeeper']
},
battingOrder:{
    type: String,
      required: true,
      enum: ['opener', 'nonStriker', '1Down', '2Down', '3Down'], 
},

},{
    timestamps: true
})

module.exports = moongoose.model('MatchPlayer', MatchPlayerSchema);