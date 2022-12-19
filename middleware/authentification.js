const redis = require('../config/redis')
const { decodeToken } = require('../helpers')
const User = require('../models/user')

const authentication = async (req, res, next)=>{
  try {
    const { access_token } = req.headers
    if(!access_token){
      throw { name : "invalid_token" }
    }
    const payload = decodeToken(access_token)
    const cacheToken = await redis.get(`user_token:${access_token}`)
    if (!cacheToken) {
      throw { name: "invalid_token" };
    }
    if (JSON.parse(cacheToken) !== access_token) {
      throw { name: "invalid_token" };
    }
    const user = await User.findByPK(payload.id)
    if (!user) {
      throw { name: "invalid_token" };
    }
    req.user = {
      id: user._id,
      role: user.role
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication