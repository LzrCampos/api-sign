const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        password: {
            type: String,
            required: true,
        },
        phone: [
            {
                numero: {
                    type: Number,
                    required: true,
                },
                ddd: {
                    type: Number,
                    required: true,
                },
                _id: false,
            },
        ],
        token: {
            type: String,
            required: false,
        },
        lastLogin: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
