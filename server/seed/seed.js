const db = require('../config/connection');
const { User, Card, Deck } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');
const { bones, monk, multiplication} = require('./cardSeeds');

async function createCards(jsonSeed){
  const createdCards = await Card.create(jsonSeed.cards);
  // console.log(createdCards);
  const cardIds = createdCards.map(card=>card._id);
  // console.log(cardIds);
  const newDeck = new Deck({cards: cardIds, title: jsonSeed.title, description:jsonSeed.description});
  const savedDeck = await newDeck.save();
  return savedDeck._id;
}
db.once('open', async () => {
  try {
    await cleanDB('User', "users");
    await cleanDB('Deck', "decks");
    await cleanDB("Card", "cards");
    const bonesDeckID = await createCards(bones);
    const monkDeckID = await createCards(monk);
    const multiplicationDeckID = await createCards(multiplication);
    userSeeds[1].decks= [bonesDeckID, multiplicationDeckID];
    userSeeds[2].decks= [monkDeckID];
    await User.create(userSeeds);
    
    const usersTemp = await User.find();
    usersTemp.map((jsonData, index) =>{
      console.log(`${jsonData._id} ${jsonData.username} ${jsonData.email} ${jsonData.password} ${jsonData.decks}`);
    })
    console.log("DB seeded!!");

    const cards = await Card.find();
    cards.map((card, index) => console.log(card));
    process.exit(0);
  }catch(err){
    throw err;
  }
});