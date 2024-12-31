'use strict'
const mongoose = require('mongoose'); // Erase if already required
const mongoosePaginate = require('mongoose-paginate-v2');

// Declare the Schema of the Mongo model
let schema = new mongoose.Schema({
    //địa chỉ mac của thiết bị đẩy message hoặc sync_time
    code: {
        type: String,
        required: true
    },
    /**
     * Loại bản tin
     * sensor
     * control
     * res_control
     * config
     * res_config
     * res_sms
     * ping
     */
    type: {
        type: String,
        required: true
    },
    message_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date, expires: '1w',
    },
    updated_at: Date
});

schema.index({ code: 1, type: 1, message_id: 1 }, { unique: false });
//schema.index({ created_at: -1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });
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
module.exports = mongoose.model('MqttLog', schema);