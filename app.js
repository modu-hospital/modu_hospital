const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { createServer } = require('http');

const app = express();
dotenv.config();

const http = createServer(app);
const router = require('./routes');

const userRouter = require('./routes/user.routes');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('hello node');
});

http.listen(process.env.PORT, () => console.log(`${process.env.PORT}번 포트가 열렸습니다.`));
