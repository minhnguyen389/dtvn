'use strict'

const { OK } = require('../core/success.reponse')
const { BadRequestError } = require("../core/error.response");
const multer = require('multer')
const fs = require('fs');
const max_file_size = 1024 * 1024 * Number(process.env.MAX_FILE_SIZE_MB);
const number_of_file = Number(process.env.NUMBER_OF_FILE);

let uploadFileToServer = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__basedir}/public/files`)
        },
        filename: (req, file, cb) => {
            let names = file.originalname.split('.');
            cb(null, names[0].replace(/ /g, "_") + '_' + Date.now() + '_' + Math.floor(Math.random() * 1000) + '.' + names[1])
        }
    }),
    limits: {
        fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|xls|xlsx|pdf|dwg|rar|zip)$/)) {
            return cb(new Error('Chỉ hỗ trợ file ảnh (png/jpg/jpeg), tài liệu (pdf/word/excel), autoCAD, rar/zip'));
        }
        cb(null, true);
    }
});

let uploadArray = uploadFileToServer.array('files', number_of_file);

class FileController {

    static uploadFiles = async (req, res, next) => {
        uploadArray(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                let msg = 'Có lỗi xảy ra!'
                if (err.code == 'LIMIT_FILE_SIZE') msg = `File vượt quá dung lượng: ${process.env.MAX_FILE_SIZE_MB}MB`;
                else if (err.code == 'LIMIT_UNEXPECTED_FILE') msg = `Vượt quá số lượng cho phép upload: ${number_of_file} file`;
                else msg = err.code;
                return next(new BadRequestError(msg))
            }
            else if (err) {
                return next(new BadRequestError(err))
            } else {
                return next()
            }
        });
    }

    static deleteFile = async (file) => {
        let dir = `${__basedir}/public/files/${file}`;
        if (fs.existsSync(dir)) fs.unlinkSync(dir);
    }

    static deleteMultiFiles = async (files) => {
        try {
            files.forEach(file => fs.existsSync(`${__basedir}/public/files/${file}`) && fs.unlinkSync(`${__basedir}/public/files/${file}`))
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = FileController