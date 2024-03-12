const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const deckSchema= new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
});

const Deck = model('Deck', deckSchema);

module.exports = Deck;
