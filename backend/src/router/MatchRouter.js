    const  router = require('express').Router()



const matchcontroller = require('../controller/MatchController')


router.post('/match',matchcontroller.creatematch)
router.get('/matchs',matchcontroller.getallmatch)
router.delete('/match/:id',matchcontroller.deletematch)
router.put('/match/:id',matchcontroller.updatematch)
router.get('/match/:id',matchcontroller.getmatchbyid)
router.get('/match/tour/:tournamentId',matchcontroller.getbytournametid)
router.get('/match/user/:userId',matchcontroller.getmatchbyuserid)


module.exports = router