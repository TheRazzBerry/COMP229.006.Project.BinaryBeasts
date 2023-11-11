// Define Model
let userModel = require('../models/userModel');

// User Methods
module.exports.read = function (req, res) { res.json(req.user); }

// Add User
module.exports.add = async function (req, res, next) {
    try {
        let user = await userModel.create(req.body);
        res.status(200).json(user);
    } catch (error) { next(error); }
}

// Find User By ID
module.exports.find = async function(req, res, next) {
    try {
        let {id} = req.params;
        let user = await userModel.findById(id);
        res.status(200).json(user);
    } catch (error) { next(error); }
}

// List All Users
module.exports.list = async function(req, res, next) {
    try {
        let list = await userModel.find({});
        res.status(200).json(list);
    } catch (error) { next(error); }
}

// Update User Information By ID
module.exports.update = async function(req, res, next) {
    try {
        let {id} = req.params;
        let user = await userModel.findByIdAndUpdate(id, req.body);
        if(!user) { return res.status(404).json({ message: "User was not found!" }); }
        let updatedUser = await userModel.findById(id);
        res.status(200).json(updatedUser);
        } catch (error) { next(error); }
}

// Delete User By ID
module.exports.delete = async function(req, res, next) {
    try {
        let {id} = req.params;
        let user = await userModel.findByIdAndDelete(id);
        if(!user) { return res.status(404).json({ message: "User was not found!" }); }
        res.status(200).json({ message: "User with id: " + id + " was deleted." });
    } catch (error) { next(error); }
}