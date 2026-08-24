import express from 'express';
import 'dotenv/config';
import { tokenData } from '../middlewares/adminAuth.js';
import connectionReq from '../models/connectionrequest.js';
import User from '../models/user.js';
import ConnectionRequest from '../models/connectionrequest.js';
const userRouterForConnection = express.Router();


userRouterForConnection.get('/user/requests', tokenData, async (req, res, next) => {
    try {
        const { userData , params} = req;
        const {_id: loggedInUserData} = userData;
   
        let allData = await connectionReq.find({  
           toUserId:  loggedInUserData,
        //    status:'Pending'
          }).populate('fromUserId')

            console.log(allData,'checkAlreadyInterestedDatacheckAlreadyInterestedDatacheckAlreadyInterestedData');
      res.status(200).json({ message: 'Data recieved succesfully', data: allData })

    } catch (e) {
        res.status(400).json({ message: `${e.message}` })
    }

})

userRouterForConnection.get('/user/cooneections', tokenData, async (req, res, next) => {
    try {
        const { userData , params} = req;
        const {_id: loggedInUserData} = userData;
   
        let allData = await connectionReq.find({  
            $or:[
            { toUserId:  loggedInUserData},{fromUserId:  loggedInUserData}
            ],
          
           status:'Accepted'
          }).populate('fromUserId').populate('toUserId')

            console.log(allData,'checkAlreadyInterestedDatacheckAlreadyInterestedDatacheckAlreadyInterestedData');
      res.status(200).json({ message: 'Data recieved succesfully', data: allData })

    } catch (e) {
        res.status(400).json({ message: `${e.message}` })
    }

})


userRouterForConnection.get('/feed/:page/:limit', tokenData,async (req,res,next) =>{
  try{
    const { userData , params} = req;
    console.log(params) 
    const {page, limit} = params;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10
    const skip = (pageNum-1)* limitNum
     const {_id: loggedInUserData} = userData;
      const allDataReqested = await connectionReq.find({
        $or: [{'fromUserId': loggedInUserData},{'toUserId': loggedInUserData}]
      }).select('fromUserId toUserId')
      const excludeIds = new Set();
excludeIds.add(loggedInUserData.toString());
allDataReqested.forEach((data) =>{
    excludeIds.add(data?.fromUserId.toString());
    excludeIds.add(data?.toUserId.toString());
})
console.log(excludeIds,'excludeIdsexcludeIdsexcludeIds',[...excludeIds])

    const allFeedData = await User.find({
        $and: [
            {_id :{ $nin: [...excludeIds] }},
            {_id: {$ne: loggedInUserData}}
        ]
        
    
    }).select('-emailId -password').skip(skip).limit(limitNum)

    res.json({'message': [...allFeedData]})


  }catch(e){
    res.status(400).json({message: e.message});
  }
})
export default userRouterForConnection