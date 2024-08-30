import mongoose from "mongoose";

const userModel = mongoose.Schema({
    name : {type: 'string', required: true},
    email : {type: 'string', required: true},
    password : {type: 'string', required: true},
    picture : {type: 'string', default: '"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg', }
},
{
    timestamps : true
})

const User = mongoose.model('User',userModel)
export default User;