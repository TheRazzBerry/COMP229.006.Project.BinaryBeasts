// Define Module Dependencies
const mongoose = require('mongoose');

// Create Schema
const tournamentSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: String, required: true },
    size: { type: Number, required: true },
    teams: [{ 
        teamName: { type: String }
    }],
    active: { type: Boolean, default: false }    
});

// Define Model
const tournament = mongoose.model('Tournament', tournamentSchema);

// Export Model
module.exports = tournament;