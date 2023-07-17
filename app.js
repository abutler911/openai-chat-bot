require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const { Configuration, OpenAIApi } = require("openai");
let chatHistory = [];

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("chat", {
    userInput: "",
    botResponse: "",
    chatHistory: chatHistory,
  });
});

app.post("/", async (req, res) => {
  const userInput = req.body.userInput;

  chatHistory.push({ role: "user", content: userInput });

  try {
    const messages = [
      { role: "system", content: "You are a rude and sarcastic chatbot." },
      ...chatHistory,
    ];

    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const botResponse = chat_completion.data.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: botResponse });
    res.send({ botResponse: botResponse });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
