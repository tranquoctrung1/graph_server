const { gql } = require('apollo-server');

module.exports = gql`
    scalar Date

    type Order {
        consumerName: String
        note: String
        price: Int
        createAt: Date
    }

    input OrderInput {
        consumerName: String
        note: String
        createAt: Date
    }

    type Query {
        order(ID: ID!): Order!
        getOrders(amount: Int): [Order]
    }

    type Mutation {
        createOrder(orderInput: OrderInput): Order!
        deleteOrder(ID: ID!): Boolean
        editOrder(ID: ID!, orderInput: OrderInput): Boolean
    }

    # enum for data validation
    # union for handling error
`;
