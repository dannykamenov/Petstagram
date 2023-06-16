const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: true,
        minlength: [2, 'Name must be at least 2 characters long!'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: [1, 'Age must be at least 1!'],
        max: [100, 'Age must be less than 100!'],
    },
    desc: {
        type: String,
        required: [true, 'Description is required!'],
        minlength: [5, 'Description must be at least 5 characters long!'],
        maxlength: [50, 'Description must be less than 50 characters long!'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minlength: [5, 'Location must be at least 5 characters long!'],
        maxlength: [50, 'Location must be less than 50 characters long!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: {
            validator: (value) => {
                return /^https?:\/\//.test(value);
            }
        },
    },
    commentList: [
        {
            userId: mongoose.Types.ObjectId,
            comment: String,
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;