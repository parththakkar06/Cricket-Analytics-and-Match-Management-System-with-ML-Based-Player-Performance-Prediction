const router = require('express').Router()



const teamplayercontroller = require('../controller/TeamPlayerController')


router.post('/teamplayer',teamplayercontroller.createteamplayer)
router.get('/teamplayer',teamplayercontroller.getallteamplayer)
router.delete('/teamplayer/:id',teamplayercontroller.deleteteamplayer)
router.put('/teamplayer/:id',teamplayercontroller.updateteamplayer)
router.get('/teamplayer/player/:teamId',teamplayercontroller.getteamid)



module.exports = router