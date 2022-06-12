const mongoose = require('mongoose');

const ConnectDatabase=()=>{
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`Mongodb connected wit server ${data.connections.host}`);
    })
}
module.exports=ConnectDatabase;