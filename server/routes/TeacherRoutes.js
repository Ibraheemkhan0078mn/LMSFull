// npm packages
import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import cloudinaryImport from 'cloudinary'
const cloudinary = cloudinaryImport.v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// models
import TeacherModel from '../models/TeacherModel.js'
import blockedJwtModel from '../models/blockedJwt.js'
import CourseModel from '../models/CourseModel.js'
import LectureModel from '../models/LectureModel.js'
import quizQuestion from '../models/quizQuestion.js'
import CourseCertificateModel from '../models/CourseCertificate.model.js'



// middlewares
import TeacherLoggedInCheck from '../middlewares/TeacherLoggedInCheck.js'
import StudentLoggedInCheck from '../middlewares/StudentLoggedInCheck.js'


import { createCourse, createLecture, getAllCourses, getCourseQuizQuestions, getTeacherData, getTeacherRelatedCourses, Login, Logout, quizMarking, quizQuestionCreation, Registration } from '../controllers/Teacher.controller.js'




















// cloudinary.config({
//     cloud_name: 'dop329ono', // Replace with your Cloudinary cloud name
//     api_key: '856196912959875',       // Replace with your Cloudinary API key
//     api_secret: '_SLgclLAS2L5Qty0DqAPvzmlmvw', // Replace with your Cloudinary API secret
// });



cloudinary.config({
    cloud_name: 'dop329ono', // Replace with your Cloudinary cloud name
    api_key: '612175742356499',       // Replace with your Cloudinary API key
    api_secret: '_U7Is8IDdLS41AWVQsmOSScPsm4', // Replace with your Cloudinary API secret
});


// for images
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'LMS/teacher/images',
        allowed_formats: ['jpeg', 'jpg', 'png']
    }
})






// for vedeos
const lectureVideoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: 'video', // Specify video uploads
        folder: 'LMS/Lecture/videos',       // Optional folder
    },
});



let upload = multer({ storage: storage });
let lecturevideoUpload = multer({ storage: lectureVideoStorage })

















// for Registration of Teacher
router.post("/Registration", upload.single("teacherProfileImage"), Registration)














// for Login of Teacher
router.post("/Login", Login)





















// for logout of Teacher
router.get("/Logout", TeacherLoggedInCheck, Logout)























router.get("/getAllTeachersData",getTeacherData)






















// for creation of new course
// the course image is image of course tumbnail
router.post("/createCourse", upload.single("courseImage"), TeacherLoggedInCheck, createCourse)

















// For creation of new lecture in some course
router.post("/createLecture", lecturevideoUpload.single("lectureVideo"), createLecture)

































// Take the Teacher id and then find the courses of that teacher and then send to frontend
router.get("/getTeacherRelatedCourses", getTeacherRelatedCourses)

















// take all the courses from database and send to frontend
router.get("/getAllCourses", getAllCourses)































router.post("/quizQuestionCreation", quizQuestionCreation)















router.post("/getCourseQuizQuestions", getCourseQuizQuestions)














router.post("/quizMarking", StudentLoggedInCheck, quizMarking )































export default router;
