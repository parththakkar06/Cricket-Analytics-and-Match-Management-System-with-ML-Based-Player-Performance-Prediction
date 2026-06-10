const userscoremodel = require('../models/UserscoreModel');


// ------------------------ user create api =----------------------------------------------------------------------------

const createuserscore = async (req, res) => {

    const userscoreobj = {
        userId: req.body.userId,
        totalmatchplayed: req.body.totalmatchplayed,
        totalplayedscores: req.body.totalplayedscores,
        totalinnings: req.body.totalinnings,
        avg: req.body.avg,
        scorerunrate: req.body.scorerunrate,
        total50a: req.body.total50a,
        total100s: req.body.total100s,
        total6s: req.body.total6s,
        total4s: req.body.total4s,
        totalducks: req.body.totalducks,
        totalovers: req.body.totalovers,
        totaloverscore: req.body.totaloverscore,
        maidens:req.body.maidens,
        bowlerwick:req.body.bowlerwick,
        bowlerwides:req.body.bowlerwides,
        bowlernoballs:req.body.bowlernoballs,
        bowler6s:req.body.bowler6s,
        bowler4s:req.body.bowler4s,
        totalcatches:req.body.totalcatches,
        
    }
    try {
        const userscore = await userscoremodel.create(userscoreobj)
        res.status(201).json({
            message: "user score created successfully.....",
            data: userscore

        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


//----------------------get all user score api----------------------------------------------------------------------------

const getalluserscore = async (req, res) => {

    try {
        const userscore = await userscoremodel.find()
        res.status(200).json({
            message: "all user score data",
            data: userscore
        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }

}

//----------------------delete score by id api----------------------------------------------------------------------------

const deletescore = async (req, res) => {

    try{
        const id = req.params.id
        const deletescore = await userscoremodel.findByIdAndDelete(id)
        if(deletescore == null){
            res.status(400).json({
                message: "score not found"
            })
        }else{
            res.json({
                message: "score deleted successfully",
                data: deletescore
            })
        }
    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }   
}
//-updatae user score---------------------------------

const updateuserscore = async (req, res) => {

    try {
        const id = req.params.id
        const userscore = await userscoremodel.findByIdAndUpdate

        (id, req.body   , { new: true });
        if (userscore==null) {
            res.status(404).json({
                message: "User score not found"
            });
         }else{
            res.status(200).json({
                message: "User score updated successfully",
                data: userscore
            });
         }
        }catch(err){
            res.status(500).json({
                message: "internal server error"
            });
        }   
}
// get use score by id ---- 

const getuserscorebyid = async (req, res) => {
    try {
        const id = req.params.id
        const userscore = await userscoremodel.findById(id)
        if (userscore == null) {
            res.status(404).json({
                message: "User score not found"
            });
        } else {
            res.status(200).json({
                message: "User score fetched successfully",
                data: userscore
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}


//----------------------get score by user id api----------------------------------------------------------------------------

const getscorebyuserid = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("userId scre...",userId);
       const userscore = await userscoremodel.find({userId:userId}).populate('userId', 'firstname lastname')
        if (userscore == null) {
            res.status(404).json({
                message: "User score not found"
            });
        } else {
            res.status(201).json({
                message: "User score fetched successfully",
                data: userscore
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}

module.exports = {
    createuserscore,
    getalluserscore,
    deletescore,
    updateuserscore,
    getuserscorebyid,
    getscorebyuserid
}