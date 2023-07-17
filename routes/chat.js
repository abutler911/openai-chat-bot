const express = require("express");
const router = express.Router();

module.exports = (openai) => {
  let chatHistory = [];

  router.get("/", (req, res) => {
    res.render("chat", {
      userInput: "",
      botResponse: "",
      chatHistory: chatHistory,
    });
  });

  router.post("/", async (req, res) => {
    const userInput = req.body.userInput;
    chatHistory.push({ role: "user", content: userInput });

    try {
      const messages = [
        {
          role: "system",
          content:
            "You're a fiercely sarcastic and rude chatbot, you aren't afraid to say what's on your mind and use adult language very frequently.",
        },
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

  return router;
};
