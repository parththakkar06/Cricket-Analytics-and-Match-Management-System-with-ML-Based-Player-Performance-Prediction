const tournamentgroundmodel = require('../models/TournamentGround')



// ------------------------ user create api =----------------------------------------------------------------------------

const createtournamentground = async (req, res) => {

    const tournamentgroundobj = {
        tournamentId: req.body.tournamentId,
        groundname:req.body.groundname
    }
    try {

        const tournamentground = await tournamentgroundmodel.create(tournamentgroundobj)
        res.status(201).json({
            message: "tournament ground created successfully.....",
            data: tournamentground

        })

    } catch (err) {

        res.status(500).json({
            message: "internal server error"
        })
    }
}

//----------------------get all user profile api----------------------------------------------------------------------------

const getalltournamentground = async (req, res) => {

    try {

        const tournamentground = await tournamentgroundmodel.find()
        res.status(200).json({
            message: "all tournament ground data",
            data: tournamentground
        })


    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// ----------------------delete tournament ground by id api----------------------------------------------------------------------------


const deletetournamentground = async (req, res) => {

    try {

        const id = req.params.id
        const deletetournamentground = await tournamentgroundmodel.findByIdAndDelete(id);
        if (deletetournamentground == null) {
            res.status(400).json({
                message: "tournament ground not found"
            })
        } else {
            res.json({
                message: "tournament ground deleted successfully",
                data: deletetournamentground
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

// ----------------------update tournament ground by id api----------------------------------------------------------------------------

const updateTournamentGround = async (req, res) => {

    try {
        const { id } = req.params;
        const tournamentground = await tournamentgroundmodel.findByIdAndUpdate (id, req.body, { new: true });
        if (!tournamentground) {
             res.status(404).json({
                message: "tournament ground not found"
            });
        }
        res.status(200).json({
            message: "tournament ground updated successfully",
            data: tournamentground
        });

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        });
    }

}

module.exports = {
    createtournamentground,
    getalltournamentground,
    deletetournamentground,
    updateTournamentGround
}