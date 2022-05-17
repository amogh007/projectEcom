const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({
   name:{
       type:String,
       required:[true,"please enter the product name "]
   },
   description:{
       type:String,
       required:[true,"please enter the product description "]
   },
   price:{
       type:Number,
       required:[true,"please enter the product price"],
       maxLength:[8,'price cannot exceed 8 character']
   },
   rating:{
       type:Number,
       default:0
   },
   images:[{
       public_id:{
           required:true,
           type:String
       },
       url:{
        required:true,
        type:String
    }
   }],
   category:{
       type:String,
       required:[true,"please enter the product category"]
   },
   stock:{
       type:Number,
       maxLength:[4,"stock cannot exceed 4 character"],
       
       default:1
   },
   NumberOfRiviews:{
        type:Number,
        default:0
   },
   Riviews:[{
       name:{
            type:String,
            required:[true,"please enter the Name"]
       },
       rating:{
           type:Number,
           required:[true,"please enter the rating"]
       },
       Comment:{
           type:String,
           required:[true,"please enter the comment"]
       }
   }],
   createdAt:{
       type:Date,
       default:Date.now
   }
})

module.exports=mongoose.model('Products',ProductSchema)