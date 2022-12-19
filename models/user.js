const { getDb } = require('../config/connection')
const { ObjectId } = require('mongodb')
const { hashedPassword } = require('../helpers')

class User{
  static users(){
    const db = getDb()
    const usersCollection = db.collection("users")
    return usersCollection
  }

  static async create(data){
    const userCollection = this.users();

    if(this.validateUsername(data.username).length > 0 ) {
      throw { 
        name: "validation_error", 
        message : this.validateUsername(data.username)}
    }
    if(this.validateEmail(data.email).length > 0 ) {
      throw { 
        name: "validation_error", 
        message : this.validateEmail(data.email)}
    }
    if(this.validatePassword(data.password).length > 0 ) {
      throw { 
        name: "validation_error", 
        message : this.validatePassword(data.password)}
    }
    if(this.validateRole(data.role).length > 0 ) {
      throw { 
        name: "validation_error", 
        message : this.validateRole(data.role)}
    }

    const isUnique = await userCollection.findOne({email : data.email})
    if(isUnique !== null){
      throw { 
        name: "validation_error", 
        message : "email must be unique"
      }
    }

    data.password = hashedPassword(data.password)
    return await userCollection.insertOne(data)
  }

  static async findAll(){
    const userCollection = this.users();
    const users = await userCollection.find().toArray()
    users.map(el => {
      delete el.password
    })
    return users
  }

  static async findBy(object){
    const userCollection = this.users();
    const user = await userCollection.findOne(object)
    return user
  }

  static async findByPK(id){
    const userCollection = this.users();
    const user = await userCollection.findOne({_id : ObjectId(id)})
    delete user.password
    return user
  }

  static async updateById(id, data){
    const userCollection = this.users()
    const filter = {_id : ObjectId(id)}
    const options = { upsert: true }
    const user = await userCollection.findOne({_id : ObjectId(id)})

    if(data.email) {
      if(this.validateEmail(data.email).length > 0 ) {
        throw { 
          name: "validation_error", 
          message : this.validateEmail(data.email)}
      }
      const isUnique = await userCollection.findOne({email : data.email})
      if(isUnique !== null){
        throw { 
          name: "validation_error", 
          message : "email must be unique"
        }
      }
      user.email = data.email
    }
    if(data.username) {
      if(this.validateUsername(data.username).length > 0 ) {
        throw { 
          name: "validation_error", 
          message : this.validateUsername(data.username)}
      }
      user.username = data.username
    }
    if(data.password) {
      if(this.validatePassword(data.password).length > 0 ) {
        throw { 
          name: "validation_error", 
          message : this.validatePassword(data.password)}
      }
      user.password = hashedPassword(data.password)
    }
    if(data.role) {
      if(this.validateRole(data.role).length > 0 ) {
        throw { 
          name: "validation_error", 
          message : this.validateRole(data.role)}
      }
      user.role = data.role
    }

    const result = await userCollection.updateOne(filter, { $set: user }, options);
    return result
  }

  static async destroy(id){
    const userCollection = this.users();
    return await userCollection.deleteOne({_id : ObjectId(id)})
  }

  static validateUsername(username){
    const result = []
    if(!username) {
      result.push("username is required")
    }
    return result
  }
  
  static validateEmail(email){
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const result = []
    if(!email) {
      result.push("email is required")
    }
    if(email){
      if(email.match(pattern) === null) {
        result.push("invalid email format")
      }
    }
    return result
  }

  static validatePassword(password){
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    const result = []
    if(!password) result.push("password is required")
    if(password){
      if(password.match(pattern) === null ) {
        result.push("Should contain at least a capital letter, a small letter, a number, and a special character")
      }
    }
    return result
  }

  static validateRole(role){
    const result = []
    if(!role) {
      result.push("role is required")
    }
    switch (role) {
      case "admin":
        break;
      case "user":
        break;
      default:
        result.push("role must be admin or user")
    }
    return result
  }

}

module.exports = User