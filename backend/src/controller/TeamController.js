const { default: mongoose } = require('mongoose');
const teammodel = require('../models/TeamModel');

// ------------------------ user create api =----------------------------------------------------------------------------

const createteam = async (req, res) => {

    // const teamobj = {
    //     teamname: req.body.teamname,
    //     // teamLogo: req.body.teamLogo,
    //     city: req.body.city,
    //     // touranmentId: req.body.touranmentId,
    // }
    try {

        const team = await teammodel.create(req.body)
        res.status(201).json({
            message: "team created successfully.....",
            data: team

        })

    }
    catch (err) {

        res.status(500).json({
            message: "internal server error"
        })
    }

}

//----------------------get all user profile api----------------------------------------------------------------------------

const getallteam = async (req, res) => {

    try {

        const team = await teammodel.find()
        res.status(200).json({
            message: "all team data",
            data: team
        })


    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }

}


// ----------------------delete tournament by id api----------------------------------------------------------------------------

const deleteteam = async (req, res) => {
    
        try {
            const id = req.params.id
            const deleteteam = await teammodel.findByIdAndDelete(id)
            if (deleteteam == null) {
                res.status(400).json({
                    message: "team not found"
                })
            } else {
                res.json({
                    message: "team deleted successfully",
                    data: deleteteam
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "internal server error"
            })
        }

}

//----------------------update user profile api----------------------------------------------------------------------------

const updateteam = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await teammodel.findByIdAndUpdate(id, req.body, { new: true });
        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }
        res.status(200).json({
            message: "Team updated successfully",
            data: team
        });
    } catch (err) {
        console.error("Error updating team:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
//get by id team name 0-----]

const getTeamById = async (req, res) => {
    try {
        const id = req.params.id;
        const team = await teammodel.findById(id);
        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }
        res.status(200).json({
            message: "Team fetched successfully",
            data: team
        });
    } catch (err) {
        console.error("Error getting team by ID:", err);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// ----------- get all teams by tournament id api ------------

const getTeamByTournamentId = async (req, res) => {
    try {
        
        const tournamentId = req.params.tournamentId; 

        console.log("id...",tournamentId);
       const teams = await teammodel.find({ tournamentId:tournamentId});
       console.log("team by tournament id",teams);
        res.status(200).json({
            message: "Teams fetched successfully",
            data: teams
        });
    } catch (err) {
        console.error("Error getting teams by tournament id:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}



// }
module.exports = {
    createteam,
    getallteam,
    deleteteam,
    updateteam,
    getTeamById,
    getTeamByTournamentId
}