'use strict'
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Constants = require('../constants');

// Declare the Schema of the Mongo model
let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    /**
     * user group
     * 0: super admin
     * 1: admin dự án/công trình
     * 2: kỹ thuật dự án/công trình
     */
    user_group: {
        type: Number,
        required: true,
        enum: {
            values: [
                Constants.USER_GROUP.SUPER_ADMIN,
                Constants.USER_GROUP.PROJECT_ADMIN,
                Constants.USER_GROUP.TECHNICIAN
            ],
            message: ' {VALUE} không hợp lệ!'
        }
    },
    password: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    //tọa độ view mặc định cho user khi xem trên bản đồ
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
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
module.exports = mongoose.model('User', schema);