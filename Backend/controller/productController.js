const Products=require('../Models/productModels');

exports.createProduct=async (req,res,next)=>{
    const product=await Products.create(req.body)
    res.status(201).json({sucess:true,product})
}

exports.getAllproducts=async (req,res)=>{
    const products=await Products.find()
    res.status(200).json({sucess:true,products})
}

exports.updateProduct=async (req,res,next)=>{
    const iddd=req.params.id
    const product=await Products.findById(iddd)
    if(!product){
        res.status(500).json({sucess:false,message:"product not found "})
    }
    const produt=await Products.findByIdAndUpdate(iddd,req.body,{new:true,runValidators:true,useFindAndModify:false})
    res.status(200).json({sucess:true,produt});

}

exports.deletProduct=async (req,res,next)=>{
    const product=await Products.findById(req.params.id)
    if(!product){
        res.status(500).json({sucess:false,message:"product not found"})
    }
    await product.remove();
    res.status(200).json({sucess:true,message:"product deleted successfully"})
}