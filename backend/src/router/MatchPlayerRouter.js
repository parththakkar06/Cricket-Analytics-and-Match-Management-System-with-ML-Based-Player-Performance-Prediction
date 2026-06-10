const router = require('express').Router();


const matchplayerController = require('../controller/MatchPlayerController')


router.post('/matchplayer',matchplayerController.creatematchplayer)
router.get('/matchplayer',matchplayerController.getallmatchplayer)
router.delete('/matchplayer/:id',matchplayerController.deletematchplayer)
router.put('/mathplayer/:id',matchplayerController.updatematchplayer)



module.exports = router