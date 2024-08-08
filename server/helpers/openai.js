const { OpenAI } = require('openai');
require('dotenv').config();

module.exports = async function openAI(data, emotion) {
  const openai = new OpenAI();

  let prompt = `im feeling ${emotion}, give me 4 anime recommendations based on ${data}. provide a complete synopsis. The response must be a JSON, the format example is like this:
  [
    {
      "mal_id": 1,
      "score": 9.4,
      "status": "",
      "title": ",
      "episodes": 20,
      "synopsis": "" 
    }
  ]
    
    The format above is just an example, the data that must be filled in is the data from the JSON that I provided.
    Please remove the backtick and string "json" from the response
  `

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [{ role: 'system', content: prompt }],
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
};
