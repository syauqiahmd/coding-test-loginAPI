if(process.env.Mode_ENV != 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const router = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

module.exports = app