require('dotenv').config()
const express = require('express');
const cors = require('cors');
const {createServer} = require('http');
const {schema} = require('./graphql/schema/index');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
schema.applyMiddleware({app});

const httpServer = createServer(app);
schema.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${schema.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${schema.subscriptionsPath}`)
})