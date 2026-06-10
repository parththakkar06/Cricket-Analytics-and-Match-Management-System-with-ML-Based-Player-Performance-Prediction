    const router = require('express').Router()




const teamrouter = require('../controller/TeamController')



router.post('/team',teamrouter.createteam)
router.get('/team',teamrouter.getallteam)
router.delete('/team/:id',teamrouter.deleteteam)
router.put('/team/:id',teamrouter.updateteam)
router.get('/tour/team/:tournamentId',teamrouter.getTeamByTournamentId)
router.get('/team/:id',teamrouter.getTeamById)


module.exports = router
