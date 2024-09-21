import mongoose from 'mongoose'
import validator from 'validator'

const messageSchema=new mongoose.Schema({

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
    message:{
        type: String,
        required: false,
        minLength:[10,"Message contain atleast 10 Character!"]
    }
}
)

export const Message=mongoose.model('Message',messageSchema)