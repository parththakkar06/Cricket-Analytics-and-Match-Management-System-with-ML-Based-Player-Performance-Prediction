const router = require('express').Router();

const tournamentcontroller = require('../controller/TournamentController')


router.post('/tournament',tournamentcontroller.createtournament);
router.get('/tournament',tournamentcontroller.getalltournament)
router.delete('/tournament/:id',tournamentcontroller.deletetournament)
router.put('/tournament/:id',tournamentcontroller.updatetournament);
router.get('/tournament/:id',tournamentcontroller.gettournamentbyid)




module.exports = router;