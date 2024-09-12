const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');

// Данные для задач
let tasks = [];

// Главная страница с задачами
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Добавление новой задачи
app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push({ name: newTask, completed: false });
    }
    res.redirect('/');
});

// Удаление задачи
app.post('/delete-task/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.redirect('/');
});

// Завершение задачи
app.post('/complete-task/:index', (req, res) => {
    const index = req.params.index;
    tasks[index].completed = !tasks[index].completed;
    res.redirect('/');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`); // Исправлено здесь
});