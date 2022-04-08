
module.exports.getUserRoute = function (user) {
    switch (user.role) {
        case 'user':
            return ''
        case 'admin':
            return 'admin'
        case 'delivery_man':
            return 'delivery'
        case 'restaurant':
            return 'restaurant/orderlist'
        default:
            break;
    }
};


