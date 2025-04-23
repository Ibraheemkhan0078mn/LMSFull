import bcrypt from 'bcrypt'
import TeacherModel from '../models/TeacherModel.js'
import blockedJwtModel from '../models/blockedJwt.js'
import CourseModel from '../models/CourseModel.js'
import LectureModel from '../models/LectureModel.js'
import quizQuestion from '../models/quizQuestion.js'
import CourseCertificateModel from '../models/CourseCertificate.model.js'
import jwt from 'jsonwebtoken'


















export const Registration= async (req, res) => {

    try {
        let { username, email, phoneNo, password, portfolioUrl } = req.body;
        // console.log(req.body)
        // console.log(username, email, phoneNo, password, portfolioUrl)

        if (!username || !email || !phoneNo || !password) {
            return res.json({ status: "failed", msg: "All field are required" })
        }





        if (req.file) {

            let imageUrl = req.file.path

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {


                    let createdTeacher = await TeacherModel.create({
                        imageUrl: imageUrl,
                        username,
                        email,
                        phoneNo,
                        password: hash,
                        portfolioUrl
                    })



                    let token = jwt.sign({ TeacherId: createdTeacher._id, email, password: hash }, process.env.TeacherSecureKey)

                    res.cookie("TeacherToken", token).json({ status: "success", msg: "The teacher is successfully registered", createdTeacher })


                })
            })




        } else {


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {


                    let createdTeacher = await TeacherModel.create({
                        username,
                        email,
                        phoneNo,
                        password: hash,
                        portfolioUrl
                    })



                    let token = jwt.sign({ TeacherId: createdTeacher._id, email, password: hash }, process.env.TeacherSecureKey)

                    res.cookie("TeacherToken", token).json({ status: "success", msg: "The teacher is successfully registered", createdTeacher })


                })
            })




        }















    } catch (error) {
        console.log(error)
        res.json({ status: "error", msg: "Error from try and catch of Teacher registration", error })
    }

}














export const Login =async (req, res) => {

    try {

        let { phoneNo, password } = req.body;
        // console.log(phoneNo, password)

        let existingTeacher = await TeacherModel.findOne({ phoneNo: phoneNo })
        if (!existingTeacher) {
            return res.send({ status: "exist", msg: "The Teacher is Not Present on this number" })
        }


        let existingTeacherPassword = existingTeacher.password;

        let result = await bcrypt.compare(password, existingTeacherPassword)

        // console.log(result) 


        if (result) {

            let token = jwt.sign({ TeacherId: existingTeacher._id, email: existingTeacher.email, password: existingTeacher.password }, process.env.TeacherSecureKey)
            return res.cookie("TeacherToken", token).json({ status: "success", msg: "Login successfully" })
        }



        res.json({ status: "failed", msg: "The phoneNo or password is not correct" })




    } catch (err) {
        console.log(err)
        res.json({ status: "error", msg: "Error from try and catch of login route of TeacherRoutes", err })
    }


}
















export const Logout = async (req, res) => {
    let jwtToken = req.cookies.TeacherToken;
    let blockedJwt = await blockedJwtModel.create({
        token: jwtToken
    })

    res.clearCookie("TeacherToken").json({ status: "success", msg: "The Teacher is successfuly Logout" })
}









// ???????
// why i take this data of all teachers ?????????????????????
export const getTeacherData=  async (req, res) => {
    try {

        let allTeacherData = await TeacherModel.find()

        if (allTeacherData) {
            if (allTeacherData.length > 0) {
                return res.send({ status: "success", msg: "All teacher are getted successfully", allTeacherData })
            } else {
                return res.send({ status: "failed", msg: "Teacher object is fetched but empty" })
            }
        } else {
            return res.send({ status: "failed", msg: "TeachersData is not fetched successfully" })
        }


    } catch (err) {
        res.send({ status: "error", msg: "Error from getAllTeachersData", err })
    }
}















export const createCourse =  async (req, res) => {

    try {
        let { courseName, courseDiscription, courseCatagory } = req.body

        console.log(req.file?.path)
        let teacherData = req.Teacher

        let createdCourse;

        if (!req.file) {
            createdCourse = await CourseModel.create({
                name: courseName,
                disc: courseDiscription,
                catagory: courseCatagory,
                creater: teacherData._id,
                createrImgUrl: teacherData.imageUrl
            })
        } else {
            let tumbnailImage = req.file?.path;
            console.log(tumbnailImage)
            createdCourse = await CourseModel.create({
                tumbnailUrl: tumbnailImage,
                name: courseName,
                disc: courseDiscription,
                catagory: courseCatagory,
                creater: teacherData._id,
                createrImgUrl: teacherData.imageUrl
            })
        }



        await req.Teacher.courses.push(createdCourse._id)
        await req.Teacher.save()




        let teacherRelatedCourses = await CourseModel.find({ creater: req.Teacher._id })
        if (!teacherRelatedCourses) {
            return res.json({ status: "failed", msg: "No course are present yet" })
        }



        res.send({ status: "success", msg: "The course is succesffully created", createdCourse, teacherRelatedCourses })

    } catch (err) {
        console.log(err)
        res.send({ status: "error", msg: "From try and catch of createCourse route in teacher routes", err })
    }

}

























export const createLecture= async (req, res) => {

    let { lectureName, lectureDiscription, courseId } = req.body
    let lectureVidioPath = req.file?.path;

    let createdLecture = await LectureModel.create({
        videoUrl: lectureVidioPath,
        name: lectureName,
        discription: lectureDiscription
    })




    if (!courseId) {
        return res.send({ status: "failed", msg: "Course id is required" })
    }



    let existingCourse = await CourseModel.findOne({ _id: courseId })
    if (!existingCourse) {
        return res.send({ status: "failed", msg: "Course on this  id is not found" })
    }


    existingCourse.lectures.push(createdLecture._id)
    await existingCourse.save()


    await existingCourse.populate("lectures")



    res.send({ status: "ok", createdLecture, currentClickedCourseWithNewLec: existingCourse })
}


























export const getTeacherRelatedCourses= async (req, res) => {



    let jwtToken = req.cookies.TeacherToken;
    if (!jwtToken) {
        return res.send({ status: "failed", msg: "jst is not found. please Login again" })
    }

    let decodedToken = jwt.verify(jwtToken, process.env.TeacherSecureKey)
    if (!decodedToken) {
        return res.send({ status: "failed", msg: "The jwt is incorrect" })
    }


    let TeacherId = decodedToken.TeacherId;

    let teacherRelatedCourses = await CourseModel.find({ creater: TeacherId }).populate("lectures")

    if (!teacherRelatedCourses || teacherRelatedCourses.length == 0) {
        return res.send({ status: "empty", msg: "No course are found for this teacher" })
    }


    res.send({ status: "success", msg: "The course related with this teacher is get successfully", teacherRelatedCourses })



}


























export const getAllCourses= async (req, res) => {
    let allCourses = await CourseModel.find().populate("lectures")
    if (!allCourses || allCourses.length == 0) {
        return res.send({ status: "failed", msg: "No courses are present yet" })
    }

    res.send({ status: "success", msg: "courses send successfully", allCourses })
}



















export const quizQuestionCreation= async (req, res) => {
    try {

        let { question, optionArray, correctOptionIndex, currentClickedCourseId } = req.body;

        if (!question && !optionArray && !correctOptionIndex && question == "" && optionArray == "" && optionArray.length == 0 && correctOptionIndex == "") {
            return res.json({ status: "failed", msg: "All field are required" })
        }



        let createdQuizQuestion = await quizQuestion.create({
            question: question,
            optionArray: optionArray,
            correctOptionIndex: correctOptionIndex
        })



        let existingCourse = await CourseModel.findOne({ _id: currentClickedCourseId })
        if (!existingCourse) {
            return res.json({ status: "failed", msg: "The question is created but not fitted in course" })
        }


        await existingCourse.quizTest.push(createdQuizQuestion._id)
        await existingCourse.save()






        await existingCourse.populate({
            path: "quizTest",
            select: "-correctOptionIndex"
        });






        res.json({ status: "success", createdQuizQuestion, quizQuestionsArray: existingCourse.quizTest })






    } catch (error) {
        console.log(error)
        return res.json({ status: "error", msg: "Error from the try and catch of quizQuestionCreation " })
    }
}























export const getCourseQuizQuestions= async (req, res) => {
    try {

        let { currentClickedCourseId } = req.body
        // console.log(currentClickedCourseId)

        let existingCourse = await CourseModel.findOne({ _id: currentClickedCourseId })
        // console.log("after existing course")
        if (!existingCourse) {
            return res.json({
                status: "failed",
                msg: "The course on this id is not found"
            })
        }


        await existingCourse.populate(
            {
                path: "quizTest",
                select: "-correctOptionIndex"
            }
        )
        // console.log(existingCourse)


        res.json({ status: "success", quizQuestionArray: existingCourse.quizTest })




    } catch (error) {
        return res.json({ status: "error", msg: "From trycatch of getCourseQuizQuestion backend", error })
    }
}

















export const quizMarking=async (req, res) => {


    try {


        let { submitedQuizArray, currentClickCourseId } = req.body;
        let right = 0;
        let wrong = 0;
        let empty = 0;
        let percentage = 0;


        if (!submitedQuizArray && !currentClickCourseId && submitedQuizArray.length == 0 && currentClickCourseId == "") {
            return res.json({ status: "failed", msg: "the array which contain the submit quiz is not sending well to the backend" })
        }


        // finding course on basis of id and then populate its quiz in order to check to take the correctOptionIndex to compare it with selected option index number
        let existingCourse = await CourseModel.findOne({ _id: currentClickCourseId }).populate("creater")
        if (!existingCourse) {
            return res.json({ status: "failed", msg: "The course is not found on curent clicked course id" })
        }
        await existingCourse.populate("quizTest");
        let existingCourseQuizArray = existingCourse.quizTest






        // when someone try to send its own request with postman or other to produce error in our server and his mcq number is greater than ours
        if (existingCourseQuizArray.length < submitedQuizArray.length) {
            return res.json({ status: "failed", msg: "The submitted quiz question number and real quiz number is not matched" })
        }



        // we apply the loop on the basis of submitedQuizArray not with existingCourseQuizArray because sometime when the teacher include the question on the time on which the student submit the question may product irregularity or error
        // with this approach, if teacher include the question in it then it comes in the end and have no such impact on this check
        for (let i = 0; i < submitedQuizArray.length; i++) {

            // also give the condition of 0 because it consider the zero value as falsy value but in case of ours, the zero is the index number
            if (submitedQuizArray[i].selectedOption != 0 && !submitedQuizArray[i].selectedOption && submitedQuizArray[i].selectedOption == "") {
                console.log("entered in 1")
                empty++;
            }
            else if (submitedQuizArray[i].selectedOption == existingCourseQuizArray[i].correctOptionIndex) {
                console.log("entered in 2")
                right++;
            }
            else {
                console.log("entered in 3")
                wrong++;
            }
        }






        // to determine the percentage of his marks
        if (right) {
            percentage = (right / submitedQuizArray.length) * 100
        }














        if (percentage >= 75) {

            let existingCertificate = await CourseCertificateModel.findOne({ userId: existingCourse.creater, courseId: existingCourse._id })

            let createdCertificate = await CourseCertificateModel.create({
                studentId: req.user._id,
                studentName: req.user.username,
                createrName: existingCourse.creater.username,
                courseId: existingCourse._id,
                courseName: existingCourse.name,
                obtainedMarks: right,
                totalMarks: submitedQuizArray.length,
                percentage: percentage
            })

            let createdCertificateCheck = await CourseCertificateModel.findOne({ _id: createdCertificate._id })


            // this will take care that if current user have certificate of current course then it will deleted after creation of new certificate
            if (createdCertificateCheck) {
                if (existingCertificate) {
                    await CourseCertificateModel.findOneAndDelete({ _id: existingCertificate._id })
                }
            }


            return res.json({ status: "success", msg: "Congratulation! You passed the quiz test for this course and certificate is allowed to you. Check it out in cerficate section", createdCertificate })

        }













        res.send({ status: "success", msg: "working", right, wrong, empty, percentage })





    } catch (error) {
        console.log(error)
        return res.json({ status: "error", msg: "error from trycatch of quizMarking backned", error })
    }


}










