import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({

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
    password:{
        type:String,
        required:true,
        minLength:[8,"Password atleast contain 8 characters!"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:['Admin','Patient','Doctor'],
    },
    docAvatar: {
        public_id: {
          type: String,
          required: function() {
            return this.role === 'Doctor';
          }
        },
        url: {
          type: String,
          required: function() {
            return this.role === 'Doctor';
          }
        }
      },
      doctorDepartment: {
        type: String,
        required: function() {
          return this.role === 'Doctor';
        }
      }

}
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
});

userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    })
}
const User=mongoose.model('User',userSchema)
export default User 