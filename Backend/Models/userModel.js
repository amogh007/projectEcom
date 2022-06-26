const mongoose=require('mongoose');
const Validator=require('validator');
const userSchema=mongoose.Schema({
  name:{
      required: [true ,'please enter your name'],
      type:String,
      maxLength:[30,'name should not exceed 30 characters'], 
      minLength:[4,'name should be minimum of 4 characters']
  },
  email: {required: [true,'please enter the emailId'], type:String,unique:true},  
})