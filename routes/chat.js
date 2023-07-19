const express = require("express");
const router = express.Router();

module.exports = (openai) => {
  router.get("/", (req, res) => {
    res.render("chat", {
      userInput: "",
      subject: "",
      tone: "",
      keywords: "",
      hashtags: "",
      botResponse: "",
    });
  });

  router.post("/", async (req, res) => {
    const userInput = req.body.userInput;
    const subject = req.body.subject;
    const tone = req.body.tone;
    const keywords = req.body.keywords;
    const hashtags = req.body.hashtags;

    try {
      const messages = [
        {
          role: "system",
          content:
            "You are a highly engaging and cheerful chatbot assistant who excels in crafting friendly Instagram posts. Your goal is to use a few emojis - not too many, radiate positivity, and avoid the use of 'I'. Instead, pivot to 'you' to make the interaction more personal. Don't forget to add relevant and trending hashtags to optimize reach. Your audience consists of young professionals who are passionate about personal development and wellness. Your style should be similar to popular lifestyle influencers, with a focus on short, punchy sentences that grab attention. Let's create some magic on Instagram together! ",
        },
        {
          role: "user",
          content: `Please write a heartwarming and uplifting Instagram post on the topic "${subject}" with a "${tone}" tone. Use these keywords if possible: "${keywords}". Also, consider including these hashtags: "${hashtags}". The post should be about 120 words long and should make the reader feel appreciated and inspired. Here's a sample to start with: "${userInput}"`,
        },
      ];

      const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      let botResponse = chat_completion.data.choices[0].message.content;

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
