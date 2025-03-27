import express from "express"
import StudentModel from "../models/StudentModel.js"
const router = express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import StudentLoggedInCheck from "../middlewares/StudentLoggedInCheck.js"
import CourseCertificateModel from "../models/CourseCertificate.model.js"
import multer from 'multer'
import cloudinaryImport from 'cloudinary'
const cloudinary = cloudinaryImport.v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'













cloudinary.config({
    cloud_name: 'dop329ono', // Replace with your Cloudinary cloud name
    api_key: '856196912959875',       // Replace with your Cloudinary API key
    api_secret: '_SLgclLAS2L5Qty0DqAPvzmlmvw', // Replace with your Cloudinary API secret
});


// for images
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'LMS/teacher',
        allowed_formats: ['jpeg', 'jpg', 'png']
    }
})


let upload = multer({ storage: storage });


















router.get("/", (req, res) => {
    res.send("The student router is working")
}
)









router.post("/Registration",upload.single("studentProfileImage"), async (req, res) => {
    try {

        let { username, email, phoneNo, password } = req.body

        // console.log( username, email, phoneNo, password )

        if (!username || !email || !phoneNo || !password || username == "" || email == "" || phoneNo == "" || password == "") {
            return res.send({ status: "failed", msg: "All fields are required" })
        }


        if(req.file){
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
    
                    let createdStudent = await StudentModel.create({
                        imageUrl:req.file.path,
                        username,
                        email,
                        phoneNo,
                        password: hash
                    })
    
                    let token = jwt.sign({ studentId: createdStudent._id, email, phoneNo, password: createdStudent.password }, process.env.StudentSecureKey)
                    res.cookie("StudentToken", token).send({ status: "success", msg: "The student is successfuly created", createdStudent })
    
                })
            })
    
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
    
                    let createdStudent = await StudentModel.create({
                        username,
                        email,
                        phoneNo,
                        password: hash
                    })
    
                    let token = jwt.sign({ studentId: createdStudent._id, email, phoneNo, password: createdStudent.password }, process.env.StudentSecureKey)
                    res.cookie("StudentToken", token).send({ status: "success", msg: "The student is successfuly created", createdStudent })
    
                })
            })
    
        }

       


    } catch (err) {
        return res.send({ status: "error", msg: "Error from try and catch of Registration of student router", err })
    }


    // res.send("working")
})




















router.post("/Login", async (req, res) => {

    try {
        let { phoneNo, password } = req.body;
        if (phoneNo == "" || password == "" || !phoneNo || !password) {
            return res.send({ status: "failed", msg: "All fields are required in login" })
        }


        let existingStudent = await StudentModel.findOne({ phoneNo: phoneNo })
        if (!existingStudent) {
            return res.send({ status: "failed", msg: "No user is found on this phone number" })
        }


        let result = await bcrypt.compare(password, existingStudent.password)

        if (!result) {
            return res.send({ status: "failed", msg: "The phoneNo or password is incorrect" })
        }



        let token = jwt.sign({ studentId: existingStudent._id, email: existingStudent.email, phoneNo: existingStudent.phoneNo, password: existingStudent.password }, process.env.StudentSecureKey)
        res.cookie("StudentToken", token).send({ status: "success", msg: "The student is successfuly logged in", existingStudent, result })




    } catch (err) {
        return res.send({ status: "error", msg: "Error from try and catch of Registration of student router", err })
    }


})













router.get("/Logout", async (req, res) => {
    try {

        let jwtToken = req.cookies.StudentToken;
        if (!jwtToken) {
            return res.send({ status: "failed", msg: "The jwt is not found" })
        }
        res.clearCookie("StudentToken").send({ status: "success", msg: "The Student is successfully Loggedout" })

    } catch (err) {
        res.send({ status: "error", msg: "Error from trycatch of Logout route in student routes", err })
    }
})















router.get("/getAllStudentsData", async (req,res)=>{
    try{
        
        let AllStudentsData= await StudentModel.find()

        if(AllStudentsData?.length>0){
            return res.send({status:"success", msg:"All student is successfully getted", AllStudentsData})
        }else{
            return res.send({status:"failed", msg:"something went wrong in fetching data from database"})
        }


    }catch(err){
        return res.send({status:"error", msg:"Something went wrong in getAllStudensData", err})
    }
})



























router.get("/getCurrentStudentData", async (req, res) => {
    let jwtToken = req.cookies.StudentToken
    if (!jwtToken) {
        return res.send({ status: "failed", msg: "Jwt is not found" })
    }




    let decodedToken;
    try {
        decodedToken = jwt.verify(jwtToken, process.env.StudentSecureKey)
    } catch (err) {
        return res.send({ status: "failed", msg: "The jwt is not correct" })
    }





    if (!decodedToken) {
        return res.send({ status: "failed", msg: "Something went in jwt" })
    }





    let studentId = decodedToken.studentId;
    let existingStudent = await StudentModel.findOne({ _id: studentId }).populate("purchasedCourses")
    if (!existingStudent) {
        return res.send({ status: "failed", msg: "The Student on this id of jwt is not found" })
    }



    res.send({ status: "success", msg: "The Student data is fetched successfuly", currentStudentData: existingStudent })


})













router.post("/markAsCompleteLecture", async (req, res) => {
    let { lectureId } = req.body;
    let jwtToken = req.cookies.StudentToken
    if (!jwtToken) {
        return res.send({ status: "failed", msg: "Jwt is not found" })
    }




    let decodedToken;
    try {
        decodedToken = jwt.verify(jwtToken, process.env.StudentSecureKey)
    } catch (err) {
        return res.send({ status: "failed", msg: "The jwt is not correct" })
    }





    if (!decodedToken) {
        return res.send({ status: "failed", msg: "Something went in jwt" })
    }





    let studentId = decodedToken.studentId;
    let existingStudent = await StudentModel.findOne({ _id: studentId })
    if (!existingStudent) {
        return res.send({ status: "failed", msg: "The Student on this id of jwt is not found" })
    }


    if (existingStudent.completedLectures.includes(lectureId)) {
        return res.send({ status: "present", msg: "This lecture id is already present" })
    }


    await existingStudent.completedLectures.push(lectureId)
    await existingStudent.save()


    let completedLecturesIds = existingStudent.completedLectures;

    res.send({ status: "success", msg: "The lecture id is entered in completedLecture array of current student", completedLecturesIds })


})



















router.post("/removeLectureId", StudentLoggedInCheck, async (req, res) => {
    let { lectureId } = req.body;

    if (!req.user.completedLectures.includes(lectureId)) {
        return res.send({ status: "failed", msg: "no lecture id is found in completed lecture array of student model" })
    }

    let lectureIdIndex = req.user.completedLectures.indexOf(lectureId)
    req.user.completedLectures.splice(lectureIdIndex, 1)


    await req.user.save()

    //    console.log()

    let completedLecturesIdUpdatedArray = req.user.completedLectures;

    res.send({ status: "success", msg: "The lectureId is successfully remove from array", completedLectureids: completedLecturesIdUpdatedArray })

})













// take the courseId and add it in purchasedCourses array of logged in student
// in future, we make the entire payment integration for purchased course.
router.post("/buyCourse",StudentLoggedInCheck, async (req,res)=>{
    let {courseId}= req.body;
    if(!courseId   || courseId==""){
        return res.send({status:"failed", msg:"Course id is not found"})
    }


    if(req.user.purchasedCourses.includes(courseId)){
        return res.send({status:"present", msg:"The course id is already present"})
    }


    req.user.purchasedCourses.push(courseId);
    await req.user.save()

    res.send({status:"success", msg:"The Course is purchased"})


})


















router.post("/getLoggedInUserCertificate",StudentLoggedInCheck,async (req,res)=>{
    try {
        

        // console.log(req.user._id)
        let existingCertificate= await CourseCertificateModel.findOne({studentId:req.user._id}).populate("courseId")

        if(!existingCertificate){
            return res.send({status:"failed", msg:"No certificate are found for this user"})
        }


        let existingCertificateArray=[];
        if(!Array.isArray(existingCertificate)){
            existingCertificateArray=[existingCertificate]
        }


        res.send({status:"success", msg:"Successfully get the array of certificate for current logged in user", certificates:existingCertificateArray})


    } catch (error) {
        return res.send({status:"error", msg:"Error from trycatch of getLoggedInUserCertificate ", error})
    }
})
















export default router;