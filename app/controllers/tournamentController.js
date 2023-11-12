// Define Model
let tournamentModel = require('../models/tournamentModel');

// Tournament Methods
module.exports.read = function (req, res) { res.json(req.tournament); }

// Add Tournament
module.exports.add = async function (req, res, next) {
    try {
        let tournament = await tournamentModel.create(req.body);
        res.status(200).json(tournament);
    } catch (error) { next(error); }
}

// Find Tournament By ID
module.exports.find = async function(req, res, next) {
    try {
        let {id} = req.params;
        let tournament = await tournamentModel.findById(id);
        res.status(200).json(tournament);
    } catch (error) { next(error); }
}

// List All Tournaments
module.exports.list = async function(req, res, next) {
    try {
        let list = await tournamentModel.find({});
        res.status(200).json(list);
    } catch (error) { next(error); }
}

// Update Tournament Information By ID
module.exports.update = async function(req, res, next) {
    try {
        let {id} = req.params;
        let tournament = await tournamentModel.findByIdAndUpdate(id, req.body);
        if(!tournament) { return res.status(404).json({ message: "Tournament was not found!" }); }
        let updatedTournament = await tournamentModel.findById(id);
        res.status(200).json(updatedTournament);
        } catch (error) { next(error); }
}

// Delete Tournament By ID
module.exports.delete = async function(req, res, next) {
    try {
        let {id} = req.params;
        let tournament = await tournamentModel.findByIdAndDelete(id);
        if(!tournament) { return res.status(404).json({ message: "Tournament was not found!" }); }
        res.status(200).json({ message: "Tournament with id: " + id + " was deleted." });
    } catch (error) { next(error); }
}