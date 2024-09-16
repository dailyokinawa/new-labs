const express = require("express");
const fs = require("fs").promises; // Используем промисы для работы с файлами

const app = express();

app.use(express.json());

app.get("/api/users", async (req, res) => {
    try {
        const content = await fs.readFile("users.json", "utf8");
        const users = JSON.parse(content);
        res.json({ success: true, message: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка чтения файла" });
    }
});

app.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const content = await fs.readFile("users.json", "utf8");
        const users = JSON.parse(content);
        
        const user = users.find(u => u.id == id);
        
        if (user) {
            res.json({ success: true, message: user });
        } else {
            res.status(404).json({ success: false, message: "Пользователь не найден" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка чтения файла" });
    }
});

app.post("/api/users", async (req, res) => {
    const { name, age } = req.body;

    if (name == null || age == null) {
        return res.status(400).json({ success: false, message: "Данные не заполнены" });
    }

    try {
        const data = await fs.readFile("users.json", "utf8");
        const users = JSON.parse(data);

        const id = Math.max(...users.map(o => o.id), 0) + 1; // Обновлено для обработки пустого массива
        const user = { id, name, age };

        users.push(user);
        await fs.writeFile("users.json", JSON.stringify(users));

        res.json({ success: true, message: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка записи файла" });
    }
});

app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ success: false, message: "Данные не заполнены" });
    }

    try {
        const data = await fs.readFile("users.json", "utf8");
        const users = JSON.parse(data);

        const index = users.findIndex(u => u.id == id);

        if (index > -1) {
            const user = users.splice(index, 1)[0];
            await fs.writeFile("users.json", JSON.stringify(users));
            res.json({ success: true, message: user });
        } else {
            res.status(404).json({ success: false, message: "Пользователь не найден" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка чтения файла" });
    }
});

app.put("/api/users", async (req, res) => {
    const { name, age, id } = req.body;

    if (name == null || age == null || id == null) {
        return res.status(400).json({ success: false, message: "Данные не заполнены" });
    }

    try {
        const data = await fs.readFile("users.json", "utf8");
        const users = JSON.parse(data);

        const user = users.find(u => u.id == id);

        if (user) {
            user.age = age;
            user.name = name;
            await fs.writeFile("users.json", JSON.stringify(users));
            res.json({ success: true, message: user });
        } else {
            res.status(404).json({ success: false, message: "Пользователь не найден" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка записи файла" });
    }
});

app.listen(3000, () => {
    console.log("Сервер ожидает подключения на http://localhost:3000");
});