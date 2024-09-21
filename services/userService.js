const userService = require('../services/userService');

// Controller to handle user list request
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Controller to handle user creation
exports.createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};
