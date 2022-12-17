const { MongoClient } = require('mongodb')

const uri = process.env.DB_URL
let db
const client = new MongoClient(uri)

async function mongoConnect() {
  try {
    db = client.db(process.env.DB_NAME)
  } catch (error) {
    await client.close()
  }
}

const getDb = () => {
  return db
}

module.exports = {
  mongoConnect,
  getDb
}