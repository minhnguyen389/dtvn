'use strict'
const mongoose = require('mongoose'); // Erase if already required
const mongoosePaginate = require('mongoose-paginate-v2');

// Declare the Schema of the Mongo model
let schema = new mongoose.Schema({
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },    
    station_id: {
        type: String,
        index: true,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },    
    created_at: Date,
    updated_at: Date
});

schema.index({ created_at: -1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

schema.pre('save', function (next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
schema.plugin(mongoosePaginate)
//Export the model
module.exports = mongoose.model('StatusLog', schema);