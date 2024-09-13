const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');

let tasks = [];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push({ name: newTask, completed: false });
    }
    res.redirect('/');
});

app.post('/delete-task/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.redirect('/');
});

app.post('/complete-task/:index', (req, res) => {
    const index = req.params.index;
    tasks[index].completed = !tasks[index].completed;
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});