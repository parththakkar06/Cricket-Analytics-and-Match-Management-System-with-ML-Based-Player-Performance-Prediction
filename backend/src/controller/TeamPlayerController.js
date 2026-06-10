const teamplayermodel = require('../models/TeamPlayerModel')


// ------------------------ user create api =----------------------------------------------------------------------------

const createteamplayer = async (req, res) => {
    console.log("req.body", req.body)

    // const teamplayerobj = {
    //     // teamId: req.body.teamId,
    //     userId: req.body.userId,
    // }
    try {

        const teamplayer = await teamplayermodel.create(req.body)
        console.log("res.....", teamplayer)
        res.status(201).json({
            message: "team player created successfully.....",
            data: teamplayer

        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        })

    }



}

//----------------------get all user profile api----------------------------------------------------------------------------

const  getallteamplayer = async (req, res) => {

    try {

        const teamplayer = await teamplayermodel.find()
        res.status(200).json({
            message: "all team player data",
            data: teamplayer
        })


    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }



}


// ----------------------delete tournament by id api----------------------------------------------------------------------------


const deleteteamplayer = async (req, res) => {

    try{
        const id = req.params.id
        const deleteteamplayer = await teamplayermodel.findByIdAndDelete(id)
        if(deleteteamplayer == null){
            res.status(400).json({
                message: "team player not found"
            })
        }else{
            res.json({
                message: "team player deleted successfully",
                data: deleteteamplayer
            })
        }
    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }   
}



// ----------------------update user profile api----------------------------------------------------------------------------


const updateteamplayer = async (req, res) => {
    try {
        const { id } = req.params;
        const teamplayer = await teamplayermodel.findByIdAndUpdate(id, req.body, { new: true });
        if (!teamplayer) {
            return res.status(404).json({
                message: "Team player not found"
            });
        }
        res.status(200).json({
            message: "Team player updated successfully",
            data: teamplayer
        });
    } catch (err) {
        console.error("Error updating team player:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

//----teamid ---

const getteamid = async (req, res) => {
    const { teamId } = req.params;
    try {
        const teamplayer = await teamplayermodel.find({ teamId: teamId }).populate('userId', 'firstname lastname email');
        if (!teamplayer) {
            return res.status(404).json({
                message: "Team player not found"
            });
        }
        res.status(200).json({
            message: "Team player data",
            data: teamplayer
        });
    } catch (err) {
        console.error("Error fetching team player by team ID:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


// get team player by userid


module.exports = { createteamplayer, getallteamplayer, deleteteamplayer, updateteamplayer, getteamid }