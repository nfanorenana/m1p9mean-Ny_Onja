const mongoose = require('mongoose');

const DeliverySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    delivery_man: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    status: {
        type: String,
        enum: ['Pending', 'Finished'],
        default: 'Pending'
    }
})

const Delivery = module.exports = mongoose.model('Delivery', DeliverySchema);

module.exports.getDeliveryById = function (id, callback) {
    Delivery.findById(id, callback);
}

module.exports.getPendingDeliveryByDeliveryM = function (deliveryMId, callback) {
    const query = { delivery_m_id: deliveryMId, status: 'Pending' };
    Delivery.find(query, callback);
}

module.exports.getDeliveryByDeliveryM = function (deliveryMId, callback) {
    const query = { delivery_m_id: deliveryMId };
    Delivery.find(query, callback);
}

module.exports.updateDeliveryStatus = function (delivery, callback) {
    delivery.status = 'Finished';
    delivery.save(callback);
}
