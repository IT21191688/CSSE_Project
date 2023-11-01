const User = require('../models/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config');
const googleauth = require('../middleware/auth.middleware');

//used factory design pattern
const UserFactory = require('../factory/auth.factory');



class AuthService {

    async registerUser({ firstname, lastname, email, age, dob, password, role }) {
        try {
            const existingUser = await UserFactory.findUserByEmail(email);

            if (existingUser) {
                return { error: 'User already exists' };
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UserFactory.createUser({
                firstname,
                lastname,
                email,
                age,
                dob,
                password: hashedPassword,
                role,
            });

            if (result) {
                return { success: true, message: 'User registered successfully' };
            }

            return { error: 'Something went wrong' };
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async loginUser({ email, password }) {
        try {
            const user = await UserFactory.findUserByEmail(email);

            if (!user) {
                return { error: 'Invalid email or password' };
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return { error: 'Invalid email or password' };
            }

            const token = jwt.sign({ userId: user._id }, config.secretKey);
            const role = user.role;

            return { success: true, token, role };
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async getDetails(userId) {
        try {
            const user = await UserFactory.findUserById(userId);

            if (!user) {
                return { error: 'User not found' };
            }

            const { firstname, lastname, email, age, dob, role } = user;

            return { success: true, user: { firstname, lastname, email, age, dob, role } };
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async updateUser(userId, { firstname, lastname, age, dob }) {
        try {
            const result = await UserFactory.updateUser(userId, {
                firstname,
                lastname,
                age,
                dob,
            });

            if (result) {
                return { success: true, message: 'User updated successfully' };
            }

            return { error: 'User not found' };
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async deleteUser(userId) {
        try {
            const result = await UserFactory.deleteUser(userId);

            if (result) {
                return { success: true, message: 'User deleted successfully' };
            }

            return { error: 'User not found' };
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async checkOldPassword({ email, password, oldPassword }) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return { error: 'Invalid email or password' };
            }

            const id = user._id;
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return { error: 'Invalid email or Old password' };
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await User.findByIdAndUpdate(id, { password: hashedPassword });

            if (result) {
                return { success: true };
            } else {
                return { error: 'Something went wrong' };
            }
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async sendVerificationKey({ email, key }) {
        try {
            const mailOptions = {
                from: 'medixoehealth@gmail.com',
                to: email,
                subject: 'Appointment details',
                text: `Dear User Your Verification Code Is ${key} please enter this given Box`,
            };

            const user = await User.findOne({ email });

            if (!user) {
                return { error: 'Invalid email or password' };
            } else {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                return { success: true, Digits: key };
            }
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async changePassword({ email, password }) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return { error: 'Invalid email or password' };
            }

            const id = user._id;
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await User.findByIdAndUpdate(id, { password: hashedPassword });

            if (result) {
                return { success: true };
            } else {
                return { error: 'Something went wrong' };
            }
        } catch (error) {
            console.error(error);
            return { error: 'Something went wrong' };
        }
    }

    async initializeGoogleAuthRoutes(app, passport) {
        app.get('/auth/google',
            passport.authenticate('google', { scope: ['profile', 'email'] }));

        app.get('/auth/google/callback', passport.authenticate('google', {
            failureRedirect: '/login'
        }), function (req, res) {
            const user = req.user;
            const token = jwt.sign({ userId: user._id }, config.secretKey);
            const role = user.role;

            res.send(`<script>
        window.opener.postMessage({ token: '${token}', role: '${role}' }, 'http://localhost:3000');
        window.close();
      </script>`);
        });

        app.get('/api/is-authenticated', googleauth.googleAuthenticate, (req, res) => {
            const user = req.user;
            const token = jwt.sign({ userId: user._id }, config.secretKey);
            const role = user.role;
            res.json({ token, role });
        });
    }
}

// Create a transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg',
    },
});

module.exports = new AuthService();
