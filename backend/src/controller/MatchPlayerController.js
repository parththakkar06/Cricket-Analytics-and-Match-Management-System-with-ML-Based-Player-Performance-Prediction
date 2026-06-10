const matchplayermodel = require('../models/MatchPlayerModel')
const PlayerPerformance = require('../models/PlayerPerformance');

// ------------------------ user create api =----------------------------------------------------------------------------

const creatematchplayer = async (req, res) => {

    const matchplayerobj = {
        matchId:req.body.matchId,
        userId: req.body.userId,
        teamId: req.body.teamId,
        tournamentId: req.body.tournamentId,
        role: req.body.role,
        battingOrder: req.body.battingOrder
    }

    console.log(matchplayerobj)
    try {

        const matchplayer = await matchplayermodel.create(matchplayerobj)   
        console.log("res.....",matchplayer)
        res.status(201).json({
            message: "matchplayer created successfully.....",
            data: matchplayer

        })

    }
    catch (err) {

        res.status(500).json({
            message: "internal server error"
        })
    }

}

//----------------------get all user profile api----------------------------------------------------------------------------


const getallmatchplayer = async (req, res) => {

    try {

        const matchplayer = await matchplayermodel.find()
        res.status(200).json({
            message: "all matchplayer data",
            data: matchplayer
        })


    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

// ----------------------delete tournament by id api----------------------------------------------------------------------------

const deletematchplayer = async (req, res) => {

    try {
        const id = req.params.id
        const deletematchplayer = await matchplayermodel.findByIdAndDelete(id)
        if (deletematchplayer == null) {
            res.status(400).json({
                message: "matchplayer not found"
            })
        }
        else {
            res.status(200).json({
                message: "matchplayer deleted successfully",
                data: deletematchplayer
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// ----------------------update tournament by id api----------------------------------------------------------------------------


const updatematchplayer = async (req, res) => {
    try {
        const id = req.params.id
        const updatematchplayer = await matchplayermodel.findByIdAndUpdate(id, req.body)
        if (updatematchplayer == null) {
            res.status(400).json({
                message: "matchplayer not found"
            })
        }
        else {

            res.status(200).json({
                message: "matchplayer updated successfully",
                data: updatematchplayer
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = { creatematchplayer, getallmatchplayer, deletematchplayer, updatematchplayer } 