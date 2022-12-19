const errorHandler = (error, req, res, next) => {
  let code = 500
  let message = "internal server error"

  if(error.name === "username_is_required"){
    code = 401
    message = "username is required"
  } 
  if(error.name === "data_not_found"){
    code = 404
    message = "data not found"
  } 
  if(error.name === "BSONTypeError"){
    code = 404
    message = error.message
  } 

  if(error.name === "TypeError" && error.message === "Cannot convert undefined or null to object"){
    code = 404
    message = "data not found"
  } else if(error.name === "TypeError"){
    code = 404
    message = error.message
  } 
  
  if(error.name === 'invalid_login'){
    code = 401
    message = "invalid email or password"
  }

  if(error.name === 'validation_error'){
    code = 401
    message = error.message
  }

  res.status(code).json({message})
}

module.exports = errorHandler