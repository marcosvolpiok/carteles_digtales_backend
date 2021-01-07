const mongoose = require('mongoose');

const PosterSchema = mongoose.Schema({
    name: String,
    updated_at: { type: Date, default: Date.now },
    file_path: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    init_time: String,
    end_time: String
});



PosterSchema.post('updateOne', function(next){
    const model = this.model(this.constructor.modelName);
    model.emit('created', this);
    console.log('****************UPDATEADOOOOOOOOOOOOOOOOO');

        
})

module.exports = mongoose.model('poster', PosterSchema);
