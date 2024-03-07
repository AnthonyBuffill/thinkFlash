const express = require('express');
const {ApolloServer} = require('@apollo/server');
const { expressMiddleware} = require('@apollo/server/express4');
const path = require('path');
const routes = require('./routes');
require('dotenv').config({path: path.resolve(__dirname, '../.env') });

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () =>{
  await server.start();

  app.use(express.urlencoded({extended:true}));
  app.use(express.json());
  app.use(routes);

  if(process.env.NODE_ENV === 'production'){

  }
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () =>{
      console.log(`API SErver running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    });
  });
};

startApolloServer();