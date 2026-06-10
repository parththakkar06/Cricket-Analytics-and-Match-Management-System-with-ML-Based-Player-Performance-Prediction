const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const UserProfileSchema = new Schema({


    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        // required: true
    },
    profilePicPath:{
        type: String,
        // required: true
    },
    location:{
        type: String,
        // required: true
    },
    playingRole:{
        type: String,
        // required: true,
        enum: ['TopOrderBatter', 'MiddleOrderBatter', 'WicketKeeperBatter', 'WicketKeeper', 'Bowler', 'AllRounder', 'LowerOrderBatter', 'OpeningBatter', 'None']

    },
    battingStyle:{
        type: String,
        // required: true,
        enum: ['RightHanded', 'LeftHanded']

    },
    bowlingStyle:{
        type: String,
        // required: true,
        enum: ['RightArmFast', 'RightArmMedium', 'RightArmOffSpin', 'RightArmLegSpin', 'LeftArmFast', 'LeftArmMedium', 'LeftArmLegSpin', 'LeftArmOffSpin']

    },
},{
    timestamps: true
})


module.exports = moongoose.model('UserProfile', UserProfileSchema);