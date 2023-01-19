import express  from "express"
import { Server as HttpServer } from "http"
import { Server as SocketIOServer} from "socket.io"
import handlebars, { engine } from "express-handlebars";


import { randomData } from "./faker.js";


const PORT = 8080;
const app = express();
const httpserver = new HttpServer(app);
const io = new SocketIOServer(httpserver);

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/api/products-test', (req, res) => {
    res.render('table');
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