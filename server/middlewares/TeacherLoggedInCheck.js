import blockedJwtModel from "../models/blockedJwt.js";
import jwt, { decode } from 'jsonwebtoken'
import TeacherModel from "../models/TeacherModel.js";












export default async function TeacherLoggedInCheck(req, res,next){
    let jwtToken = req.cookies.TeacherToken;
    if(!jwtToken){
        return res.json({status:"failed", msg:"Jwt toke is not found"})
    }else{

        let blockedJwtExists=await blockedJwtModel.findOne({token:jwtToken})
        if(blockedJwtExists){
            return res.json({status:"failed", msg:"Your jwt is blocked. Sign in again"})
        }






        let decodedJwt;
        try{
            decodedJwt= jwt.verify(jwtToken, process.env.TeacherSecureKey)
        }catch(err){
            return res.json({status:"error", msg:"jwt is not correct and the error is from jwt"})
        }

        if(!decodedJwt){
            return res.send({status:"failed", msg:"The jwt is not corectly decoded"})
        }





        let TeacherId= decodedJwt.TeacherId;
        if(!TeacherId){
            return res.send({status:"failed", msg:"The jwt is correctly decoded but the Teacher id is not found in it"})
        }







        let existingTeacher= await TeacherModel.findOne({_id:TeacherId})
        if(!existingTeacher){
            return res.send({status:"failed", msg:"The Teacher on jwt Teacher id is not found. Please try agian to login"})
        }




        
        req.Teacher=existingTeacher;

        next()

        
    }
}