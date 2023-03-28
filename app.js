const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { createServer } = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
dotenv.config();

const http = createServer(app);
const io = socketio(http);
  
  io.on("connection", (socket) => {
    console.log("새로운 소켓이 연결됐어요!");

    socket.emit("RESERVATIONS", {
      relationship:"본인",
      name:'김크리스',
      phone: '010-1111-1111',
      reservationdate: '2023-03-30',
      reservationtime: '10:30 ~ 11:00'
    });
    
    socket.on('disconnect', () => {
      console.log("김아무개가 연결을 끊어버림")
    })
  
  });

/* define router */
const router = require('./routes');
const ejsRouter = require('./routes/ejs.routes');
const errorHandler = require('./middleware/errorhandler');

/* router */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

/* ejs setting */
app.use(ejsRouter);

app.use(errorHandler);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/views')));

const server = http.listen(process.env.PORT, () =>
    console.log(`${process.env.PORT}번 포트가 열렸습니다.`)
);

module.exports = server;
