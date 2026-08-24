import express from 'express';
import 'dotenv/config';
import { tokenData } from '../middlewares/adminAuth.js';
import connectionReq from '../models/connectionrequest.js';
import User from '../models/user.js';
import ConnectionRequest from '../models/connectionrequest.js';
const routerForConnection = express.Router();

routerForConnection.post('/request/send/:type/:userId', tokenData, async (req, res, next) => {
    try {
        const { userData , params} = req
        console.log(userData, params);
        const { type, userId } = params;
        const {_id} = userData;
        if (_id.toString() === userId) {
            return res.status(400).json({ message: `You cannot send a request to yourself` });
        }
        let checkuserExistsOrnot = await User.findOne({_id: userId});
         
        if(!checkuserExistsOrnot){
             return res.status(400).json({
                message: `Not a valid user`
            })
        }

        let checkAlreadyInterestedData = await connectionReq.findOne({  
            $or :[
                {  fromUserId: _id,
            toUserId: userId},
                { fromUserId: userId,
            toUserId: _id},
            {fromUserId: _id, toUserId: _id },
             {fromUserId: userId, toUserId: userId }

            ]
          })

            console.log(checkAlreadyInterestedData,'checkAlreadyInterestedDatacheckAlreadyInterestedDatacheckAlreadyInterestedData');


      if(checkAlreadyInterestedData){
         return res.status(400).json({
                message: `you have already send the request`
            })
      }

        const allowedStatus = ['interested','ignored'];
        let checkAllowedSatus = allowedStatus.includes(type);

        if(!checkAllowedSatus){
           return res.status(400).json({
                message: `you cannot send this ${type} status`
            })
        }

        const sendData = {
            fromUserId: _id,
            toUserId: userId,
            status: type

        }
        console.log(sendData,'sendDatasendData')
       const connectionRequestData = await  new connectionReq(sendData);
              let requestData =   await connectionRequestData.save()
        res.send({ status: requestData })

    } catch (e) {
        res.status(400).json({ message: `${e.message}` })
    }

})


routerForConnection.patch('/request/review/:status/:requestid', tokenData, async (req, res, next) => {
    try {
        const { userData , params} = req
        const { status, requestid } = params;
        let allowedTypes = ['accepted', 'rejected'];
         const {_id} = userData;
        let isAllowedType = allowedTypes.includes(status);
        if(!isAllowedType){
          return  res.status(400).json({'message': 'Status is totaly wrong'});
        }
        let checkuserExistsOrnot = await ConnectionRequest.findById(requestid);
        if(!checkuserExistsOrnot){
             return res.status(400).json({
                message: `Not a valid id`
            })
        }else{
         const {toUserId} = checkuserExistsOrnot;
         console.log(toUserId,'fromUserId',_id,toUserId == _id )
         if(toUserId.toString() != _id.toString()){
            return res.status(400).json({
                message: `You dont have permission to change the status`
            })

         }else{
               checkuserExistsOrnot.status = status;
               console.log(checkuserExistsOrnot,'checkuserExistsOrnotcheckuserExistsOrnotcheckuserExistsOrnot')
            let updateTheConnection = await ConnectionRequest.findByIdAndUpdate(  requestid, { status },
    { new: true } )
            console.log(updateTheConnection,'updateTheConnectionupdateTheConnection')

            return res.status(200).json({ message: updateTheConnection })
         }
        }



    } catch (e) {
        res.status(400).json({ message: `${e.message}` })
    }

})





export default routerForConnection;