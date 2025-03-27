import express from 'express'
import AdminModel from '../models/AdminModel.js';
const router = express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import blockedJwt from '../models/blockedJwt.js';
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 } from 'cloudinary';
const cloudinary = v2;

















cloudinary.config({
    cloud_name: 'dop329ono', // Replace with your Cloudinary cloud name
    api_key: '856196912959875',       // Replace with your Cloudinary API key
    api_secret: '_SLgclLAS2L5Qty0DqAPvzmlmvw', // Replace with your Cloudinary API secret
});




const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'LMS/admin',
        allowed_formats: ['jpeg', 'jpg', 'png']
    }
})


const upload = multer({ storage })

























router.post("/Registration", upload.single("adminImage"), async (req, res) => {
    let { username, email, phoneNo, password } = req.body;


    let existingAdmin = await AdminModel.find();
    if (existingAdmin?.length > 0) {
        return res.send({ status: "failed", msg: "Admin is already registered" })
    }






    
    // if (req.file) {
        let imageUrl = req.file?.path

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                let createdAdmin = await AdminModel.create({
                    imageUrl:imageUrl,
                    username,
                    email,
                    phoneNo,
                    password: hash
                })

                let token = await jwt.sign({ AdminId: createdAdmin._id }, process.env.AdminSecretKey)
                res.cookie("AdminToken", token).json({ status: "success", msg: "The Admin is created successfully", createdAdmin })


            })
        })

    // }








    // bcrypt.genSalt(10, async (err, salt) => {
    //     bcrypt.hash(password, salt, async (err, hash) => {

    //         let createdAdmin = await AdminModel.create({
    //             username,
    //             email,
    //             phoneNo,
    //             password: hash
    //         })

    //         let token = await jwt.sign({ AdminId: createdAdmin._id }, process.env.AdminSecretKey)
    //         res.cookie("AdminToken", token).json({ status: "success", msg: "The Admin is created successfully", createdAdmin })


    //     })
    // })








})





















// peding work
// express validator validation




router.post("/Login", async (req, res) => {
    let { phoneNo, password } = req.body;

    // console.log(phoneNo, password)

    if (phoneNo && password && phoneNo == "" && password == "") {
        return res.json({ status: "failed", msg: "All fields are required" })
    }

    // console.log("hello passed")

    let existingAdmin = await AdminModel.findOne({ phoneNo: phoneNo })
    // console.log(existingAdmin)
    if (!existingAdmin) {
        return res.json({ status: "failed", msg: "No user is found on this phone number" })
    }

    let result = await bcrypt.compare(password, existingAdmin.password)
    console.log(result)
    if (!result) {
        return res.json({ status: "failed", msg: "Password is not correct" })
    }



    let token = await jwt.sign({ AdminId: existingAdmin._id }, process.env.AdminSecretKey)
    res.cookie("AdminToken", token).json({ status: "success", msg: "user is successfully login", existingAdmin })

})
























router.get("/Logout", async (req, res) => {
    let jwtToken = req.cookies.AdminToken

    if (!jwtToken) {
        return res.json({ status: "failed", msg: "Admin is not login because it jwt is not found" })
    }

    await blockedJwt.create({
        token: jwtToken
    })

    res.clearCookie("AdminToken").json({ status: "success", msg: "The admin is logout" })
})























export default router;

