import mongoose from "mongoose";





let lectureSchema = new mongoose.Schema({
    videoUrl:{
        type:String
    },
    name:{
        type:String
    },
    discription:{
        type:String
    },
    tumbnailUrl:{
        type:String
    },
    data:{
        type:Date,
        default:Date.now
    }
})








export default mongoose.model("lecture", lectureSchema)