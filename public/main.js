document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(event) {
  event.preventDefault();

  const userInput = document.getElementById("userInput").value;
  const subject = document.getElementById("subject").value;
  const tone = document.getElementById("tone").value;
  const keywords = document.getElementById("keywords").value;
  const hashtags = document.getElementById("hashtags").value;

  fetchBotResponse(userInput, subject, tone, keywords, hashtags);
  document.getElementById("chatHistory").style.display = "block";

  document.getElementById("userInput").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("tone").value = "";
  document.getElementById("keywords").value = "";
  document.getElementById("hashtags").value = "";
}

async function fetchBotResponse(userInput, subject, tone, keywords, hashtags) {
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, subject, tone, keywords, hashtags }),
    });

    if (response.ok) {
      const { botResponse } = await response.json();
      addMessage("InstaScribe", botResponse, "bot-prompt");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function addMessage(speaker, text, className) {
  const message = document.createElement("p");
  message.textContent = `${speaker}: ${text}`;
  message.classList.add(className);
  const hr = document.createElement("hr");

  const chatHistoryElement = document.getElementById("chatHistory");
  chatHistoryElement.appendChild(message);
  chatHistoryElement.appendChild(hr);

  setTimeout(() => scrollToBottom("chatHistory"), 500);
}

function scrollToBottom(id) {
  const div = document.getElementById(id);
  div.scrollTop = div.scrollHeight;
}
