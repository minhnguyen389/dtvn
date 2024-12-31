'use strict'

const mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2');
/**
 * Nhật ký trạm, thiết bị, công tác,...
 */
// Declare the Schema of the Mongo model
let schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    /**
     * files: Tập tài liệu liên quan đến công tác triển khai
     * Hỗ trợ các file ảnh jpg/png
     */
    photos: [{
        type: String,
        required: false
    }],
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    approval: {
        type: Boolean,
        required: false
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: Date,
    updated_at: Date
});
schema.pre('save', function (next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
schema.plugin(mongoosePaginate)
//Export the model
module.exports = mongoose.model('StationRecord', schema);