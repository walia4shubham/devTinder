import mongoose from 'mongoose';
const { Schema } = mongoose;

const loginSchema = new Schema({
    emailId: String,
    password: String,
});


const login = mongoose.model('Login', loginSchema);

export default login;
