import express  from "express"
import { Server as HttpServer } from "http"
import { Server as SocketIOServer} from "socket.io"
import handlebars, { engine } from "express-handlebars";
import cookieParser from "cookie-parser"
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes/router.js";
const advancedOptions= { useNewUrlParser: true,useUnifieldTopology: true}


import { randomData } from "./faker.js";


const PORT = 8080;
const app = express();
const httpserver = new HttpServer(app);
const io = new SocketIOServer(httpserver);
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://Train:Patagonia2023@cluster0.ilcaprq.mongodb.net/?dbName=TestSessiones',
        advancedOptions,
        ttl:60,
        collectionName:"sessiones"
        
    }),
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge:600000}
}))


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

 httpserver.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.on('error', () => console.log(`Error: "error"));