const User = require('../models/user')

const authorization = async (req, res, next)=>{
  try {
    if(req.user.role !== "admin"){
      throw ({name: "forbidden"})
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authorization