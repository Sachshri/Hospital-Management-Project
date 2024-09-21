import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import {Appointment} from '../models/appointmentSchema.js'
import User from '../models/userSchema.js'

export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        aadhar_number,
        gender,
        DOB,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    }=req.body;

    if(       
        !firstName||
        !lastName||
        !email||
        !phone||
        !aadhar_number||
        !gender||
        !DOB||
        !appointment_date||
        !department||
        !doctor_firstName||
        !doctor_lastName||
        !address
    ) {
            return next(new ErrorHandler("Please Provide all details!",400));
        }

        const isConflict=await User.find({
            firstName: doctor_firstName,
            lastName:doctor_lastName,
            role:"Doctor",
            doctorDepartment:department
        })
        if(isConflict.length===0){
            return next(new ErrorHandler("Doctor Not Found!",400));
        }1
        if(isConflict.length>1){
            return next(new ErrorHandler("Doctor Conflict! Please Contact through phone or emailId!",400));
        }
        const doctorId=isConflict[0]._id;
        const patientId=req.user._id;

        const appointment=await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            aadhar_number,
            gender,
            DOB,
            appointment_date,
            department,
            doctor:{
                    firstName:doctor_firstName,
                    lastName:doctor_lastName
                },
            hasVisited,
            address,
            doctorId,
            patientId
        })
        res.status(200).json({
            success: true,
            message:"Appointment Sent Successfully!",
            appointment
        })
});

export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointment=await Appointment.find();
    res.status(200).json({
        success: true,
        appointment
    })
});

export const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const { id }=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found!",404));
    }
    appointment=await Appointment.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators: true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment
    })
})

export const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
    const { id }=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found!",404));
    }
    await appointment.deleteOne()

    res.status(200).json({
        success: true,
        message:"Appointment Deleted!"
    })

})