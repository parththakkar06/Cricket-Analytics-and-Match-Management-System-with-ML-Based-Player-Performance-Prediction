const matchmodel = require('../models/MatchModel')


// ------------------------ user create api =----------------------------------------------------------------------------

const creatematch = async (req, res) => {

    // const matchobj = {
    //  tournamentId: req.body.tournamentId,
    //     team1Id: req.body.team1Id,
    //     team2Id: req.body.team2Id,
    //     matchtype: req.body.matchtype,
    //     totalovers: req.body.totalovers,
    //     overperbowler: req.body.overperbowler,
    //     totalpowerplayovers: req.body.totalpowerplayovers,
    //     city: req.body.city,
    //     groundname: req.body.groundname,
    //     date: req.body.date,
    //     stateTime: req.body.stateTime,
    //     balltype: req.body.balltype,
    //     pithchtype: req.body.pithchtype,
    //     tosswinningteam: req.body.tosswinningteam,
    //     tosswinningelected: req.body.tosswinningelected,
    //     firstInningStatus: req.body.firstInningStatus,
    //     secondInningStatus: req.body.secondInningStatus,
        
        

    // }
    // console.log(matchobj);
    try {
        console.log("req.body", req.body);

        const match = await matchmodel.create(req.body)
        console.log("match : ", match);
        res.status(201).json({
            message: "match created successfully.....",
            data: match

        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        })
    }


}


//----------------------get all user profile api----------------------------------------------------------------------------


const getallmatch = async (req, res) => {

try{

    const match = await matchmodel.find().populate('team1Id','teamname').populate('team2Id','teamname').populate('tournamentId','tournamentname')
    console.log(match);
    res.status(200).json({
        message: "all match data",
        data: match
    })


}catch(error){
    res.status(500).json({
        message: "internal server error"
    })
}

}



// ----------------------delete tournament by id api----------------------------------------------------------------------------


const deletematch = async (req, res) => {

try{
    const id = req.params.id
    const deletematch = await matchmodel.findByIdAndDelete(id)
    if(deletematch == null){
        res.status(400).json({
            message: "match not found"
        })
    }else{
        res.status(201).json({
            message: "match deleted successfully",
            data: deletematch
        })
    }
}catch(err){
    res.status(500).json({
        message: "internal server error"
    })
}
}

// ----------------------update tournament by id api----------------------------------------------------------------------------


const updatematch = async (req, res) => {
    try {
      const id = req.params.id;
  
      const updatedMatch = await matchmodel.findByIdAndUpdate(
        id,
        {
          $set: {
            tosswinningteam: req.body.tosswinningteam,
            tosswinningelected: req.body.tosswinningelected
          }
        },
        {
          new: true,
          runValidators: true
        }
      );
      if (!updatedMatch) {
        return res.status(404).json({
          message: "Match not found"
        });
      }
  
      res.status(200).json({
        message: "Match updated successfully",
        data: updatedMatch
      });
  
    } catch (err) {
      console.error("Error updating match:", err);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  };
  

// getby tournamnet id---------------
const getbytournametid = async(req,res)=>{
    try{
        const tournamentId = req.params.tournamentId
        const match = await matchmodel.find({tournamentId:tournamentId}).populate('team1Id','teamname').populate('team2Id','teamname')
        console.log(match);
        if(match == null){
            res.status(400).json({
                message: "match not found"
            })
        }else{
            res.json({
                message: "match fetched successfully",
                data: match
            })
        }
    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }
}

//get by id------------------   ------------------

const getmatchbyid = async (req, res) => {
    try {
        const id = req.params.id
        const match = await matchmodel.findById(id).populate('team1Id','teamname').populate('team2Id','teamname')
        if (match == null) {
            res.status(400).json({
                message: "match not found"
            })
        } else {
            res.json({
                message: "match fetched successfully",
                data: match
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}
 

// get user id fetch my match data---------

const getmatchbyuserid = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("userId match.......", userId);
        const match = await matchmodel.find({ userId: userId }).populate('userId','firstname' ,'lastname')
        if (match == null) {
            res.status(400).json({
                message: "match not found"
            })
        } else {
            res.json({
                message: "match fetched successfully",
                data: match
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = {

    creatematch,
    getallmatch,
    deletematch,
    updatematch,
    getbytournametid,
    getmatchbyid ,
    getmatchbyuserid
}