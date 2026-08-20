import express from 'express';
import 'dotenv/config';
import { authToken } from './middlewares/adminAuth.js';
import {mongoo} from './config/database.js';
import User from './models/user.js';
import login from './models/login.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); 

app.post('/signUp', async (req,res,next) =>{
   console.log(req.body)

   const checkEmail = await User.findOne({ emailId: req?.body?.emailId });

   if(true){
        res.status(400).send({message: 'This email has already been taken, please use another'})
   }else{
       const user = new User(req?.body)

       try{
let wait = await  user.save()
res.send('succesfully saved')
}catch(e){
  console.log(e);
  res.status(400).send({message: e})
}
   }

})



app.get('/getUser', async (req,res) =>{
     
    const getUser = await User.find({});

    console.log('get',getUser)
   
   res.send({user: getUser} )
})

app.delete('/deleteUser', async (req,res) =>{

  try{
    let id = req.body.id;
 const delteUser = await User.findByIdAndDelete(id)
      
    console.log('get',delteUser)
    if(delteUser){

      res.send({user: delteUser,message: 'user has been deleted succesfully'} )
    }else{
  res.send({message: 'user has been already deleted or not created'} )
    }
   
  }catch(e){
     res.status(401).send('some issue happens')
  }
     
   
})


app.patch('/updateUser', async (req,res) =>{

  try{
    let {id,firstName} = req.body;
    console.log(req.body,'req.body')
 const updateUser = await User.findByIdAndUpdate(id, { firstName: firstName })
      
    console.log('get',updateUser)
    if(updateUser){

      res.send({user: updateUser,message: 'user has been updated succesfully'} )
    }else{
  res.send({message: 'user not found'} )
    }
   
  }catch(e){
     res.status(401).send('some issue happens')
  }
     
   
})

app.put('/updateWholeDetail', async (req,res) =>{
     const {id, ...data} = req?.body ; 
     console.log(req?.body,'res?.body')
   try{
    let update = await User.findByIdAndUpdate( id,
      data);

    if(update){
         res.send({user: update} )
    }else{
 res.status(401).send('some issue happens')
    }


   }catch(e){
  console.log(e)

   }
})



mongoo() .then(() =>{ 
  console.log('Connected!')
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(() =>{
  console.log('discoonected!')
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