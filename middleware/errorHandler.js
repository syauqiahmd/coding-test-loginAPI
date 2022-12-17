const errorHandler = (error, req, res, next) => {
  let code = 500
  let message = "internal server error"
  // console.log(error)

  if(error.name === "user_not_found"){
    code = 404
    message = "user not found"
  } 
  if(error.name === "BSONTypeError" || error.name === "TypeError"){
    code = 404
    message = "data not found"
  } 

  res.status(code).json(message)
}

module.exports = errorHandler