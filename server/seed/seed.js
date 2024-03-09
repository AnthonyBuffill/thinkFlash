const db = require('../config/connection');
const { User, Card, Deck } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');
const { bones, monk, multiplication} = require('./cardSeeds');

db.once('open', async () => {
  try {
    console.log(bones);
    const createdCards = await Card.insertMany(bones);
    const cardIds = createdCards.map(card=>card._id);
    cardIds.map((jsonData, index)=>{
      console.log(`${jsonData}`);
    });
    

    const newDeck = new Deck({cards: cardIds, title: "Monk Characters", description:"description"})
    await newDeck.save();
    
    await cleanDB('User', "users");
    await User.create(userSeeds);
    

    console.log('users Created');
    const usersTemp = await User.find();
    usersTemp.map((jsonData, index) =>{
      console.log(`${jsonData._id} ${jsonData.username} ${jsonData.email} ${jsonData.password}`);
    })
    console.log("User DB seeded!!");
    process.exit(0);
  }catch(err){
    throw err;
  }
});