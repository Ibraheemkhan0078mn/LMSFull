import mongoose from 'mongoose'





const CourseCertificateSchema= new mongoose.Schema({
    studentId:{
        type:String
    },
    studentName:{
        type:String
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    },
    createrName:{
        type:String
    },
    courseName:{
        type:String
    },
    certificateId:{
        type:String
    },
    obtainedMarks:{
        type:Number
    },
    totalMarks:{
        type:Number
    },
    percentage:{
        type:Number
    }

},
{
    timestamps:true
})





export default mongoose.model("courseCertificate", CourseCertificateSchema)