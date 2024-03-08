const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
  decks: [Deck]!
}
type Deck {
  _id: ID
  title: String
  description: String
  cards: [Card]!
  createdAt: String
}
type Card {
_id : Int
frontText : String
backText: String
createdAt: String
}
type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username: String!): User
  decks(username: String): [Deck]
  deck(deckId: ID!): Deck
}
type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addDeck(title: String!, description: String!): Deck
  addCard(
    deckId: ID!
    FrontText: String!
    backText: String!
  ): Deck
  removeDeck(deckId: ID!): Deck
  removeCard(deckId: ID!, cardId: ID!): Deck
  updateCard(cardId: ID!, frontText: String, backText: String): Card
}
`;

module.exports = typeDefs;

