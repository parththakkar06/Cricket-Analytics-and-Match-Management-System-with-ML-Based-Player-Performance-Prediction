const router = require('express').Router()



const tourgroundcontroller = require('../controller/TournamentGroundController')


router.post('/tourground',tourgroundcontroller.createtournamentground)
router.get('/tourground',tourgroundcontroller.getalltournamentground)
router.delete('/tourground/:id',tourgroundcontroller.deletetournamentground)
router.put('/tourground/:id',tourgroundcontroller.updateTournamentGround)


module.exports = router

