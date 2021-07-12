const mongoose = require('mongoose');

const resetPasswordSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken: {
        type:String,
        unique:true
    },
    isValid: {
        type:Boolean,
        default: true
    }
},{timestamps:true});

module.exports = mongoose.model('ResetPassword',resetPasswordSchema);