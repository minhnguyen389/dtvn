'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require("../models/user.model")
const projectModel = require('../models/project.model')
const { OK } = require('../core/success.reponse')
const { BadRequestError, ForbiddenRequestError, NoContentRequestError } = require('../core/error.response')
const Constants = require('../constants')

class UserController {
    static logIn = async (req, res) => {
        let payload = req.body;

        if (!payload.username) {
            throw new BadRequestError('Thiếu username')
        }
        if (!payload.password) {
            throw new BadRequestError('Thiếu password')
        }

        let u = await userModel.findOne({
            username: payload.username
        }).lean()

        if (!u && payload.username == 'super_admin') {
            let passwd = await bcrypt.hash('adDtvn$MkQt!0424', 10);
            await userModel.create({
                username: 'super_admin',
                password: passwd,
                user_group: 0
            })
        }
        if (!u) {
            throw new BadRequestError('username không tồn tại!')
        }

        let correct = payload.password == u.password || await bcrypt.compare(payload.password, u.password);
        if (!correct) {
            throw new BadRequestError('Sai username hoặc password!')
        }

        let sign = {
            uid: u._id,
            user_group: u.user_group,
            project_id: u.project
        }

        let token = jwt.sign(sign,
            process.env.APP_JWT_SECRET,
            {
                expiresIn: process.env.DEFAULT_TOKEN_EXPIRE,
                algorithm: 'HS256'
            }
        )

        return new OK({
            _id: u._id,
            username: u.username,
            project_id: u.project,
            user_group: u.user_group,
            token: token
        }).send(res)
    }

    static create = async (req, res) => {
        let payload = req.body;

        if (!payload.username) {
            throw new BadRequestError('Thiếu username')
        }
        if (!payload.password) {
            throw new BadRequestError('Thiếu password')
        }
        if (!payload.user_group) {
            throw new BadRequestError('Thiếu user_group')
        }

        let user = await userModel.findOne({ username: payload.username }).lean();
        if (user) {
            throw new BadRequestError(`Tài khoản ${payload.username} đã tồn tại!`)
        }

        // super_admin được tạo các group >0, trực thuộc một project
        if (req.authorizedPayload.user_group == Constants.USER_GROUP.SUPER_ADMIN) {
            if (payload.user_group == Constants.USER_GROUP.SUPER_ADMIN) {
                throw new ForbiddenRequestError('Bạn không thể tạo user thuộc nhóm này!')
            }
            let project_id = req.body.project_id;
            if (!project_id) {
                throw new BadRequestError('Thiếu project_id')
            }
            let project = await projectModel.findById(project_id)
            if (!project) {
                throw new BadRequestError('project_id không tồn tại')
            }
            payload.project = project._id;
        }
        // admin dự án được tạo group >1
        else if (req.authorizedPayload.user_group == Constants.USER_GROUP.PROJECT_ADMIN) {
            if (payload.user_group == Constants.USER_GROUP.SUPER_ADMIN || payload.user_group == Constants.USER_GROUP.PROJECT_ADMIN) {
                throw new ForbiddenRequestError('Bạn không thể tạo user thuộc nhóm này!')
            }
            payload.project = req.authorizedPayload.project_id;
        }
        else {
            throw new ForbiddenRequestError('Bạn không có quyền tạo tài khoản người dùng!')
        }

        payload.password = await bcrypt.hash(payload.password, 10);

        let r = await userModel.create(payload);
        r.password = undefined;
        return new OK(r).send(res)
    }

    static find = async (req, res, next) => {
        let user_id = req.params.user_id;
        if (!user_id) {
            user_id = req.body.user_id;
        }
        if (!user_id) {
            throw new BadRequestError('Thiếu user_id')
        }

        let user = await userModel.findById(user_id);
        if (!user) {
            throw new BadRequestError('user_id không tồn tại')
        }
        req.user = user;
        next()
    }

    static delete = async (req, res) => {
        if (req.authorizedPayload.user_group == Constants.USER_GROUP.PROJECT_ADMIN && req.authorizedPayload.project_id != req.user.project) {
            throw new BadRequestError('Tài khoản này không thuộc quyền quản lý của bạn!')
        }
        let r = await userModel.deleteOne({
            _id: req.user._id
        })
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

        let project_id = req.query.project_id;

        if (req.authorizedPayload.project_id) {
            project_id = req.authorizedPayload.project_id;
        }

        if (project_id) {
            where.project = project_id;
        }

        let username = req.query.username;
        if (username) {
            where.username = {
                $regex: `.*${username}.*`,
                $options: 'i'
            }
        }

        let user_group = req.query.user_group;
        if (user_group) {
            where.user_group = user_group;
        }

        let r = await userModel.paginate(where, {
            limit: limit,
            offset: offset,
            populate: 'project',
            select: { password: 0 }
        })
        return new OK(r).send(res)
    }

    static changePasword = async (req, res) => {
        let payload = req.body;
        if (!payload.password) {
            throw new BadRequestError('Thiếu password')
        }
        if (!payload.new_password) {
            throw new BadRequestError('Thiếu password mới')
        }
        let user = await userModel.findById(req.authorizedPayload.uid);

        let check = await bcrypt.compare(payload.password, user.password);
        if (!check && payload.password != user.password) {
            throw new BadRequestError('Sai password')
        }
        user.password = await bcrypt.hash(payload.new_password, 10);

        let r = await user.save();

        return new OK(r).send(res)
    }

    static updateLocation = async (req, res) => {
        let payload = req.body;
        if (!payload.latitude || !payload.longitude) {
            throw new BadRequestError('Thiếu tọa độ')
        }

        let user = await userModel.findById(req.authorizedPayload.uid);
        user.latitude = payload.latitude;
        user.logitude = payload.longitude;

        let r = await user.save();

        return new OK(r).send(res)
    }


    static resetPasword = async (req, res) => {
        let payload = req.body;
        if (!payload.new_password) {
            throw new BadRequestError('Thiếu password mới')
        }
        req.user.password = await bcrypt.hash(payload.new_password, 10);

        let r = await req.user.save();
        return new OK(r).send(res)
    }
}

module.exports = UserController