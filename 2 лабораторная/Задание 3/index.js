const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/api/users", (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ success: false, message: "Данные не заполнены" });
    }

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    // Проверка уникальности имени
    const nameExists = users.some(user => user.name === name);
    if (nameExists) {
        return res.status(400).json({ success: false, message: "Имя пользователя уже существует" });
    }

    // Создание нового пользователя
    const newUser = {
        id: users.length + 1, // Простой способ создать уникальный ID
        name,
        age
    };

    users.push(newUser);

    // Сохранение обновленного массива пользователей в файл
    fs.writeFileSync("users.json", JSON.stringify(users));

    res.status(201).json({ success: true, message: newUser });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});