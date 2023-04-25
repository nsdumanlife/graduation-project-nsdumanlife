require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

module.exports = async function ({ name, location }) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Create a description for a bungalov named "${name}" located in "${location}".\n\nDescription:`,
    temperature: 0.2,
    max_tokens: 60,
  })
  return response.data?.choices[0]?.text || ''
}
