import express  from "express"
import { Server as HttpServer } from "http"
import { Server as SocketIOServer} from "socket.io"
import handlebars, { engine } from "express-handlebars";
import cookieParser from "cookie-parser"
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes/router.js";
const advancedOptions= { useNewUrlParser: true,useUnifieldTopology: true}
import mongoose from "mongoose";
import passport from "passport";
// import {auth} from "./middlewares/index"
import { randomData } from "./faker.js";
// requiere ("./middlewares/auth")
// require("./middlewares/auth.js")
import  * as auth from "./middlewares/auth.js"

const PORT = 8081;
const app = express();
const httpserver = new HttpServer(app);
const io = new SocketIOServer(httpserver);
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 100000
    }
}));

// PASSPORT 
app.use(passport.initialize());
app.use(passport.session());


app.use(router)
app.use(express.static('views'));
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/api/products-test', (req, res) => {
    // res.render('table');
    res.render('form');
});

io.on('connection', async socket => {
    console.log('Conexión establecida');
    const data = randomData();
    io.sockets.emit('products', data);
    socket.on('product', async data => {
        io.sockets.emit('products', data);
    })
});

const server =  httpserver.listen(PORT,async() => {
    await mongoose.connect('mongodb+srv://Train:Patagonia2023@cluster0.ilcaprq.mongodb.net/');
    console.log(`Server running on port ${PORT}`)});
// server.on('error', () => console.log(`Error: "error"));

server.on('error', err => console.log(`Error: ${err}`));