'use strict'

const { OK } = require('../core/success.reponse')
const { ForbiddenRequestError, NoContentRequestError, BadRequestError } = require("../core/error.response");
const stationModel = require("../models/station.model");
const projectModel = require("../models/project.model");
const parameterModel = require("../models/parameter.model");

class ParameterController {
    static create = async (req, res) => {
        let payload = req.body;

        if (!payload.name) {
            throw new BadRequestError('Thiếu name')
        }
        if (!payload.code) {
            throw new BadRequestError('Thiếu code')
        }

        let parameter = await parameterModel.findOne({ code: payload.code }).lean();
        if (parameter) {
            throw new BadRequestError('Mã thông số đã tồn tại!')
        }

        // if (req.authorizedPayload.user_group === 0 && !payload.project_id) {
        //     throw new BadRequestError('Thiếu Công trình (project_id)')
        // }
        // else if (req.authorizedPayload.user_group === 1) {
        //     if (req.authorizedPayload.project_id && req.authorizedPayload.project_id != payload.project_id) {
        //         throw new ForbiddenRequestError('Công trình không thuộc quyền quản lý của bạn!')
        //     }
        //     payload.project_id = req.authorizedPayload.project_id
        // }

        // //Xac dinh project_id
        // let project = await projectModel.findOne({
        //     _id: payload.project_id
        // }).lean();

        // if (!project) {
        //     throw new BadRequestError('Không có công trình hợp lệ (project_id error)!')
        // }
        // payload.project = project._id;

        let station = await stationModel.findOne({
            _id: payload.station_id
        }).populate('project').lean();
        if (!station) {
            throw new BadRequestError('Không có trạm hợp lệ (station_id error)!')
        }
        payload.station = station._id;
        payload.project_name = station.project.name;
        payload.project_id = station.project._id;


        let r = await parameterModel.create(payload)
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
            where.project_id = req.query.project_id
        }

        if (req.authorizedPayload.project_id) {
            where.project_id = req.authorizedPayload.project_id
        }

        if (req.query.station_id) {
            where.station = req.query.station_id
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

        let r = await parameterModel.paginate(where, {
            limit: limit,
            offset: offset,
            populate: ['station']
        })
        return new OK(r).send(res)
    }


    static getDetail = async (req, res) => {
        let parameter_id = req.params.parameter_id

        if (!parameter_id) {
            throw new BadRequestError('Thiếu parameter_id')
        }
        let r = await parameterModel.findOne({
            _id: parameter_id
        }).populate(['station']).lean()

        return new OK(r).send(res)
    }

    static find = async (req, res, next) => {
        let parameter_id = req.params.parameter_id
        if (!parameter_id)
            parameter_id = req.body.parameter_id

        if (!parameter_id) {
            throw new BadRequestError('Thiếu parameter_id')
        }
        let parameter = await parameterModel.findById(parameter_id)
        req.parameter = parameter
        next()
    }

    static edit = async (req, res) => {
        if (!req.parameter) {
            throw new NoContentRequestError()
        }
        let payload = req.body

        if (payload.name) {
            req.parameter.name = payload.name
        }
        if (payload.description) {
            req.parameter.description = payload.description
        }

        let parameter = await parameterModel.findOne({ code: payload.code }).lean();

        if (parameter && req.parameter.code != parameter.code) {
            throw new BadRequestError('Mã thông số đã tồn tại!')
        }

        if (payload.code) {
            req.parameter.code = payload.code
        }

        let r = await req.parameter.save()
        return new OK(r).send(res)
    }

    static delete = async (req, res) => {
        if (!req.parameter) {
            throw new NoContentRequestError()
        }

        req.parameter = await parameterModel.findById(req.parameter._id).populate('station').lean();

        if (req.parameter.station.activated) {
            throw new ForbiddenRequestError('Không thể xóa thông số của trạm đã được kích hoạt!')
        }

        let r = await parameterModel.deleteOne({
            _id: req.parameter._id
        })
        return new OK(r).send(res)
    }

    static config = async (req, res) => {
        if (!req.parameter) {
            throw new NoContentRequestError()
        }
        let payload = req.body

        if (payload.dtype) req.parameter.dtype = payload.dtype
        else req.parameter.dtype = null

        if (payload.port) req.parameter.port = payload.port
        else q.parameter.port = null

        if (payload.address) req.parameter.address = payload.address
        else req.parameter.address = null

        if (payload.ftype) req.parameter.ftype = payload.ftype
        else req.parameter.ftype = null

        if (payload.cval) req.parameter.cval = payload.cval
        else req.parameter.cval = null

        if (payload.dval >= 0) req.parameter.dval = payload.dval
        else req.parameter.dval = null

        if (payload.cycle >= 0) req.parameter.cycle = payload.cycle
        else req.parameter.cycle = null

        if (payload.table) req.parameter.table = payload.table
        else req.parameter.table = null

        if (payload.params) req.parameter.params = payload.params
        else req.parameter.params = null

        if (payload.hmi) req.parameter.hmi = payload.hmi
        else req.parameter.hmi = null

        if (payload.siren_control) req.parameter.siren_control = payload.siren_control
        else req.parameter.siren_control = null

        let r = await req.parameter.save()

        let station = await stationModel.findById(req.parameter.station);
        station.cfg_status = 0;
        station.cfg_id = null;
        await station.save()

        return new OK(r).send(res)
    }

}
module.exports = ParameterController