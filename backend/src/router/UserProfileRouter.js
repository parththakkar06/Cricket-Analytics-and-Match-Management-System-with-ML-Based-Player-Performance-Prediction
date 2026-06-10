const routers = require('express').Router();


const userprofulecontroller = require('../controller/UserprofileController')

const authmiddleware = require('../middlware/Authmiddleware')



routers.post('/userprofile',userprofulecontroller.createuserprofile)
routers.get('/userprofile',userprofulecontroller.getuserprofile)
routers.delete('/userprofile/:id',userprofulecontroller.deleteuserprofile)
routers.put('/userprofile/:id',userprofulecontroller.updateuserprofile)
routers.post('/userprofilepath',userprofulecontroller.adduserprofilewithFile)
routers.get('/userprofile/:userId',userprofulecontroller.getuserprofilebyid)


module.exports = routers
