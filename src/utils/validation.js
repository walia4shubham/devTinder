import validator from 'validator';
import bcrypt from "bcrypt";
export const validate = (req) => {
    const { firstName, lastName, emailId, password } = req.body
    // console.log(bcrypt.hash(password, 5))
         console.log( req.body,' req.body req.body')
    if (!firstName || !lastName) {
        throw new Error('name cannot be empty')

    } else if (!validator.isEmail(emailId)) {
        console.log('hereee')
        throw new Error('enter valid email')
    }

}

export const loginValidate = (req) => {
    const {  emailId, password } = req.body
    // console.log(bcrypt.hash(password, 5))
        //  console.log( req.body,' req.body req.body')
    if (!password) {
        throw new Error('password cannot be empty')

    } else if (!validator.isEmail(emailId) || !emailId) {
        console.log('hereee')
        throw new Error('Valid email is required')
    }

}