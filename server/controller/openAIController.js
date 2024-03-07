const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env') });
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
module.exports = {
  async createFlashCards(req, res){
    try{
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices);
      console.log(completion.choices.length);
      for(let i = 0;i<completion.choices.length;i++){
        console.log(completion.choices[i]);
      }
      res.send(completion.choices[0]);
    } catch (error){
      res.status(500).json({messsage: error});
    }
  }
}