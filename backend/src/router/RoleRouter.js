const router = require("express").Router();

const rolecontroller = require('../controller/RoleController')



router.post('/roles',rolecontroller.createRole)
router.get('/roles',rolecontroller.getallrole)
router.delete('/role/:id',rolecontroller.deleteRole)
router.get('/roles/:id',rolecontroller.getrolebyid)


module.exports = router