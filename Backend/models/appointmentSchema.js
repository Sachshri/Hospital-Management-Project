import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema=new mongoose.Schema({

    firstName:{
        type: String,
        required:true,
        minLength:[2,"First Name atleast contain 2 characters!"]
    },
    lastName:{
        type: String,
        required:true,
        minLength:[2,"Last Name atleast contain 2 characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,'Please Provide a valid email!'],
    },
    phone:{
        type:String,
        required: true,
        minLength:[10,"Phone Number Must contain 10 digits!"],
        maxLength:[10,"Phone Number exact contain 10 digits"]
    },
    aadhar_number:{
        type: String,
        required: false,
        minLength:[12,"Aadhar Number Must contain 12 digits!"],
        maxLength:[12,"Aadhar Number exact contain 12 digits"]
    },
    gender:{
        type: String,
        required:true,
        enum:['Male','Female']
    },
    DOB:{
        type: Date,
        required:[true,"Date of Birth is mandatory"]
    },
    appointment_date:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required: true
    },
    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        }
    },

    hasVisited:{
        type: Boolean,
        default: false
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:['Pending','Accepted','Rejected'],
        default:'Pending'
    }

}
);

export const Appointment=mongoose.model("Appointment",appointmentSchema);