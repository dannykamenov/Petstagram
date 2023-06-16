const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minlength: [2, 'Username must be at least 2 characters long!'],
        validate: {
            validator: (value) => {
                return /^[A-Za-z0-9]+$/.test(value);
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minlength: [10, 'Email must be at least 10 characters long!'],
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
        minlength: [4, 'Password must be at least 4 characters long!'],
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