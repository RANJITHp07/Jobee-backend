import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

//this is an function used to connect the mongodb
export const connectDB=async()=>{
    try{
        const mongo_uri=process.env.MONGO_URL;
        if(mongo_uri){
            await mongoose.connect(mongo_uri).then(()=>{
                const connection = mongoose.connection;
                connection.on('error', (error) => {
                    console.log(error, 'connection interupted')
                })
                console.log("Connected to database")
            }).catch((err)=>{
                console.log(err)
            })
        }
    }catch(err){
        console.log(err)
    }
}