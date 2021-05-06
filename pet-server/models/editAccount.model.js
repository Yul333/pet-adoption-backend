const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const editUserSchema = new mongoose.Schema({

    firstName: {
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        
    },
    password:{
        type:String,
        required: true,
    },
    
    phoneNumber:{
        type:Number,
        required: true,
    }
})


const editUser = mongoose.model('editUser',editUserSchema);
module.exports = editUser;
