const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const logOperation = (operation, data) => {
    const logEntry = `${new Date().toISOString()} - ${operation}: ${JSON.stringify(data)}\n`;
    fs.appendFile("logs.txt", logEntry, (err) => {
        if (err) {
            console.error("Ошибка записи лога:", err);
        }
    });
};

app.get("/api/users", (req, res) => {
    const content = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(content);
    res.json({ success: true, message: users });
});

app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const content = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(content);

    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            console.log("🚀 ~ app.get ~ user:", user);
            break;
        }
    }

    if (user) {
        res.json({ success: true, message: user });
    } else {
        res.status(404).json({ success: false, message: "" });
    }
});

app.post("/api/users", (req, res) => {
    const { name, age } = req.body;

    if (name == null || age == null) {
        return res.status(400).json({ success: false, message: "Данные не заполнены" });
    }

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    let user = { name, age };
    const id = Math.max.apply(Math, users.map((o) => o.id));
    user.id = id + 1;

    users.push(user);
    const newData = JSON.stringify(users);
    fs.writeFileSync("users.json", newData);

    logOperation("Добавление пользователя", user);
    
    res.json({ success: true, message: user });
});

app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    if (id == null || id == "") {
        return res.status(400).json({ success: false, message: "Данные не заполнены" });
    }

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    let index = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            index = i;
            break;
        }
    }

    if (index > -1) {
        const user = users.splice(index, 1)[0];
        const newData = JSON.stringify(users);
        fs.writeFileSync("users.json", newData);

        logOperation("Удаление пользователя", user);
        
        res.json({ success: true, message: user });
    } else {
        res.status(404).json({ success: false, message: "Ошибка записи" });
    }
});

app.put("/api/users", (req, res) => {
    const { name, age, id } = req.body;

    if (name == null || age == null || id == null) {
        return res.status(400).json({ success: false, message: "Данные не заполнены" });
    }

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    let user;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }

    if (user) {
        user.age = age;
        user.name = name;

        const newData = JSON.stringify(users);
        fs.writeFileSync("users.json", newData);

        logOperation("Изменение пользователя", user);
        
        res.json({ success: true, message: user });
    } else {
        res.status(404).json({ success: false, message: "Ошибка записи" });
    }
});

app.listen(3000, () => {
    console.log("Сервер ожидает подключения на http://localhost:3000");
});