const User = require('../models/user')

class UserController {
  static async create(req, res, next){
    try {
      const { username, email, password, role } = req.body
      const user = await User.create({ username, email, password, role })
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
  static async findAll(req, res, next){
    try {
      const user = await User.findAll()
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController