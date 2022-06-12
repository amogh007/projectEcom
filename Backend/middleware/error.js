const ErrorHandler=require('../utils/errorhandler')
module.exports=(err,req,res,next)=>{
  err.message=err.message||"internal server error"
  err.statusCode=err.statusCode||500
  res.status(err.statusCode).json({message:err.message,sucess:false})
  if(err.name=="CastError"){
    const message=`resource not found ${err.path}`
    const err=new ErrorHandler(message,400)

  }
  res.status(err.statusCode).json({message:err.message,sucess:false})
}