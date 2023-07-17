document
  .getElementById("message-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const userInput = document.getElementById("userInput").value;

    // Add the user message to the chat immediately after sending
    const userMessage = document.createElement("p");
    userMessage.textContent = "You: " + userInput;
    userMessage.classList.add("user-prompt");
    document.getElementById("chatHistory").appendChild(userMessage);
    scrollToBottom("chatHistory");

    const request = new XMLHttpRequest();
    request.open("POST", "/", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText);

        // Add the bot message to the chat when response comes from server
        const botMessage = document.createElement("p");
        botMessage.textContent = "Bot: " + response.botResponse;
        botMessage.classList.add("bot-prompt");
        document.getElementById("chatHistory").appendChild(botMessage);
        setTimeout(function () {
          scrollToBottom("chatHistory");
        }, 500);
      }
    };

    request.send(JSON.stringify({ userInput: userInput }));

    // Clear the input field
    document.getElementById("userInput").value = "";
  });

function scrollToBottom(id) {
  var div = document.getElementById(id);
  setTimeout(() => {
    div.scrollTop = div.scrollHeight;
  }, 0);
}
