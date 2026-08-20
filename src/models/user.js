import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    }, // String is shorthand for {type: String}
    lastName: String,
    emailId: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    gender: String,
    age: {
        type: Number,
        require: true
    },
    photoUrl:{
        type: String,
        default: 'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp'
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;