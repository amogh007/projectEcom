const app=require('./app');
const dotenv=require('dotenv');
const ConnnectDatabase = require('./config/database')
// handling uncaught exceptions
process.on('uncaughtException', (err)=>{
    console.log(`error ${err.message}`)
    console.log('server is shutting down due to uncaught exception')
   process.exit(1)
})
 
dotenv.config({path:'Backend/config/config.env'});

ConnnectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`listening to the port ${process.env.PORT}`);
})

//handling unhandled exceptions
process.on('unhandledRejection',(err)=>{
    console.log(`error ${err.message}`);
    console.log('server is shutting due to unhandled rejection ')
    server.close(()=>{
        process.exit(1);
    })
})