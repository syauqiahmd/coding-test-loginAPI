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
}

module.exports = User