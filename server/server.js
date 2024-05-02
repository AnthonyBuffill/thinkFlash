const express = require('express');
const {ApolloServer} = require('@apollo/server');
const { expressMiddleware} = require('@apollo/server/express4');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env') });
const { authMiddleware } = require('./utils/auth');
const axios = require('axios');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();


const key = 'I_AM_YOUR_KEY';
const requestData = {
  key
};

const createGameUrl = 'http://localhost:4001/createGame';

axios.post(createGameUrl, requestData).then(
  response => {
    console.log(response.data);
  }
).catch(error =>{
  console.error('failed call', error.response.data.error);
});
