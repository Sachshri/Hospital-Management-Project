import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import User from '../models/userSchema.js'
import generateToken from '../utils/jwtToken.js'
import cloudinary from 'cloudinary'
export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
   const {  firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            aadhar_number,
            DOB,
        }=req.body

        if( !firstName||
            ! lastName||
            ! email||
            ! phone||
            ! password||
            ! gender||
            ! aadhar_number||
            ! DOB
            ) {
                return next(new ErrorHandler('Please fill all the details!',400));
            } 
            let user=await User.findOne({email,phone});
            if(user){
                return next(new ErrorHandler('User Already Exists!'))
            }
            user=await User.create({
                firstName,
                lastName,
                email,
                phone,
                password,
                gender,
                aadhar_number,
                DOB,
                role:"Patient"
            })
            generateToken(user,"User Registered Successfully!",200,res,)
            // res.status(200).json({
                //     success: true,
                //     message: "User Registered!"
                // })
            });
            
            export const login=catchAsyncErrors(async(req,res,next)=>{
                const {role,email,password,confirmPassword}=req.body;
                if(!role||!email||!password||!confirmPassword){
                    return next(new ErrorHandler("Please fill all the details!"),400);
                }
                let user= await User.findOne({email}).select("+password");
                
                if(!user){
                    return next(new ErrorHandler("Invalid Password or email!"),400);
                }
                if(password!==confirmPassword){
                    return next(new ErrorHandler("Password and Confirm Password Don't Match!"))
                }
                const isPasswordMatched=await user.comparePassword(password);
                if(!isPasswordMatched){
                    return next(new ErrorHandler("Wrong Password!"),400)
                }
                
                if(role!=user.role){
                    return next(new ErrorHandler("User Role don't match!"),400)
                }
                
                generateToken(user,"User LoggedIn Successfully!",200,res,user)
                // res.status(200).json({
                //     success: true,
                //     message:"User LoggedIn Successfully!"
                // })
            });
    
export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {  firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB
    }=req.body

    if( !firstName||
        ! lastName||
        ! email||
        ! phone||
        ! password||
        ! gender||
        ! aadhar_number||
        ! DOB) {
            return next(new ErrorHandler('Please fill all details!',400));
        } 

     const isRegistered=await User.findOne({email});
     if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already exists!`))
     }   

     const admin=await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB,
        role:'Admin'
     })
     res.status(200).json({
        success: true,
        message: "New Admin Registered!"

     })
});

export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor Avatar Required!"),400);
    }
    const {docAvatar}=req.files;
    const validFormats=['image/jpeg','image/png','image/webp']
    if(!validFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not Supported"),400);
    }
    
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB,
        doctorDepartment
    }=req.body;
    
    if(
        !firstName||
        !lastName||
        !email||
        !phone||
        !password||
        !gender||
        !aadhar_number||
        !DOB||
        !doctorDepartment
    ){
        return next(new ErrorHandler("Please Provide full details!"),400);
    }
    
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`,400));
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Cloudinary Error");
    }
    const doctor=await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        aadhar_number,
        DOB,
        doctorDepartment,
        role:"Doctor",
        docAvatar:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success: true,
        message: "New Doctor Registered!",
        doctor
    })
});

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"})
    res.status(200).json({
        success: true,
        doctors
    });
});

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const users=req.user;
    res.status(200).json({
        success: true,
        users
    });
});

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message:"Admin Logged Out Successfully!"
    })
});
export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message:"Patient Logged Out Successfully!"
    })
});

