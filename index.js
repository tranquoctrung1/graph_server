const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: () => {
        return { token: 'some token' };
    },
});

mongoose
    .connect('mongodb://127.0.0.1:27017/graph', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connection successful');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server is running on port ${res.url}`);
    });
