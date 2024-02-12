import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb"


const app=createServer();

//listening to the servers
connectDB().then(()=>{
    app?.listen(3000,()=>{
        console.log(`connected to the server`)
    })
})