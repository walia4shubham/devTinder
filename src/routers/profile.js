import express from 'express';
import 'dotenv/config';
import User from '../models/user.js';
import { validate } from '../utils/validation.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { tokenData } from '../middlewares/adminAuth.js';
const routerForProfile = express.Router();

routerForProfile.get('/profileView', tokenData, async (req, res, next) => {
    try {
        const { userData } = req
        console.log(userData);

        res.send({ status: userData })

    } catch (e) {
        res.status(400).json({ message: `${e.message}` })
    }

})


routerForProfile.patch('/profile/edit', tokenData, async (req, res, next) => {
    try {
        const { userData } = req
        const updatedData = req.body
        const allowedFields = ['firstName', 'lastName', 'gender', 'age', 'photoUrl'];

        Object.keys(updatedData).forEach((field) => {
            if (allowedFields.includes(field)) {
                userData[field] = updatedData[field];
            }
        });
        await userData.save();
        res.send({ status: 'Data has been saved' })
    } catch (e) {
        res.status(400).json({ message: `${e.message}` })
    }
})









export default routerForProfile;