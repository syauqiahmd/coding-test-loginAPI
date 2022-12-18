const { getDb } = require('../config/connection')
const { ObjectId } = require('mongodb')
const { hashedPassword } = require('../helpers')

class User{
  static users(){
    const db = getDb()
    const usersCollection = db.collection("users")
    return usersCollection
  }

  static validate(data){
    const result = []
    if(!data.username) result.push("username_is_required")
    return result
  }

  static async create(data){
    const userCollection = this.users();
    data.password = hashedPassword(data.password)
    if(this.validate(data).length > 0){
      throw { name: this.validate(data)[0] }
    }
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

    if(data.email) user.email = data.email
    if(data.username) user.username = data.username
    if(data.password) user.password = hashedPassword(data.password)
    if(data.role) user.role = data.role

    const result = await userCollection.updateOne(filter, { $set: user }, options);
    return result
  }

  static async destroy(id){
    const userCollection = this.users();
    return await userCollection.deleteOne({_id : ObjectId(id)})
  }

}

module.exports = User