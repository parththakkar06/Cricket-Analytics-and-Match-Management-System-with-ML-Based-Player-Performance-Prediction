const router = require('express').Router()


const userscorecontroller = require('../controller/UserScoreController')



router.post('/userscore',userscorecontroller.createuserscore)
router.get('/userscore',userscorecontroller.getalluserscore)
router.delete('/userscore/:id',userscorecontroller.deletescore)
router.put('/userscore/:id',userscorecontroller.updateuserscore);
router.get('/userscore/:id',userscorecontroller.getuserscorebyid)
router.get('/userscore/user/:userId',userscorecontroller.getscorebyuserid)

module.exports = router;