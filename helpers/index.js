const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_CREDENTIAL
const SALT = 10

const hashedPassword = (password) => {
  return bcrypt.hashSync(password, SALT)
}

const isValidPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

const signedToken = (payload) => {
  return jwt.sign(payload, SECRET)
}

const decodeToken = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = {
  hashedPassword,
  isValidPassword,
  signedToken,
  decodeToken
}