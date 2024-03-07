const resolvers = {
  Query: {
    number: async() =>{
      return 111;
    },
  },
};

module.exports = resolvers;