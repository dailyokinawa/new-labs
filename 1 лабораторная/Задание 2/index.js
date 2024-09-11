const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.send('Добро пожаловать на главную страницу!');
});

app.get('/blog', (req, res) => {
  res.render('blog');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});