

import app from './app.js'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()





 


let server = http.createServer(app)  
  










 

const port = process.env.PORT || 5000 || 3500;
server.listen(port, () => {
    console.log("The app is running on port " + port)
})