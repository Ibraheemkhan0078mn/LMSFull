import express from 'express'
const router= express.Router()
import TeacherModel from '../models/TeacherModel.js'
import TeacherLoggedInCheck from '../middlewares/TeacherLoggedInCheck.js'
import ProductModel from '../models/CourseModel.js'
import CourseModel from '../models/CourseModel.js'













router.post("/getTeacherCatagWiseCourses",TeacherLoggedInCheck, async (req,res)=>{
    let {catagory}= req.body

    await req.Teacher.populate("courses")

    // console.log(req.Teacher)
    let currentTeacherCourses= req.Teacher.courses;
    if(catagory=="All"){
       return  res.send({status:"success", msg:"The courses are successfully fetched", catagWiseCoursesArray:currentTeacherCourses})
    }




    let catagWiseCoursesArray=[];
    for(let i=0; i<currentTeacherCourses.length; i++){
        if(currentTeacherCourses[i].catagory==catagory){
            catagWiseCoursesArray.push(currentTeacherCourses[i])
        }
    }

 
    res.send({status:"success", msg:"The courses are successfully fetched", catagWiseCoursesArray})
})

















router.post("/getCatagWiseCourses", async (req,res)=>{

    let {catagory}= req.body

    if(catagory=="All"){
        let catagWiseCoursesArray= await CourseModel.find()
        return res.send({status:"success", msg:"All Courses are fetched from the backend", catagWiseCoursesArray})
    }




    let catagWiseCoursesArray= await CourseModel.find({catagory:catagory})
    if(catagWiseCoursesArray.length==0   ||   !catagWiseCoursesArray){
        return res.send({status:"failed", msg:"No products are found", })
    }



    res.send({status:"success", msg:"The courses are successfuly fetched from the backend", catagWiseCoursesArray})
})


















export default router;