const Order = require('../models/order.model');

//parent is get data from previous level (will undetstand when console.log parent)
// context is get any data passed from apollo server
// infor is get data about information of this request
module.exports = {
    Query: {
        async order(parent, { ID }, context, info) {
            return await Order.findById(ID);
        },

        async getOrders(_, { amount }) {
            return await Order.find().limit(amount);
        },
    },
    Mutation: {
        async createOrder(_, { orderInput: { consumerName, note, createAt } }) {
            const createOrderObj = new Order({
                consumerName: consumerName,
                note: note,
                createAt: createAt,
            });

            const res = await createOrderObj.save();

            return {
                id: res.id,
                ...res._doc,
            };
        },
        async deleteOrder(_, { ID }) {
            const isDeleteOrder = (await Order.deleteOne({ _id: ID }))
                .deletedCount;

            return isDeleteOrder;
        },
        async editOrder(
            _,
            { ID, orderInput: { consumerName, note, createAt } },
        ) {
            const isEdit = (
                await Order.updateOne(
                    { _id: ID },
                    {
                        consumerName: consumerName,
                        note: note,
                        createAt: createAt,
                    },
                )
            ).modifiedCount;

            return isEdit;
        },
    },
};
