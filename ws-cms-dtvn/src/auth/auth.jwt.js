'use strict'
const { expressjwt: jwt } = require('express-jwt')
const { ErrorResponse } = require('../core/error.response');
const httpStatusCode = require('../core/httpStatusCode/httpStatusCode');

class JwtAuth {
    constructor() { }

    static initAuth = (app) => {

        /**********************************************************************
         * JWT Authentication
         * ********************************************************************/
        let jwtAuthorization = jwt({
            secret: process.env.APP_JWT_SECRET,
            algorithms: ['HS256'],
            requestProperty: 'authorizedPayload',
            // isRevoked: isRevokedCallback,
            getToken: function fromHeaderOrQuerystring(req) {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
                }
                return null;
            }
        });

        let jwtErrorHandler = function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                return res.status(httpStatusCode.StatusCodes.UNAUTHORIZED).json({
                    status: 'error',
                    code: httpStatusCode.StatusCodes.UNAUTHORIZED,
                    message: httpStatusCode.ReasonPhrases.UNAUTHORIZED
                })
            }
            next();
        }

        let unrestrictedRoutes = [
            '/api/v1/login',
            /^\/files\/.*/,
        ];

        // authorization middleware
        app.use(jwtAuthorization.unless({
            path: unrestrictedRoutes
        }));
        // then authorization error handler
        app.use(jwtErrorHandler);

    }
}

module.exports = JwtAuth