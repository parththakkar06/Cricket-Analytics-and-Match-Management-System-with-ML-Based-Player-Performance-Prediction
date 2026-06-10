const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerPerformanceSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

  matchId: {
    type: Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },

  runs: {
    type: Number,
    required: true
  },

  balls: {
    type: Number,
    required: true
  },

  dismissalType: {
    type: String,
    enum: ['bowled', 'caught', 'lbw', 'runout', 'notout'],
    required: true
  },

  bowlerType: {
    type: String,
    enum: ['fast', 'spin'],
    required: true
  },

  battingPosition: {
    type: Number,
    required: true
  },

  zones: [
    {
      area: {
        type: String,
        enum: ['leg', 'off', 'straight']
      },
      runs: {
        type: Number
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model('PlayerPerformance', PlayerPerformanceSchema);