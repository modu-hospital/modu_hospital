const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { createServer } = require('http');
const path = require('path');

const app = express();
dotenv.config();

const http = createServer(app);

/* define router */
const router = require('./routes');
const ejsRouter = require('./routes/ejs.routes');
const errorHandler = require('./middleware/errorhandler')

/* router */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);


// app.get('/', (req, res) => {
//     res.send('hello node');
// });

/* ejs setting */
app.use(ejsRouter);

app.use(errorHandler);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/views')));

http.listen(process.env.PORT, () => console.log(`${process.env.PORT}번 포트가 열렸습니다.`));
