const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const router = express.Router();

// Mock database for properties
let properties = [];

// Define GraphQL schema
const schema = buildSchema(`
  type Property {
    _id: ID!
    title: String!
    description: String!
    image: String
    contact: String
    price: Float
    type: String
  }

  type Query {
    getProperties: [Property]
  }

  type Mutation {
    addProperty(title: String!, description: String!, image: String, contact: String, price: Float, type: String): Property
    deleteProperty(id: ID!): String
  }
`);

// Define resolvers
const root = {
  getProperties: () => properties,
  addProperty: ({ title, description, image, contact, price, type }) => {
    const newProperty = {
      _id: properties.length + 1,
      title,
      description,
      image,
      contact,
      price,
      type,
    };
    properties.push(newProperty);
    return newProperty;
  },
  deleteProperty: ({ id }) => {
    const propertyIndex = properties.findIndex((property) => property._id == id);
    if (propertyIndex === -1) {
      throw new Error('Property not found');
    }
    properties.splice(propertyIndex, 1);
    return `Property with ID ${id} deleted successfully`;
  },
};

// Set up GraphQL endpoint
router.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for testing
  })
);

module.exports = router;