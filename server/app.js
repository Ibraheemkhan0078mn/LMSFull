import express from 'express'
import cookieParser from 'cookie-parser'
const app = express()
import dbConnection from './db/dbConnection.js'
dbConnection()
import cors from 'cors'
import donenv from 'dotenv'
donenv.config() 
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url';
import TeacherRoutes from './routes/TeacherRoutes.js'
import StudentRoutes from './routes/StudentRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'










// // ✅ List your frontend's deployed URL (NO TRAILING SLASH)
// app.use(cors({
//     origin: "https://lms-frontend-gamma-ecru.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(compression()) 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'client/dist')))





















// app.get("/", (req, res) => {
//     res.send("The route is working properly")
// })





app.use("/api/v1/AdminRoutes", AdminRoutes)
app.use("/api/v1/TeacherRoutes", TeacherRoutes)
app.use("/api/v1/StudentRoutes", StudentRoutes)
app.use("/api/v1/ProductRoutes", ProductRoutes)

 










app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });











  app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.message)
    res.status(500).json({ status: "error", msg: "Something went wrong!" })
  })
  



export default app;

















