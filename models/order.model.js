const { model, Schema } = require('mongoose');

const OrderSchema = new Schema({
    consumerName: String,
    note: String,
    price: Number,
    createAt: Date,
});

module.exports = model('order', OrderSchema);
