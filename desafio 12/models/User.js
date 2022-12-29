import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{type:String,required:true },
    password:{type:String,required:true}
})

// unique:true
export default mongoose.model("Users", userSchema)