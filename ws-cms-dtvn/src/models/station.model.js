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
    /**
     * code: là địa chỉ MAC của thiết bị datalogger lắp đặt tại trạm
     * là duy nhất trên toàn hệ thống
     */
    code: {
        required: true,
        type: String,
        index: true,
        unique: true
    },
    /**
     * Trạm thuộc dự án nào, có thể ko thuộc bất cứ dự án nào
     * Phục vụ công tác tạo trạm test, demo,...
     */
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        index: true,
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    //Trạng thái kích hoạt/test thiết bị datalogger tại trạm
    activated: {
        type: Boolean,
        required: true,
        default: false
    },
    //Trạng thái online/offline
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    /**
     * Loại thiết bị của trạm để thể hiện config trên giao diện
     * Datalogger 4G ==> standalone = độc lập
     * Datalogger Lora ==> dependant = phụ thuộc
     * Gateway
     * Embedded PC
     * PLC
     */
    // deviceTypeOption = [
    //     { name: 'Datalogger 4G', value: 'Datalogger_4G' },
    //     { name: 'Datalogger Lora', value: 'Datalogger_Lora' },
    //     { name: 'Gateway', value: 'Gateway' },
    //     { name: 'PLC', value: 'PLC' },
    //     { name: 'Embedded PC', value: 'Embedded_PC' }
    //   ];
    device_type: {
        type: String,
        required: true
    },
    //Nếu là lora cần thêm thông tin gateway
    gateway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: false
    },
    //Nếu là gateway thì thêm danh sách các trạm lora
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: false
    }],
    //trường hợp gateway muốn hiển thị ra màn hình khổ lớn, cần thông tin về IP của server và cho phép hiển thị
    tcp_server_ip: {
        type: String,
        required: true,
        default: '0.0.0.0'
    },
    en_display: {
        type: Boolean,
        required: false
    },
    //Trạng thái gửi cấu hình
    //Xem các cấu hình đã được gửi xuống Datalogger hay chưa
    // Khi lưu config -> 0
    // Khi download -> 1;
    // Khi trả lời config -> 2
    cfg_status: {
        type: Number,
        required: false,
        enum: [0, 1, 2]
    },
    cfg_id: {
        type: String,
        required: false
    },
    //thông tin datalogger
    board: {
        type: String,
        required: false
    },
    version: {
        type: String,
        required: false
    },
    u1: {
        type: Number,
        required: false
    },
    u2: {
        type: Number,
        required: false
    },
    dbm: {
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
module.exports = mongoose.model('Station', schema);