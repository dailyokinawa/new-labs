const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { message: null, isSuccess: null });
});

app.post('/send-feedback', (req, res) => {
    const { name, email, subject, message, type, newsletter } = req.body;

    const isSuccess = true;
    const responseMessage = isSuccess ? 'Сообщение успешно отправлено!' : 'Произошла ошибка при отправке сообщения.';

    res.render('index', { message: responseMessage, isSuccess });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});