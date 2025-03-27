import mongoose from 'mongoose'



let StudentSchema= new mongoose.Schema({
    imageUrl:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    phoneNo:{
        type:Number
    },
    password:{
        type:String
    },
    purchasedCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        }
    ],
    completedLectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"lecture"
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})







export default mongoose.model("student", StudentSchema)