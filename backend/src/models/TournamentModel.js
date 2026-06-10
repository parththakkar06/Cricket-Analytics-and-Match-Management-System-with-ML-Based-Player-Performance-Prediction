const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
        tournamentname :{
            type:String,
            require:true
        },  
        orgnaizername:{
            type:String,
            require:true
        },
        orgnaizercontact:{
            type:Number,
            require:true
        },
        city:{
            type:String,
            require:true
        },
        category:{
            type:String,
            require:true,
            enum:['open' , 'corporates' , 'community' , 'school' , 'series', 'college' , 'university' , 'private']
        },

        startdate:{
            type:Date,
            require:true
        },
        enddate:{
            type:Date,
            require:true
        },
        maxteam:{
            type:Number,
            require:true
        },
        balltype:{
            type:String,
            require:true,
            enum:['leather' , 'tennis']
        },
        overs:{
            type:Number,
            require:true
        },
        pithchtype:{
            type:String,
            require:true,
            enum:['turf','cement','rough','astroturf','mating']
        },
        matchtype:{
            type:String,
            require:true,
            enum:['ground','box']
        },


},
{
    timestamps:true
})

module.exports = mongoose.model('Tournament',tournamentSchema);