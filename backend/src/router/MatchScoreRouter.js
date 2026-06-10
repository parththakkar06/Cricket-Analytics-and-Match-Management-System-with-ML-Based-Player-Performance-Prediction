const router = require('express').Router();
const matchscorecontroller = require('../controller/MatchScoreController')


router.post('/creatematchscore', matchscorecontroller.creatematchscore)
router.get('/getallmatchscore', matchscorecontroller.getallmatchscore)
router.get('/getmatchscorebyid/:id', matchscorecontroller.getmatchscorebyid)
router.get('/getmatchscorebyuserid/:userId', matchscorecontroller.getmatchscorebyuserid)
router.get('/getusertournament/:userId', matchscorecontroller.getUserTournaments)
router.get('/getUserTeams/:userId', matchscorecontroller.getUserTeams)
router.get('/getmatchsummary/:matchId', matchscorecontroller.getmatchscorebymatchid)


module.exports = router