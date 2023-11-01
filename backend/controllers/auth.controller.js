const authService = require('../services/auth.service');
const config = require('../config');

const register = async (req, res) => {
    const { firstname, lastname, email, age, dob, password, role } = req.body;
    const result = await authService.registerUser({ firstname, lastname, email, age, dob, password, role });

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.status(201).json({ message: result.message });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.json({ token: result.token, role: result.role });
};

const getDetails = async (req, res) => {
    const userId = req.body.userId;
    const result = await authService.getDetails(userId);

    if (result.error) {
        return res.status(404).json({ message: result.error });
    }

    res.json(result.user);
};

const updateUser = async (req, res) => {
    const { userId, firstname, lastname, age, dob } = req.body;
    const result = await authService.updateUser(userId, { firstname, lastname, age, dob });

    if (result.error) {
        return res.status(500).json({ message: result.error, success: false });
    }

    res.status(200).json({ message: result.message, success: true });
};

const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    const result = await authService.deleteUser(userId);

    if (result.error) {
        return res.status(404).json({ message: result.error, success: false });
    }

    res.status(200).json({ message: result.message, success: true });
};

const checkOldPassword = async (req, res) => {
    const { email, password, oldPassword } = req.body;
    const result = await authService.checkOldPassword({ email, password, oldPassword });

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.json({ pass: result.success });
};

const sendVerificationKey = async (req, res) => {
    const { email, key } = req.body;
    const result = await authService.sendVerificationKey({ email, key });

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.json({ Digits: result.Digits });
};

const changePassword = async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.changePassword({ email, password });

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.json({ changed: result.success });
};

const initGoogleAuthRoutes = (app, passport) => {
    authService.initializeGoogleAuthRoutes(app, passport);
}


const getUsers = async (req, res) => {
    const result = await authService.getUsers();

    if (result.error) {
        return res.status(500).json({ error: result.error });
    }

    res.json(result.users);
};

module.exports = {
    register,
    login,
    getDetails,
    updateUser,
    deleteUser,
    checkOldPassword,
    sendVerificationKey,
    changePassword,
    initGoogleAuthRoutes,
    getUsers,
};
