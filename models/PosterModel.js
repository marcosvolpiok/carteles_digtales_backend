const mongoose = require('mongoose');

const PosterSchema = mongoose.Schema({
    name: String,
    updated_at: { type: Date, default: Date.now },
    file_path: String
})

module.exports = mongoose.model('poster', PosterSchema);
