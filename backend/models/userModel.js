const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Veuillez entrer votre nom"],
        maxlength: [30, "Votre nom ne peut pas dépasser 0 caractère"]
    },

    lastName: {
        type: String,
        required: [true, "Veuillez entrer votre prénom"],
        maxlength: [30, "Votre prénom ne peut pas dépasser 0 caractère"]
    },

    email: {
        type: String,
        required: [true, "Veuillez entrer votre email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Veuillez mettre une adresse email valide"]
    },

    password: {
        type: String,
        required: [true, "Veuillez entrer le mot de passe"],
        minlength: [6, "Votre mot de passe doit comporter plus de 6 caractères"],
        select: false
    },

    // passwordConfirm: {
    //     type: String,
    //     required: [true, "Veuillez entrer la confirmation de votre mot de passe"],
    //     validate: {
    //         //Only works on save or create (not update)
    //         validator: function(el){
    //             return el === this.password
    //         },
    //         message: "les deux mots de passe ne sont pas les mêmes!"
    //     }
    // },

    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },

    role: {
        type: String,
        default: "user"
    },

    passwordChangedAt: Date

}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.methods.signToken = function(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp
    };

    //Password Not changed
    return false
}

const User = mongoose.model('User', userSchema);

module.exports = User;