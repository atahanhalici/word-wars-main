const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    kullaniciadi: {
        type: String,
        required: [true, "Kullanıcı adı alanı boş olamaz"],
        trim: true,
        minlength: 2,
        maxlength: 30,
        unique: true,
    },
    puan:{
        type: Number,
        default:0,
        trim: true,
       
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true

    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    emailAktif: {
        type: Boolean,
        default: false
    },
    sifre: {
        type: String,
        required: true,
        trim: true,
    },
  
   
  
}, { collection: 'kullanicilar', timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;