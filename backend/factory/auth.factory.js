// user.factory.js
const User = require("../models/auth.model");

class UserFactory {
    createUser({ firstname, lastname, email, age, dob, password, role }) {
        return User.create({
            firstname,
            lastname,
            email,
            age,
            dob,
            password,
            role,
        });
    }

    findUserByEmail(email) {
        return User.findOne({ email });
    }

    findUserById(userId) {
        return User.findById(userId);
    }

    updateUser(userId, userData) {
        return User.findByIdAndUpdate(userId, userData, { new: true });
    }

    deleteUser(userId) {
        return User.findByIdAndDelete(userId);
    }
}

module.exports = new UserFactory();
