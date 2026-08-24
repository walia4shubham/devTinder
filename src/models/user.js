import mongoose from 'mongoose';
import validator from 'validator';
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
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('eroor  dsds     ')
            }
        }
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

userSchema.index({firstName: 1, lastname:1})

const User = mongoose.model('User', userSchema);

export default User;