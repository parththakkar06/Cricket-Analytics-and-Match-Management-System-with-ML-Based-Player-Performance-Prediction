const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchScoreSchema = new Schema({

    matchId:{
        type: Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    tournamentId:{
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    inningtype:{
        type: String,
        enum:['first','second'],
      
    },
    bowlenumber:{
            type:Number,

    },
    bowletype:{
        type: String,
        enum:['normal','wide','no','warning','bye'],
    },
    batType: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5,6],
        // required: true,
      },
      bowlerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
      batsmanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
      outType: {
        type: String,
        enum: ["catchOut", "runOut", "HeadWicket", "LBW", "stumpedOut", "bold", "not-out"], 
        // default: "not-out",
      },
      outPlayerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        default: null,
      },
},{
  timestamps: true,
})

module.exports = mongoose.model('matchscore',matchScoreSchema);