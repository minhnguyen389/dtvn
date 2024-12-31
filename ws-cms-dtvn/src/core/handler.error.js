'use strict'
class HandlerError {
    handlerError = fn => {
        return (req, res, next) => {
            fn(req, res, next).catch(next)
        }
    }
}

module.exports = new HandlerError();