const typeDefs = `
  type Query {
    number: Int
    createCards(title: String!, front: String!, back: String!, cardCount:Int!): String
  }
`;

module.exports = typeDefs;