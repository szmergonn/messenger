const form = document.querySelector("#chat-form");
const input = document.querySelector("#message-input");
const messages = document.querySelector("#messages");

form.addEventListener("submit", formSubmit);
input.addEventListener("keydown", inputKeys);

function formSubmit(evt) {
  evt.preventDefault();
  sendMessage();
}

function inputKeys(evt) {
  if (evt.key === "Enter" && evt.shiftKey) {
    return;
  } else if (evt.key === "Enter") {
    evt.preventDefault();
    sendMessage();
  }
}

// const messageData = {
//   text: "Привет!",
//   type: "their-message",
//   date: "2023-10-27T10:00:00.000Z", // Время в формате ISO
// };

function addMessage(messageData) {
  const text = messageData.text;
  const className = messageData.type;
  const date = new Date(messageData.date);

  // Message
  const newMessage = document.createElement("div");
  newMessage.textContent = text;
  newMessage.classList.add("message", className);

  // Message Time
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const messageTime = document.createElement("span");
  messageTime.textContent = formattedTime;
  messageTime.classList.add("time", className);

  newMessage.append(messageTime);
  messages.append(newMessage);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  let message = input.value.trim();
  if (message === "") {
    return;
  }

  const data = {
    text: input.value,
    type: "my-message",
    date: new Date(),
  };

  addMessage(data);

  input.value = "";
  input.focus();

  const typingElement = showTyping();
  setTimeout(() => {
    typingElement.remove();
    botResponse(message);
  }, 2000);
}

function botResponse(userText) {
  const text = userText.toLowerCase();
  let botText = "";

  if (text.includes("привет")) {
    botText = "Приветствую тебя, человек!";
  } else if (text.includes("время")) {
    botText = "Сейчас " + new Date().toLocaleTimeString();
  } else if (text === "пока") {
    botText = "До свидания!";
  } else {
    const answers = ["Привет!", "Как дела?", "Я просто бот", "Отстань"];
    botText = answers[Math.floor(Math.random() * answers.length)];
  }

  const botData = {
    text: botText,
    type: "their-message",
    date: new Date()
  }

  addMessage(botData)
}

function showTyping() {
  const typingElement = document.createElement("div");
  typingElement.textContent = "печатает...";
  typingElement.classList.add("message", "their-message");

  messages.append(typingElement);
  messages.scrollTop = messages.scrollHeight;
  return typingElement;
}
