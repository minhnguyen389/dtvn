'use strict'

const mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2');

// Declare the Schema of the Mongo model
let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: false
    },
    //Mã dự án để quản lý đồng bộ với bên thứ 3 nếu có, duy nhất trên toàn hệ thống
    code: {
        type: String,
        required: true,
        unique: true
    },
    /**
     * files bao gồm các tài liệu liên quan đến công trình có thể được upload lên đây
     */
    files: [{
        type: String,
        required: false
    }],
    photos: [{
        type: String,
        required: false
    }],
    //Phương thức đẩy data cho bên thứ 3
    partners: [{        
        type: String,
        required: false,
        enum: ['datavn_MQ', 'tlvn_API', 'qtct_API', 'qttl_API']
    }],
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
module.exports = mongoose.model('Project', schema);