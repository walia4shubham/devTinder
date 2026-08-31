import express from 'express';
import 'dotenv/config';
import { authToken, jwtToken } from './middlewares/adminAuth.js';
import {mongoo} from './config/database.js';
import { loginValidate, validate } from './utils/validation.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import jwt from 'jsonwebtoken'
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser()); // must be added BEFORE your routes
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
import bcrypt from "bcrypt";
import router from './routers/auth.js';
import routerForProfile from './routers/profile.js';
import routerForConnection from './routers/request.js';
import userRouterForConnection from './routers/userRouters.js';
process.on('uncaughtException', (err) => {
  console.error('🔴 Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 Unhandled Rejection:', reason)
})
app.use('/',router);
app.use('/',routerForProfile);
app.use('/',routerForConnection);
app.use('/',userRouterForConnection)

mongoo().then(() =>{ 
  console.log('Connected!')
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((e) =>{
  console.log('discoonected!',e)
})




























// app.use('/admin', (req,res,next) =>{
//   console.log(req.query,'ram')
//     authToken(req,res,next)
// })

// app.get('/admin/fetchData',(req,res) =>{
//  res.status(200).send('fetch data is here')
  
// })

// app.post('/admin/postData',(req,res) =>{
//  res.status(200).send('post data is here')
// })