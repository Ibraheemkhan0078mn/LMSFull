import mongoose from 'mongoose'




const quizQuestionSchema= new mongoose.Schema({
    question:{
        type:String
    },
    optionArray:{
        type:Array,
        default:[]
    },
    correctOptionIndex:{
        type:Number
    }
},
{
    timestamps:true
})




export default mongoose.model("QuizQuestion", quizQuestionSchema);