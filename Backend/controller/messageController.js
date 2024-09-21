import {Message} from '../models/messageSchema.js'
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'

export const sendMessage= catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;

    if(!firstName ||!lastName||!email||!phone||!message){
        return next(new ErrorHandler('Please fill all details!',400))
    }
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"Message Send successfully!"
    });
})

export const getAllMessages=catchAsyncErrors(async(req,res,next)=>{
    const messages=await Message.find()
    return res.status(200).json({
        success: true,
        messages
    })
})