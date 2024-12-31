'use strict'
class Constants {
    static get USER_GROUP() {
        return {
            SUPER_ADMIN: 0, //admin hệ thống, toàn quyền
            PROJECT_ADMIN: 1, //admin công trình/dự án, toàn quyền với dự án phụ trách
            TECHNICIAN: 2 // kỹ thuật công trình
        };
    }
}
module.exports = Constants;