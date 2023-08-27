import nocache from "nocache";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb"


const app=createServer();


connectDB().then(()=>{
    app?.listen(process.env.PORT,()=>{
        console.log("connected to the server")
    })
})