const routes = require("express").Router();

const usercontroller = require('../controller/UserController')

const authmiddleware = require('../middlware/Authmiddleware')


routes.post('/user',usercontroller.createuser)
routes.get('/users',authmiddleware.vaildateuser,usercontroller.getalluser)
routes.delete('/user/:id',usercontroller.deleteduser)
routes.post('/login',usercontroller.loginUser);
routes.get('/verify',usercontroller.verifyUser)
routes.get('/getuser',usercontroller.getuser)


module.exports = routes
