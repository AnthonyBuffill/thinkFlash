const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
module.exports = {
  async createFlashCards(req, res){
    try{
      console.log(req.body);
      if(!req.body.title || !req.body.front || !req.body.back || !req.body.cardCount){
        return res.status(400).json({message: "missing info for deck creation."})
      }
      const systemMessage = `You are a teacher who makes flash card decks for students, you return flash cards with JSON parmeters (Front:string, back:string)`
      const userMessage = `Using '${req.body.front}' as a front side card example and '${req.body.back}' as back side card example.
Create for me ${req.body.cardCount} flash cards and return them
Make sure all cards fit under the classification of '${req.body.title}'.`;
      // const userMessage = ``;
      // const tools = [{
      //   "type":"function", 
      //   "function": {
      //     "name": "create_flashcard_deck",
      //     "description":"create a deck of flash cards based on the values given.",
      //     "parameters": {
      //       "type": "object",
      //       "properties": {
      //         // "cards": {
      //         //   "type":"object",
      //           "front": {"type":"string", "description": "The front side of the card"},
      //           "back": {"type":"string", "description": "The back side of the card"}
      //         // },
      //       },
      //       "required": ["front", "back"]
      //     },
      //   },
      // }];
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemMessage }, {role: "user", content: userMessage}],
        model: "gpt-3.5-turbo",
        response_format: {type: 'json_object'},
        seed:1,
        // tools:tools,
        // tool_choice:"auto",
      });
      console.log(completion);
      // console.log(completion.choices[0].message);
      try{
        const jObj = JSON.parse(completion.choices[0].message.content);
        console.log(jObj);
        return res.status(200).json(jObj);
      }catch(error){
        return res.status(255).json({message: "Could parse json"});
      }
      
    } catch (error){
      return res.status(500).json({messsage: error});
    }
  }
}