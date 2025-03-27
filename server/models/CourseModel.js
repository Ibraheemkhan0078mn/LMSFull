import mongoose from 'mongoose'



let CourseSchema = new mongoose.Schema({

    tumbnailUrl: {
        type: String
    },

    name: {
        type: String
    },

    catagory: {
        type: String
    },

    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lecture"
        }
    ],

    disc: {
        type: String
    },

    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    },
    createrImgUrl:{
        type:String
    },
    quizTest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizQuestion"
        }
    ]

},
    {
        timestamps: true
    })







export default mongoose.model("course", CourseSchema)