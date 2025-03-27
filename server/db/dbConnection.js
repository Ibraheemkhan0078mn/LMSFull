import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()



async function dbConnection (){
    try{
        mongoose.connect(process.env.mongodbUri)
        .then((response)=>{
            console.log("Mongodb is connected")
        })
    }catch(error){
        console.log("something went in db connection")
    }

}







export default dbConnection