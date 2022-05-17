const app=require('./app');
const dotenv=require('dotenv');
const ConnnectDatabase = require('./config/database')
 
dotenv.config({path:'Backend/config/config.env'});

ConnnectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`listening to the port ${process.env.PORT}`);
})