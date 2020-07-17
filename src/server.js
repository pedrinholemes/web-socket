const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const morgan = require('morgan');
var users = []
var texts = []
var screens = []
app.use(require('express').static('public'))
app.use(morgan('dev'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('newConnection', socket)
    console.log(' ');
    socket.on('present', (data) => {
        if (data.type == 'brodcasting') {
            screens.push(data)
            console.log('Screen: ' + data.name);
        } else if (data.type == 'controller') {
            users.push(data)
            console.log('User: ' + data.name);
        }
        io.emit('received', { users, screens });
    });
    socket.on('show', (text) => {
        console.log('Show Text: ' + text);
        socket.broadcast.emit('showText', text);
    });
    socket.on('disconnect', (data) => {
        socket.broadcast.emit('disconnect', data)
        console.log(`user disconnected`);
    });
});

http.listen(3000);