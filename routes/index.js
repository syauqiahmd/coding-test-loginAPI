const UserController = require('../controllers/userController')

const router = require('express').Router()

router.get('/test', (req, res)=>{
  res.status(200).json({message: "OK"})
})

router.get('/users', UserController.findAll)
router.post('/users', UserController.create)

module.exports = router