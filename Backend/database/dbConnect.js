import mongoose from 'mongoose'
export const dbConnect=()=>{
  mongoose.connect(process.env.MONGO_URI,{
    dbName:"HOSPITAL_MANAGEMENT_SYSTEM"
  }).then(()=>{
    console.log("Connected to database!");
  }).catch((err)=>{
      console.log(`some error occured during coonnection to the database ${err}`)
  })
}