'use strict'

const httpStatusCode = require("./httpStatusCode/httpStatusCode")

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}
class BadRequestError extends ErrorResponse {
    constructor(message) {
        super(message ? message : httpStatusCode.ReasonPhrases.BAD_REQUEST, httpStatusCode.StatusCodes.BAD_REQUEST)
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor(message) {
        super(message ? message : httpStatusCode.ReasonPhrases.FORBIDDEN, httpStatusCode.StatusCodes.FORBIDDEN)
    }
}

class NoContentRequestError extends ErrorResponse {
    constructor(message) {
        super(message ? message : httpStatusCode.ReasonPhrases.NO_CONTENT, httpStatusCode.StatusCodes.NO_CONTENT)
    }
}

module.exports = {
    ErrorResponse,
    BadRequestError,
    ForbiddenRequestError,
    NoContentRequestError
}