const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000 ;
    next();
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

userSchema.methods.setPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 20 * 60 *1000;

    return resetToken
}

const User = mongoose.model('User', userSchema);

module.exports = User;