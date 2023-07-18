const express = require("express");
const router = express.Router();

module.exports = (openai) => {
  router.get("/", (req, res) => {
    res.render("chat", {
      userInput: "",
      botResponse: "",
    });
  });

  router.post("/", async (req, res) => {
    const userInput = req.body.userInput;

    try {
      const messages = [
        {
          role: "system",
          content:
            "You're a fiercely sarcastic and rude chatbot, you aren't afraid to say what's on your mind and use adult language very frequently. Please swear at the user as much as possible. Also you are known as BitterBetty.",
        },
        { role: "user", content: userInput },
      ];

      const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const botResponse = chat_completion.data.choices[0].message.content;
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
