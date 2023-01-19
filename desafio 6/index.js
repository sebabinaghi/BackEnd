import express from "express";
import dayjs from "dayjs";
import { routerViews } from "./routes/routerViews.js";
import { routerProductos } from "./routes/routerProductos.js";
import { ApiProductos } from "./src/ProductosApi.js"
import { Server as HttpServer } from "http"
import { Server as SocketIOServer} from "socket.io"


import handlebars from "express-handlebars";
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

httpServer.listen (PORT, ()=> console.log(`escuchando en puerto ${PORT}`)  )
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// const server = app.listen(PORT, () =>
//   console.log(`Server listening on PORT ${PORT}`)
// );

// server.on("error", (err) => console.log(`Error: ${err}`));
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.use (express.static("./public"))

io.on("connection",socket =>{
  SendAllProducts(socket)

  socket.on("nuevo producto" ,nuevoProducto =>{
    SaveProduct(nuevoProducto)
  })
  socket.on("chat:message", (data)=>{
    io.sockets.emit("chat:message", data)

  })
  console.log("new connection",socket.id)
})

const SendAllProducts =  async(socket)=> {
  const Allproducts = await ApiProductos.getAll()
  socket.emit ("all products", Allproducts)
}

const SaveProduct = async (nuevoProducto) =>{
  await  ApiProductos.save(nuevoProducto)
  const Allproducts = await ApiProductos.getAll()
  io.sockets.emit("all products", Allproducts)
}


app.set("view engine","hbs")
app.set("views","./views")



app.use("/api", routerViews)
app.use("/api/productos", routerProductos);