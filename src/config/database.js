import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv()

export const mongoo = async () =>{
     await mongoose.connect(process.env.MONGODB_URI,{dbname:'devtinder'})
 
}

