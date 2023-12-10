const express = require('express');
const createError = require('http-errors');
require('express-async-errors');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
// const cors = require('cors');

const mongoose = require('mongoose');
dotenv.config();
require('./config/passport')(passport)
const { createServer } = require("http");

const Handlebars = require('handlebars')
const { engine } = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const authRouter = require('./routes/auth.route');
const chatRouter = require('./routes/chat.route');

const app = express();

var uri = 'mongodb://127.0.0.1:27017/ecommerce';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log('MongoDB connection established sucessfully');
})

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
// app.use(cors());

app.engine('handlebars', engine({
  layoutsDir: __dirname + '/views',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }))
const sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.redirect('/auth/login')
})
app.use('/auth', authRouter);
app.use('/chat', chatRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});

const httpServer = createServer(app);
const io = require("socket.io")(httpServer);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    console.log('authorized');
    next();
  } else {
    console.log('unauthorized');
    next(new Error('unauthorized'))
  }
});

const { sendMessage, disconnect, receiveMessage, updateClientID, sendUserList } = require('./controllers/chat.controller')

let userList = []

io.of('/').on('connection', socket => {
    try {
        updateClientID(io, socket)

        console.log(`Client connected with ID ${socket.id}`)

        let client

        if (socket.request.session.user) {
            client = {
                clientId: socket.id,
                username: socket.request.session.user.fullName,
                idUserDB: socket.request.session.user._id,
                avatar: socket.request.session.user.avatar
            }
        }

        sendUserList(socket, userList)
        socket.broadcast.emit('newUser', client)

        userList.push(client)
        console.log(userList)

        //sendMessage(io, socket)
        receiveMessage(io, socket)
        disconnect(userList, io, socket)
    }
    catch (err) {
        console.log(err.message)
    }
})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

httpServer.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`)
})