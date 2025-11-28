const socket = io();

const form = document.querySelector("#chat-form");
const input = document.querySelector("#message-input");
const messages = document.querySelector("#messages");

form.addEventListener("submit", formSubmit);
input.addEventListener("keydown", inputKeys);

socket.on("chat message", (serverData) => {
  // serverData пришел как { text: "...", type: "my-message" }
  //принудительно меняем type на their-message

  const incomingMessage = {
    text: serverData.text,
    date: serverData.date,
    type: "their-message",
  };

  addMessage(incomingMessage);
});

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
  socket.emit("chat message", data);

  input.value = "";
  input.focus();
}
