import express from 'express';
import 'dotenv/config';
import User from '../models/user.js';
import { validate } from '../utils/validation.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
const router = express.Router();


router.post('/signUp', async (req, res, next) => {
  try {
    const userData = req.body;
    console.log(userData, 'userData')
    await validate(req)
    const { emailId, password } = userData;
    const saveInDb = await User.find({ emailId });
    if (saveInDb && saveInDb.length) {
      res.status(401).send({ error: `${emailId} is already has the account` })
    } else {
      let encrptPass = await bcrypt.hash(password, 10);
      userData.password = encrptPass
      const saveInDb = new User(userData);
      let wait = await saveInDb.save();
      res.status(200).send('successfully saved')
    }
  } catch (e) {
    res.status(400).send({ error: `some issue please check ${e.message}` })
  }
})


router.post('/login', async (req, res, next) => {
  try {
    console.log('herere')
    const userData = req.body;
    console.log(userData, 'userData')
    const { emailId, password } = userData;
    const saveInDb = await User.findOne({ emailId });
    if (saveInDb) {
      const { password: savedPassword, firstName ,_id} = saveInDb || {};
      console.log(saveInDb, 'userFound')
      let encrptPass = await bcrypt.compare(password, savedPassword);
      if (encrptPass) {
        const encryptToken = jwt.sign({'user_id':_id}, process.env.PRIVATE_KEYS,)
        res.cookie('token',encryptToken)
        delete saveInDb.password
           res.json({data : saveInDb});
      } else {
         return res.status(401).json({ message: 'Invalid credentials' })
      }
    } else {
      console.log('not found')
      res.status(400).send({ error: `${emailId} has no account in db` })
    }
  } catch (e) {
    res.status(400).send({ error: `some issue please check ${e.message}` })
  }
})


router.post('/logout', async (req, res, next) =>{

   res.clearCookie('token')
   res.status(200).json({message: 'cookie has been reset'})

})

export default router; 