import blockedJwtModel from "../models/blockedJwt.js";
import jwt from 'jsonwebtoken'
import StudentModel from "../models/StudentModel.js";












export default async function StudentLoggedInCheck(req, res, next) {
    let jwtToken = req.cookies.StudentToken;
    if (!jwtToken) {
        return res.json({ status: "failed", msg: "Jwt toke is not found" })
    } else {

        let blockedJwtExists = await blockedJwtModel.findOne({ token: jwtToken })

        if (blockedJwtExists) {
            return res.json({ status: "failed", msg: "Your jwt is blocked. Sign in again" })
        }

        // try{
        //     let decodedJwt= jwt.verify(jwtToken, process.env.StudentSecureKey)

        //     console.log(decodedJwt)
        //     next()
        // }catch(err){
        //     return res.json({status:"error", msg:"jwt is not correct and the error is from jwt"})
        // }


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



        req.user = existingStudent;


        next()



    }
}