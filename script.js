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

function addMessage(text, className) {
  // Message
  const newMessage = document.createElement("div");
  newMessage.textContent = text;
  newMessage.classList.add("message", className);

  // Message Time
  const date = new Date();
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
  addMessage(message, "my-message");

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

  if (text.includes("привет")) {
    addMessage("Приветствую тебя, человек!", "their-message");
  } else if (text.includes("время")) {
    addMessage("Сейчас " + new Date().toLocaleTimeString(), "their-message");
  } else if (text === "пока") {
    addMessage("До свидания!", "their-message");
  } else {
    const answers = ["Привет!", "Как дела?", "Я просто бот", "Отстань"];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    addMessage(randomAnswer, "their-message");
  }
}

function showTyping() {
  const typingElement = document.createElement("div");
  typingElement.textContent = "печатает...";
  typingElement.classList.add("message", "their-message");

  messages.append(typingElement);
  messages.scrollTop = messages.scrollHeight;
  return typingElement;
}