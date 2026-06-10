const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const UserscoreSchema = new Schema({

userId:{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    // required: true
},
totalmatchplayed:{
    type: Number,
    // required: true
},
totalplayedscores:{
    type: Number,
    // required: true
},
totalinnings:{
    type: Number,
        // required: true
},
avg:{
    type: Number,
    // required: true
},
scorerunrate:{
    type: Number,
    // required: true
},
total50a:{
    type: Number,
    // required: true
},
total100s:{
    type: Number,
    // required: true
},
total6s:{
    type: Number,
    // required: true
},
total4s:{
    type: Number,
    // required: true
},
totalducks:{
    type: Number,
    // required: true

},
totalovers:{
    type: Number,
    // required: true
},
totaloverscore:{
    type: Number,
    // required: true
},
maidens:{
    type: Number,
    // required: true
},
bowlerwick:{
    type: Number,
    // required: true
},
bowlerwides:{
    type: Number,
    // required: true
},
bowlernoballs:{
    type: Number,
    // required: true

},
bowler6s:{
    type: Number,
    // required: true

},
bowler4s:{
    type: Number,
    // required: true
},
totalcatches:{
    type: Number,
    // required: true
},
// captainsheep:{
//     type: Number,
//     required: true
// }

},{
    timestamps: true
})
module.exports = moongoose.model('Userscore', UserscoreSchema);