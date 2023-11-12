// Define Module Dependencies
const mongoose = require('mongoose');

// Create Schema
const tournamentSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    size: { type: Number, required: true },
    teams: [{ 
        teamName: { type: String } 
    }],
    active: { type: Boolean, default: false }
}, { collection: 'tournaments' });

// Ensure Virtual Fields Are Serialized
tournamentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

// Define Model
const tournament = mongoose.model('Tournament', tournamentSchema);

// Export Model
module.exports = tournament;