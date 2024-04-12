const { User, Deck, Card } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {
  createCards,
} = require('../controller/openAIController');
 
 const resolvers = {
    Query: {
      users: async () => {
        
        return User.find().populate('decks');
      },
      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId}).populate(
          {
            path:'decks',
            populate: {
              path: 'cards',
            },
          }
        );
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
      },
      decks: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Deck.find(params).sort({ createdAt: -1 }).populate('cards');
      },
      deck: async (parent, { deckId }) => {
        return Deck.findOne({ _id: deckId }).populate('cards');
      },
      cards: async () =>{
        return Card.find();
      },
      card: async (parent, {cardId}) =>{
        return Card.findOne({_id, cardId});
      },
      createCards: async(parent, {title, frontText, backText, cardCount}, context) => {
        try{
          // if(context.user === undefined){
          //   return JSON.stringify({message: "You must login to generate cards!"});
          // }
          const value = await createCards(title, frontText, backText, cardCount);
          console.log("finished calling API");
          return JSON.stringify(value);
        }catch(error){
          console.log("AI error- OPENAI_API_KEY variable probably not set in .env " + error);
          return error;
        }
      },
    }, 
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
       
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError
        }
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError
        }
        const token = signToken(user);

        return { token, user };
      },
      addDeck: async (parent, { title, description, cardData }, context) => {
        try{
          if(context.user === undefined){
            // console.log("not logged in");
            return JSON.stringify({message: "You must login to Save a Deck!"});
          }
          
          const user = await User.findOne({ _id: context.user._id });
          if(!user){
            // console.log("no user");
            return JSON.stringify({message: "You must login to Save a Deck!"});
          }
          let cards = [];
          if(cardData){
            cards = JSON.parse(cardData);
          }
          const createdCards = await Card.create(cards);
          const cardIds = createdCards.map(card => card._id);
          const deck = await Deck.create({ title, description, cards:cardIds });
          user.decks.push(deck._id);
          await user.save();
          await new Promise(resolve => setTimeout(resolve, 1000));
          return deck;
        }catch(error){
          return error;
        }
        // await User.findOneAndUpdate(
        //   { _id: req.params._id  },
        //   { $addToSet: { decks: deck._id } }
        // );
  
      },
      addCard: async (parent, { deckId, frontText, backText }) => {
        return Deck.findOneAndUpdate(
          { _id: deckId },
          {
            $addToSet: { cards: { frontText, backText } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      updateCard: async (parent, { id, frontText, backText }) => {
        // Find and update the matching card using the destructured args
        return await Card.findOneAndUpdate(
          { _id: id }, 
          { frontText },
          { backText },
          // Return the newly updated object instead of the original
          { new: true }
        );
      },
      removeDeck: async (parent, { deckId }) => {
        return Deck.findOneAndDelete({ _id: deckId });
      },
      removeCard: async (parent, { deckId, cardId }) => {
        return Deck.findOneAndUpdate(
          { _id: deckId },
          { $pull: { cards: { _id: cardId } } },
          { new: true }
        );
      },
    },
  };


module.exports = resolvers;