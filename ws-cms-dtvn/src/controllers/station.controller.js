'use strict'

const { OK } = require('../core/success.reponse')
const { ForbiddenRequestError, NoContentRequestError, BadRequestError } = require("../core/error.response");
const stationModel = require("../models/station.model");
const parameterModel = require("../models/parameter.model");
const projectModel = require("../models/project.model");
const stationRecordModel = require("../models/station_record.model");
const Constants = require('../constants');
const dayjs = require('dayjs');
const Checksum = require('../helper/checksum');
const LogController = require('./log.controller');

class StationController {
    static create = async (req, res) => {
        let payload = req.body;

        if (!payload.name) {
            throw new BadRequestError('Thiếu name')
        }
        if (!payload.code) {
            throw new BadRequestError('Thiếu code')
        }

        let station = await stationModel.findOne({ code: payload.code }).lean();
        if (station) {
            throw new BadRequestError('Địa chỉ thiết bị (MAC address) đã tồn tại!')
        }

        if (!payload.device_type) {
            throw new BadRequestError('Thiếu loại thiết bị')
        }

        if (req.authorizedPayload.user_group === Constants.USER_GROUP.SUPER_ADMIN && !payload.project_id) {
            throw new BadRequestError('Thiếu Công trình (project_id)')
        }
        else if (req.authorizedPayload.user_group === Constants.USER_GROUP.PROJECT_ADMIN) {
            if (req.authorizedPayload.project_id && req.authorizedPayload.project_id != payload.project_id) {
                throw new ForbiddenRequestError('Công trình không thuộc quyền quản lý của bạn!')
            }
            payload.project_id = req.authorizedPayload.project_id
        }

        //Xac dinh project_id
        let project = await projectModel.findOne({
            _id: payload.project_id
        }).lean();

        if (!project) {
            throw new BadRequestError('Không có công trình hợp lệ (project_id error)!')
        }
        payload.project = project._id;

        let r = await stationModel.create(payload)
        return new OK(r).send(res)
    }

    static getList = async (req, res) => {
        let limit = parseInt(req.query.limit, 10);
        if (isNaN(limit)) {
            limit = 10;
        }

        let offset = parseInt(req.query.offset, 10);
        if (!offset || isNaN(offset)) {
            offset = 0;
        }

        let where = {};

        if (req.query.project_id) {
            where.project = req.query.project_id
        }

        if (req.authorizedPayload.project_id) {
            where.project = req.authorizedPayload.project_id
        }

        let name = req.query.name;
        if (name) {
            where.name = {
                $regex: `.*${name}.*`,
                $options: 'i'
            }
        }

        let code = req.query.code;
        if (code) {
            where.code = {
                $regex: `.*${code}.*`,
                $options: 'i'
            }
        }

        if (req.query.device_type) {
            where.device_type = req.query.device_type
        }

        let r = await stationModel.paginate(where, {
            limit: limit,
            offset: offset,
            populate: ['project']
        })
        return new OK(r).send(res)
    }

    static getByLocation = async (req, res) => {
        let where = {};

        if (req.authorizedPayload.project_id) {
            where.project = req.authorizedPayload.project_id
        }

        if (req.query.lat_min && req.query.lat_max && req.query.long_min && req.query.long_max) {
            where.latitude = {
                $gte: req.query.lat_min, $lte: req.query.lat_max
            };
            where.longitude = {
                $gte: req.query.long_min, $lte: req.query.long_max
            };
        }

        let r = await stationModel.find(where).populate('project').lean();
        return new OK(r).send(res)
    }

    static getAll = async (req, res) => {
        let where = {};

        if (req.authorizedPayload.project_id) {
            where.project = req.authorizedPayload.project_id
        }

        let r = await stationModel.find(where).populate('project').lean();
        return new OK(r).send(res)
    }

    static getDetail = async (req, res) => {
        let station_id = req.params.station_id

        if (!station_id) {
            throw new BadRequestError('Thiếu station_id')
        }
        let r = await stationModel.findOne({
            _id: station_id
        }).populate(['project', 'gateway', 'clients'])
            .lean()

        return new OK(r).send(res)
    }

    static find = async (req, res, next) => {
        let station_id = req.params.station_id
        if (!station_id)
            station_id = req.body.station_id

        if (!station_id) {
            throw new BadRequestError('Thiếu station_id')
        }
        let station = await stationModel.findById(station_id)
        req.station = station
        next()
    }

    static edit = async (req, res) => {
        if (!req.station) {
            throw new NoContentRequestError()
        }
        let payload = req.body

        if (payload.name) {
            req.station.name = payload.name
        }
        if (payload.description) {
            req.station.description = payload.description
        }

        if (payload.latitude && payload.longitude) {
            req.station.latitude = payload.latitude
            req.station.longitude = payload.longitude
        }

        if (payload.code) {
            req.station.code = payload.code
        }

        // let old_gateway = undefined;
        // if (payload.gateway && payload.gateway != req.station.gateway) {
        //     old_gateway = req.station.gateway;
        //     req.station.gateway = payload.gateway;
        // }

        // if (payload.en_display) {
        //     req.station.en_display = payload.en_display
        // }

        // if (payload.tcp_server_ip) {
        //     req.station.tcp_server_ip = payload.tcp_server_ip
        // }

        let r = await req.station.save();

        //xử lý gateway
        // if (payload.gateway) {
        //     //add vào gateway mới
        //     let gw = await stationModel.findById(payload.gateway);
        //     if (!gw.clients.find(c => c.toString() == r._id)) {
        //         gw.clients.push(r._id);
        //         await gw.save();
        //     }
        //     //remove ở gateway cũ
        //     if (old_gateway) {
        //         let old_gw = await stationModel.findById(old_gateway);
        //         let cls = old_gw.clients.filter(c => c.toString() != r._id)
        //         old_gw.clients = cls;
        //         await old_gw.save();
        //     }
        // }
        return new OK(r).send(res)
    }

    static delete = async (req, res) => {
        if (!req.station) {
            throw new NoContentRequestError()
        }
        if (req.station.activated) {
            throw new ForbiddenRequestError('Không thể xóa trạm đã được kích hoạt!')
        }

        //Chỉ cho phép xóa station khi ko còn chỉ số nào
        let parameter = await parameterModel.findOne({
            station: req.station._id
        });

        if (parameter) {
            throw new BadRequestError('Không được phép xóa trạm khi còn các thông số (thiết bị)!')
        }

        //Chỉ cho phép xóa khi không có nhật ký nào
        let record = await stationRecordModel.findOne({
            station: req.station._id
        });

        if (record) {
            throw new BadRequestError('Không được phép xóa trạm khi còn các nhật ký!')
        }

        if (req.station.gateway) {
            throw new BadRequestError('Không được phép xóa trạm vì đang được cấu hình trong gateway quản lý!')
        }

        //Chỉ cho phép xóa khi không có trạm nào cấu hình gateway này
        let station = await stationModel.findOne({
            gateway: req.station._id
        });

        if (station) {
            throw new BadRequestError('Không được phép xóa trạm khi còn các trạm khác cấu hình vào gateway này!')
        }

        let r = await stationModel.deleteOne({
            _id: req.station._id
        })
        return new OK(r).send(res)
    }

    static active = async (req, res) => {
        if (!req.station) {
            throw new NoContentRequestError()
        }
        let activated = req.body.activated;
        req.station.activated = activated;

        let r = await req.station.save();
        return new OK(r).send(res)
    }

    static downloadConfig = async (req, res) => {
        if (!req.station) {
            throw new NoContentRequestError()
        }

        let payload = req.body;

        if (!payload.data) {
            throw new BadRequestError(`Thiếu dữ liệu config!`)
        }

        if (!payload.type) {
            throw new BadRequestError(`Thiếu loại config!`)
        }

        if (!payload.mac) {
            throw new BadRequestError(`Thiếu mã thiết bị Datalogger!`)
        }

        let id = dayjs().unix();
        let buff = `${payload.type}@${id}=${payload.data}`;
        let crc = Checksum.calculateCRC(buff);
        let data = buff + crc + ';'

        require('../mqtt/mqx.client').pubConfig(payload.mac, data);
        // require('../mqtt/mqClient').mqttClient.publish(`dtvn/${payload.mac}/config`, data, { qos: 1, retain: true }, (err) => {
        //     if (err) {
        //         console.log(`*****MQTT publish 'dtvn/${payload.mac}/config' ERR: ${err}`);
        //         throw new BadRequestError(`Lỗi server kết nối!`)
        //     }
        // });

        req.station.cfg_status = 1;
        req.station.cfg_id = id;
        let r = await req.station.save();

        return new OK(r).send(res)
    }

    static removeClient = async (req, res) => {
        if (!req.station) {
            throw new NoContentRequestError()
        }

        let payload = req.body
        let client = await stationModel.findById(payload.client_id);

        if (!client) {
            throw new BadRequestError(`Trạm (client) không tồn tại!`)
        }

        let cls = req.station.clients.filter(c => c.toString() != payload.client_id)
        req.station.clients = cls;
        req.station.cfg_status = 0;
        req.station.cfg_id = null;
        let r = await req.station.save();

        client.gateway = null;
        client.cfg_status = 0;
        client.cfg_id = null;
        await client.save();

        return new OK(r).send(res)
    }

    static config = async (req, res) => {
        if (!req.station) {
            throw new NoContentRequestError()
        }
        let payload = req.body

        let old_gateway = undefined;
        if (payload.gateway && payload.gateway != req.station.gateway) {
            old_gateway = req.station.gateway;
            req.station.gateway = payload.gateway;
        }

        if (payload.en_display) {
            req.station.en_display = payload.en_display
        }

        if (payload.tcp_server_ip) {
            req.station.tcp_server_ip = payload.tcp_server_ip
        }

        req.station.cfg_status = 0;
        req.station.cfg_id = null;

        let r = await req.station.save();

        //xử lý gateway
        if (payload.gateway) {
            //add vào gateway mới
            let gw = await stationModel.findById(payload.gateway);
            if (!gw.clients.find(c => c.toString() == r._id)) {
                gw.clients.push(r._id);
                gw.cfg_status = 0;
                gw.cfg_id = null;
                await gw.save();
            }
            //remove ở gateway cũ
            if (old_gateway) {
                let old_gw = await stationModel.findById(old_gateway);
                let cls = old_gw.clients.filter(c => c.toString() != r._id)
                old_gw.clients = cls;
                old_gw.cfg_status = 0;
                old_gw.cfg_id = null;
                await old_gw.save();
            }
        }
        return new OK(r).send(res)
    }

    static resConfig = async (mac, payload) => {
        let station = await stationModel.findOne({ code: mac });
        if (!station) {
            console.error('resConfig: Không có trạm phù hợp!')
            return;
        }

        if (station.cfg_id == payload.id) {
            station.cfg_status = 2;
            await station.save();
        }
        else {
            console.error('resConfig: mã config_id không tồn tại!')
        }
    }

    static getPingMsg = async (mac, payload) => {
        let station = await stationModel.findOne({ code: mac });
        if (!station) {
            console.error('pingMsg: Không có trạm phù hợp!')
            return;
        }

        if (payload && payload.board) station.board = payload.board;
        if (payload && payload.ver) station.version = payload.ver;
        if (payload && payload.u1) station.u1 = payload.u1;
        if (payload && payload.u2) station.u2 = payload.u2;
        if (payload && payload.dbm) station.dbm = payload.dbm;

        await station.save();
    }

    static setOnline = async (mac) => {
        let station = await stationModel.findOne({ code: mac });
        if (!station) {
            console.error('setOnline: Không có trạm phù hợp!')
            return;
        }

        //Luu lasttime cho station,
        const key = `station_lasttime:${station._id}`;
        await require('../cache/init.redis').getRedisClient().set(key, new Date().getTime().toString());

        if (station.status) return;

        station.status = true;
        await station.save();

        LogController.createStatusLog(mac, station._id, true);

        
    }

    static setOffline = async (id) => {
        let station = await stationModel.findById(id);
        if (!station) {
            console.error('setOffline: Không có trạm phù hợp!')
            return;
        }

        if (!station.status) return;

        station.status = false;
        await station.save();

        LogController.createStatusLog(station.code, station._id, false)

        const key = `station_lasttime:${station._id}`;
        await require('../cache/init.redis').getRedisClient().del(key);
    }
}
module.exports = StationController