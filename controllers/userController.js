const { ObjectId } = require('mongodb')
const { signedToken, isValidPassword, hashedPassword } = require('../helpers')
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

  static async find(req, res, next){
    try {
      const { id } = req.params      
      const user = await User.findByPK(req.params.id)
      if(!user){
        throw { name: "user_not_found" }
      }
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next){
    try {
      const { id } = req.params
      const newObj = {}
      const data = await User.findByPK(req.params.id)
      if(!data){
        throw { name: "data_not_found" }
      }
 
      if(req.body.username) newObj.username = req.body.username
      if(req.body.email) newObj.email = req.body.email
      if(req.body.password) newObj.password = hashedPassword(req.body.password)
      if(req.body.role) newObj.role = req.body.role

      await User.updateById(id, newObj)
      res.status(200).json({message: "update success"})
    } catch (error) {
      next(error)
    }
  }

  static async destroy(req, res, next){
    try {
      const { id } = req.params
      const isUser = await User.findByPK(id)
      if(!isUser){
        throw { name: "data_not_found" }
      }
      const user = await User.destroy(isUser._id)
      res.status(200).json({message: "deleted success"})
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next){
    try {
      const { email, password } = req.body
      const user = await User.findBy({email})
      if(!user){
        throw { name: "invalid_login" }
      }
      if (!(isValidPassword(password, user.password))){
        throw { name: "invalid_login" }
      }
      const access_token = signedToken({id : user._id})
      res.status(200).json({access_token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController