const mongoose = require('mongoose');
const {io} = require('../app');

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

/*
PosterSchema.post('updateOne', function(next){
    const model = this.model(this.constructor.modelName);
    console.log('****************UPDATEADOOOOOOOOOOOOOOOOO');
    //io.emit('action', 'ALGOOOOOOOOOOOOOOOOOO');
})
*/

module.exports = mongoose.model('poster', PosterSchema);
