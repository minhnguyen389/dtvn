'use strict'
const mongoose = require('mongoose'); // Erase if already required
const mongoosePaginate = require('mongoose-paginate-v2');

// Declare the Schema of the Mongo model
let schema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    parameter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parameter',
        required: true
    },
    project_id: {
        type: String,
        index: true,
        required: true
    },
    station_id: {
        type: String,
        index: true,
        required: true
    },
    parameter_id: {
        type: String,
        required: true
    },
    /**
     * loại data: mặc định 0 là dữ liệu test, 
     * phụ thuộc vào trạng thái kích hoạt của station
     * 1 thể hiện đã được kích hoạt
     */
    data_type: {
        type: Number,
        required: true,
        default: 0
    },
    //v1-v4 là 4 giá trị của các chỉ số đo
    v1: {
        type: Number,
        required: false
    },
    v2: {
        type: Number,
        required: false
    },
    v3: {
        type: Number,
        required: false
    },
    v4: {
        type: Number,
        required: false
    },
    //là giá trị đọc trạng thái điều khiển
    cv: {
        type: Number,
        required: false
    },
    time: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date
});

schema.index({ parameter_id: 1, data_type: 1 }, { unique: false });
schema.index({ created_at: -1 });

schema.pre('save', function (next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
schema.plugin(mongoosePaginate)
//Export the model
module.exports = mongoose.model('DataLog', schema);