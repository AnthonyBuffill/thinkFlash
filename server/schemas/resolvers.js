const {
  createCards,
} = require('../controller/openAIController');

const resolvers = {
  Query: {
    number: async() =>{
      return 111;
    },
    createCards: async(parent, {title, front, back, cardCount}) => {
      const value = await createCards(title, front, back, cardCount);
      return JSON.stringify(value);
    },
  },
};

module.exports = resolvers;