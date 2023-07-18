document.getElementById("message-form").addEventListener("submit", sendMessage);

const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

chatHistory.forEach(({ speaker, text, className }) => {
  addMessage(speaker, text, className);
});

function sendMessage(event) {
  event.preventDefault();

  const userInput = document.getElementById("userInput").value;

  addMessage("You", userInput, "user-prompt");
  fetchBotResponse(userInput);

  document.getElementById("userInput").value = "";
}

async function fetchBotResponse(userInput) {
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    if (response.ok) {
      const { botResponse } = await response.json();
      addMessage("SassySage", botResponse, "bot-prompt");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function addMessage(speaker, text, className) {
  const message = document.createElement("p");
  message.textContent = `${speaker}: ${text}`;
  message.classList.add(className);

  const chatHistoryElement = document.getElementById("chatHistory");
  chatHistoryElement.appendChild(message);

  chatHistory.push({ speaker, text, className });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

  setTimeout(() => scrollToBottom("chatHistory"), 500);
}

function scrollToBottom(id) {
  const div = document.getElementById(id);
  div.scrollTop = div.scrollHeight;
}
