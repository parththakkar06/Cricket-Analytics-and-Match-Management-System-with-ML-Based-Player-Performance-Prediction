const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const matchSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        // required: true   
    },
    tournamentId: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        // required: true
    },
    team1Id: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        // required: true
    },
    team2Id: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        // required: true
    },
    matchtype: {
        type: String,
        // required: true,
        enum: ['final', 'semifinal', 'qtr final', 'normal', 'knockout-normal', 'knockout-semifinal']
    },
    totalovers: {
        type: Number,
        // required: true  
    },
    overperbowler: {
        type: Number,
        // required: true
    },
    totalpowerplayovers: {
        type: Number,
        // required: true

    },
    city: {
        type: String,

        // required: true  
    },
    groundname: {
        // type:Schema.Types.ObjectId,
        // ref: 'TournamentGround',
        type: String,
        // required: true  
    },
    date: {
        type: Date,
        // required: true
    },
    stateTime: {
        type: String,
        // required: true
    },
    balltype: {
        type: String,
        // required: true,
        enum: ['leather', 'tennis']
    },
    pithchtype: {
        type: String,
        // required: true,
        enum: ['turf', 'cement', 'rough', 'astroturf', 'mating']
    },
    tosswinningteam: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        // required: true
        default: null
    },
    tosswinningelected: {
        type: String,
        // required: true,
        enum: ['batting', 'bowling'],
        default: null
    },
    firstInningStatus: {
        type: String,
        enum: ['NotStarted', 'InProgress', 'END'],
        default: 'NotStarted'
    },
    secondInningStatus: {
        type: String,
        enum: ['NotStarted', 'InProgress', 'END'],
        default: 'NotStarted'

    }
}, {
    timestamps: true
})

module.exports = moongoose.model('Match', matchSchema);