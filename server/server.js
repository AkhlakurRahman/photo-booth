const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });
const fs = require('fs');
const path = require('path');

const Photo = require('./models/Photo');
const resolvers = require('./resolvers');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

const typeDefsPath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(typeDefsPath, 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Photo
  }
});

server.listen(4444).then(({ url }) => {
  console.log(`Server started on ${url}`);
});
