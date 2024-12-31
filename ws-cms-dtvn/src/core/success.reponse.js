'use strict'

const httpStatusCode = require("./httpStatusCode/httpStatusCode")

class SuccessResponse {
    constructor(metadata = {}, message, statusCode) {
        this.message = message ? message : httpStatusCode.ReasonPhrases.OK
        this.status = statusCode ? statusCode : httpStatusCode.StatusCodes.OK
        this.metadata = metadata
    }

    send(res, header = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor(metadata, message) {
        super(metadata, message)
    }
}

class CREATED extends SuccessResponse {
    constructor(metadata, message) {
        const statusCode = httpStatusCode.StatusCodes.CREATED
        const msg = message ? message : httpStatusCode.ReasonPhrases.CREATED
        super(metadata, msg, statusCode)
    }
}

module.exports = { OK, CREATED }