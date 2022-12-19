const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentification')
const authorization = require('../middleware/authorization')

const router = require('express').Router()

router.get('/test', (req, res)=>{
  res.status(200).json({message: "OK"})
})

router.post('/login', UserController.login)

router.use(authentication)
router.get('/users', UserController.findAll)

router.use(authorization)
router.post('/users', UserController.create)
router.get('/users/:id', UserController.find)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.destroy)

module.exports = router