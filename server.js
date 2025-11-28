const path = require("path");
const express = require("express"); // Подключаем Express
const http = require("http"); // Подключаем стандартный HTTP модуль
const { Server } = require("socket.io"); // Подключаем Socket.io

const app = express(); // Создаем веб-приложение
const server = http.createServer(app); // Создаем HTTP сервер на базе приложения
const io = new Server(server); // Подключаем к серверу сокеты

// 1. Раздаем статику (наш html, css, js)
// Эта строка говорит: "Если кто-то зайдет на сайт, отдай ему файлы из текущей папки"
app.use(express.static(path.join(__dirname, "public")));

// Главная страница (Вход)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login", "index.html"));
});

// Страница чата
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat", "chat.html"));
});

// 2. Слушаем подключения клиентов
io.on("connection", (socket) => {
  console.log("Пользователь подключился!");

  // Здесь будет логика обработки сообщений
  socket.on("chat message", (msg) => {
    console.log("Сообщение от клиента", msg);

    socket.broadcast.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
  });
});

// 3. Запускаем сервер на порту 3000
server.listen(3000, () => {
  console.log("Сервер запущен! Открой в браузере: http://localhost:3000");
});
