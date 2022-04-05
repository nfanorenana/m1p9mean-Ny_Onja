const { user } = require("../models");

module.exports.getUserRoute = function (user) {
    switch (user.role) {
        case 'user':
            return 'dashboard'
        case 'admin':
            return 'admin'
        case 'delivery_man':
            return 'delivery'
        case 'restaurant':
            return 'orderlist'
        default:
            break;
    }
};

// module.exports.getEmailSubject = function (user) {
//     switch (user.role) {
//         case 'customer':
//             return 'dashboard'
//         case 'ekaly':
//             return 'admin'
//         case 'delivery_man':
//             return 'delivery'
//         case 'restaurant':
//             return 'orderlist'
//         default:
//             break;
//     }
// };
