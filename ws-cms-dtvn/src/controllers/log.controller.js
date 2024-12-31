'use strict'
const { OK } = require('../core/success.reponse')
const { ForbiddenRequestError, NoContentRequestError, BadRequestError } = require("../core/error.response");

const dataLogModel = require('../models/data_log.model');
const mqttLogModel = require('../models/mqtt_log.model');
const statusLogModel = require('../models/status_log.model');
const parameterModel = require('../models/parameter.model');

let dayjs = require('dayjs');
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
let customParseFormat = require('dayjs/plugin/customParseFormat');


dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)


class LogController {
    //api
    static getListDataLogs = async (req, res) => {
        let limit = parseInt(req.query.limit, 10);
        if (isNaN(limit)) {
            limit = 10;
        }

        let offset = parseInt(req.query.offset, 10);
        if (!offset || isNaN(offset)) {
            offset = 0;
        }
        let where = {};

        if (req.query.company_id) {
            where.company = req.query.company_id
        }
        if (req.query.station_id) {
            where.station = req.query.station_id
        }
        if (req.query.logger_id) {
            where.logger = req.query.logger_id
        }
        if (req.query.nozzle_id) {
            where.nozzle = req.query.nozzle_id
        }

        if (req.authorizedPayload.company_id) {
            where.company = req.authorizedPayload.company_id
        }
        if (req.query.sent_result) {
            where.sent_result = req.query.sent_result
        }
        if (req.query.sent_to_partner) {
            where.sent_to_partner = req.query.sent_to_partner
        }
        if (req.query.test_data) {
            where.test_data = req.query.test_data
        }


        let time_start = req.query.time_start
        let time_end = req.query.time_end
        if (!time_start || !time_end) {
            throw new BadRequestError('Thiếu time_start time_end')
        }

        time_start = dayjs(time_start)
        time_end = dayjs(time_end)
        if (!time_start.isValid() || !time_end.isValid()) {
            throw new BadRequestError('time_start time_end không hợp lệ')
        }

        where.created_at = {
            $gte: time_start.toDate(),
            $lte: time_end.toDate()
        }

        let populate = [];
        if (req.query.populate == 1) {
            populate = ['company', 'station', 'logger', 'nozzle'];
        }


        let r = await saleLogModel.paginate(where, {
            sort: { created_at: -1 },
            limit: limit,
            offset: offset,
            populate: populate
        })
        return new OK(r).send(res)
    }

    static getListMqttLogs = async (req, res) => {
        let limit = parseInt(req.query.limit, 10);
        if (isNaN(limit)) {
            limit = 10;
        }

        let offset = parseInt(req.query.offset, 10);
        if (!offset || isNaN(offset)) {
            offset = 0;
        }
        let where = {};

        if (req.query.company_id) {
            where.company = req.query.company_id
        }
        if (req.query.station_id) {
            where.station = req.query.station_id
        }
        if (req.query.logger_id) {
            where.logger = req.query.logger_id
        }
        if (req.query.nozzle_id) {
            where.nozzle = req.query.nozzle_id
        }

        if (req.authorizedPayload.company_id) {
            where.company = req.authorizedPayload.company_id
        }
        if (req.query.sent_result) {
            where.sent_result = req.query.sent_result
        }
        if (req.query.sent_to_partner) {
            where.sent_to_partner = req.query.sent_to_partner
        }
        if (req.query.test_data) {
            where.test_data = req.query.test_data
        }


        let time_start = req.query.time_start
        let time_end = req.query.time_end
        if (!time_start || !time_end) {
            throw new BadRequestError('Thiếu time_start time_end')
        }

        time_start = dayjs(time_start)
        time_end = dayjs(time_end)
        if (!time_start.isValid() || !time_end.isValid()) {
            throw new BadRequestError('time_start time_end không hợp lệ')
        }

        where.created_at = {
            $gte: time_start.toDate(),
            $lte: time_end.toDate()
        }

        let populate = [];
        if (req.query.populate == 1) {
            populate = ['company', 'station', 'logger', 'nozzle'];
        }


        let r = await saleLogModel.paginate(where, {
            sort: { created_at: -1 },
            limit: limit,
            offset: offset,
            populate: populate
        })
        return new OK(r).send(res)
    }

    static getListStatusLogs = async (req, res) => {
        let limit = parseInt(req.query.limit, 10);
        if (isNaN(limit)) {
            limit = 10;
        }

        let offset = parseInt(req.query.offset, 10);
        if (!offset || isNaN(offset)) {
            offset = 0;
        }
        let where = {};

        if (req.query.station_id) {
            where.station = req.query.station_id
        }

        if (req.query.test_data) {
            where.test_data = req.query.test_data
        }

        let time_start = req.query.time_start
        let time_end = req.query.time_end
        if (!time_start || !time_end) {
            throw new BadRequestError('Thiếu time_start time_end')
        }

        time_start = dayjs(time_start)
        time_end = dayjs(time_end)
        if (!time_start.isValid() || !time_end.isValid()) {
            throw new BadRequestError('time_start time_end không hợp lệ')
        }

        where.created_at = {
            $gte: time_start.toDate(),
            $lte: time_end.toDate()
        }

        let populate = [];
        if (req.query.populate == 1) {
            populate = ['company', 'station', 'logger', 'nozzle'];
        }


        let r = await saleLogModel.paginate(where, {
            sort: { created_at: -1 },
            limit: limit,
            offset: offset,
            populate: populate
        })
        return new OK(r).send(res)
    }

    static createMqttLog = async (mac, type, id, msg) => {
        let log = {
            code: mac,
            type: type,
            message_id: id,
            message: msg
        }
        await mqttLogModel.create(log)
    }

    static createDataLog = async (mac, payload) => {
        let parameter = await parameterModel.findOne({ code: payload.id }).populate('station');
        if (!parameter) {
            console.error('createDataLog: Không có thông số đo/điều khiển phù hợp!')
            return;
        }

        let log = {
            project: parameter.project_id,
            station: parameter.station._id,
            parameter: parameter._id,
            project_id: parameter.project_id,
            station_id: parameter.station._id,
            parameter_id: parameter._id,
            data_type: parameter.station.activated ? 1 : 0,
            v1: payload.v1,
            v2: payload.v2,
            v3: payload.v3,
            v4: payload.v4,
            time: payload.t
        }
        await dataLogModel.create(log)
    }
}

module.exports = LogController