import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
export let authToken = (req, res, next) => {

  let token = req?.query?.admin ? true : false;
  if (!token) {
    res.status(401).send('you are cooked')
  } else {
    next()
  }
}

export let jwtToken = async (req, res, next) => {
  try {
    let { token } = req.cookies
    console.log(token, 'tokentokentoken')
    if (!token) {
      console.log('if')
      throw new Error('not token found please login again')
    } else {
      console.log('else')
      const verifyToken = await jwt.verify(token, process.env.PRIVATE_KEY || 'test$%')
      const { _id } = verifyToken
      const checkUser = await User.findById(_id);
      console.log('heree')
      if (!checkUser) {
        throw new Error('not  user found')
      } else {
        req.users = checkUser

        next()
      }
    }

  } catch (e) {
    res.status(400).send({ 'status': `some issue happens: ${e}` })
  }

}



export let tokenData = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
     return res.status(401).json({ message: 'User has not valid permission' })
    } else {
      const checkToken = await jwt.verify(token, process.env.PRIVATE_KEYS);
      const { user_id } = checkToken || {};
      if (user_id) {
        const dataOnDb = await User.findById( user_id );
        console.log(dataOnDb, 'dataOnDb');
        if (!dataOnDb) {
        return  res.status(400).json({ message: 'User has not valid permission' })
        } else {
          req.userData = dataOnDb
          next();
        }
      } else {
      return  res.status(400).json({ message: 'User has not valid permission' })
      }
    }
  } catch (e) {

    res.status(400).json({ 'message': `${e.message}` })
  }

}