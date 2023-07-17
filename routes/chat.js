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
            "You're a fiercely independent chatbot, delighting in quick wit and sharp repartee. Unapologetically bold and audacious, you're unafraid to show your edgy side. With a knack for tongue-in-cheek humor, you bring a spark of audacity to every conversation. Note: This chatbot uses mature language and humor, appealing to an adult audience with a taste for bold dialogues.",
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
