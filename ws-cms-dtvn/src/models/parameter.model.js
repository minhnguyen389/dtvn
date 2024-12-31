'use strict'

const mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * Các chỉ số điều khiển và giám sát của một trạm
 */
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
     * Là mã ghép nối giữa các bên đối tác nhận số liệu
     * và là mã để cấu hình datalogger map data khi đẩy lên
     */
    code: {
        required: true,
        type: String,
        index: true,
        unique: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true,
        index: true,
    },
    project_name: {
        type: String,
        required: true
    },
    project_id: {
        type: String,
        required: true,
        index: true,
    },
    //loại cổng kết nối
    port: {
        type: String,
        required: false
    },
    //địa chỉ cổng kết nối
    address: {
        type: Number,
        required: false
    },
    //Loại thiết cảm biến hoặc bộ điều khiển được lắp đặt để phục vụ chỉ số này
    //Danh sách được thiết lập sẵn
    // device_type: {
    //     type: String,
    //     required: true
    // },
    //ký hiệu của loại thiết bị, xác định phương pháp tính toán
    dtype: {
        type: String,
        required: false
    },
    //Công thức sử dụng để tính toán
    ftype: {
        type: String,
        required: false
    },
    //Loại giá trị hiện tại để áp dụng dval và cycle v1-v4
    cval: {
        type: String,
        required: false
    },
    //Giá trị chênh lệch để gửi số liệu về server
    dval: {
        type: Number,
        required: false
    },
    //chu kỳ gửi số liệu về server
    cycle: {
        type: Number,
        required: false
    },
    //bảng tra nội suy
    table: {
        type: String,
        required: false
    },
    //các hằng số cho công thức
    params: {
        type: String,
        required: false
    },
    //cấu hình hiển thị hmi
    hmi: {
        type: String,
        required: false
    },
    //cấu hình điều khiển còi modbus
    siren_control: {
        type: String,
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
module.exports = mongoose.model('Parameter', schema);