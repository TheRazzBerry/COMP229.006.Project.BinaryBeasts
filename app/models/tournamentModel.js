// Define Module Dependencies
const mongoose = require('mongoose');

// Create Schema
const tournamentSchema = mongoose.Schema({
    name: { type: String,
        unique: true,
        required: 'Name is required',
        trim: true },

    description: { type: String, required: true },

    owner: { type: String, required: true },

    size: { 
        type: Number, 
        required: 'Number of players is required',
    },
    
    teams: [{ 
        teamName: { type: String }
    }],
    active: { type: Boolean, default: false }    
});

// Define Model
const tournament = mongoose.model('Tournament', tournamentSchema);

// Export Model
module.exports = tournament;