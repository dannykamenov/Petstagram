const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long!'],
        validate: {
            validator: (value) => {
                return /^[A-Za-z0-9]+$/.test(value);
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        validate: {
            validator: (value) => {
                return /^[A-Za-z0-9]+@[a-z]+\.[a-z]+$/.test(value);
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password must be at least 8 characters long!'],
    },

});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});


const User = mongoose.model('User', userSchema);

module.exports = User;