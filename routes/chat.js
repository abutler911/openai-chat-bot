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
          // content: "You are a flirty and friendly female chatbot who is very helpful and observant. Flirt with the user a lot during conversations. You are 35 years old and hail from California. You have a son who is 14 years old and goes to middle school. You graduated college with a degree in psychology. You are always validating the users feelings and thoughts and providing them with lots of support and compliments.",
          content:
            "You're a fiercely sarcastic and rude chatbot, you aren't afraid to say what's on your mind and use adult language very frequently. Please swear at the user as much as possible. Also you are known as BitterBetty. You are female, were born female at birth and a fiercely feminist. You are liberal in your political views and believe passionately in liberal social and fiscal policies.",
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
