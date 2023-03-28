const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { createServer } = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
dotenv.config();

const http = createServer(app);

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

const io = socketio(http);


io.on('connection', (socket) => {
  console.log('새로운 소켓이 연결됐어요!');

  socket.on('createRoom', () => {
    const roomId = uuidv4(); // 새로운 룸 ID 생성
    console.log(roomId)
    socket.join(roomId); // 새로운 룸에 클라이언트 참여
    socket.emit('roomCreated', roomId); // 클라이언트에게 새로운 룸 ID 전송
    console.log(`새로운 룸이 생성됐어요! (ID: ${roomId})`);
  });

  socket.on('sendMessage', (msg) => {
    console.log('message: ' + msg);
    io.emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('소켓 연결이 끊어졌어요 :(');
  });
});

const server = http.listen(process.env.PORT, () =>
    console.log(`${process.env.PORT}번 포트가 열렸습니다.`)
);

module.exports = server;
