const tournamentmodel = require('../models/TournamentModel')

// ------------------------ user create api =----------------------------------------------------------------------------

const createtournament = async (req, res) => {

    // const tournamentobj = {
    //     tournamentname: req.body.tournamentname,
    //     orgnaizername:req.body.orgnaizername,
    //     orgnaizercontact:req.body.orgnaizercontact,
    //     city:req.body.city,
    //     category:req.body.category,
    //     startdate:req.body.startdate,
    //     enddate:req.body.enddate,
    //     maxteam:req.body.maxteam,
    //     balltype:req.body.balltype,
    //     overs:req.body.overs,
    //     pithchtype:req.body.pithchtype,
    //     matchtype:req.body.matchtype
    // }
    try {
        const tournament = await tournamentmodel.create(req.body)
        res.status(201).json({
            message: "tournament created successfully.....",
            data: tournament

        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }

}


//----------------------get all user profile api----------------------------------------------------------------------------


const getalltournament = async (req, res) => {

    try{

        const tournament = await tournamentmodel.find()
        res.status(200).json({
            message: "all tournament data",
            data: tournament
        })


    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }
}


//----------------------delete tournament by id api----------------------------------------------------------------------------



const deletetournament = async (req, res) => {

    try{
        const id = req.params.id
        const deletetournament = await tournamentmodel.findByIdAndDelete(id)
        if(deletetournament == null){
            res.status(400).json({
                message: "tournament not found"
            })
        }else{
            res.json({
                message: "tournament deleted successfully",
                data: deletetournament
            })
        }
    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }   



}



//----------------------update tournament by id api----------------------------------------------------------------------------


const updatetournament = async (req, res) => {
    try {
        const id = req.params.id;
        const tournament = await tournamentmodel.findByIdAndUpdate(id, req.body, { new: true });
        if (tournament == null) {
            res.status(404).json({
                message: "Tournament not found"
            });
        }
        res.status(200).json({
            message: "Tournament updated successfully",
            data: tournament
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

//----------------------get tournament by id api----------------------------------------------------------------------------

const gettournamentbyid = async (req, res) => {
    try {
        const id = req.params.id;
        const tournament = await tournamentmodel.findById(id);
        if (!tournament) {
            res.status(404).json({
                message: "Tournament not found"
            });
        }
        res.status(201).json({
            message: "Tournament found successfully",
            data: tournament
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    createtournament,
    getalltournament,
    deletetournament,
    updatetournament,
    gettournamentbyid
}