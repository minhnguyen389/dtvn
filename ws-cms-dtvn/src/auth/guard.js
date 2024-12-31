'use strict'

const httpStatusCode = require("../core/httpStatusCode/httpStatusCode")

module.exports.checkUserGroup = (userGroupsAccepted) => {
    return (req, res, next) => {
        let user_group = req.authorizedPayload.user_group
        if (userGroupsAccepted.includes(user_group)) {
            next()
        } else {
            return res.status(httpStatusCode.StatusCodes.FORBIDDEN).json({
                status: 'error',
                code: httpStatusCode.StatusCodes.FORBIDDEN,
                message: 'Bạn không có quyền truy cập chức năng này!'
            })
        }
    }
}
