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
Card {
_Id : Int
fronttext : String
backtext: String
CreatedAt: String
}
`;

module.exports = typeDefs;

module.exports = typeDefs;