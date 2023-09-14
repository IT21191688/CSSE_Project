const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({

    googleid: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
    },
    dob: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true
    }




}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema);

module.exports = User;