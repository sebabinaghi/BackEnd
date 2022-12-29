const express = require('express');
const { Router } = express();
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(PORT, () => {
    try {
        console.log(`Servidor iniciado en puerto: ${PORT}`);
    } catch (e) {
        console.log('Error iniciando Servidor' + e);
    }
})

app.use(express.static("public"));


app.use("/formularios",express.static(__dirname+"/public/index.html"))
console.log("link formulario: http://localhost:host:8080/index.html")


const productos = [];
const routerProductos = express.Router();
app.use('/productos', routerProductos);


routerProductos.get("/", (req, res) => {
    res.json({ productos });
})

routerProductos.get('/:id', (req, res) => {
    const productId = productos.filter(data => data.id === parseInt(req.params.id));
    if (productId.length > 0) {
        res.json(productId[0])      
    } else {
        res.json({"error" : "Producto no encontrado"});
    }
})

routerProductos.post("/", (req, res) => {
    const {title,price,thumbnail} =req.body
    if (title&&price&&thumbnail) {
        const id = productos.length +1
        const newProducto = {...req.body,id}
        productos.push(newProducto)
        // res.json(productos)
        res.json({"mensaje" : "Se agrego el producto con ID: " + newProducto.id })
    } else {
        res.json({"mensaje" : "Producto mal ingresado " })
    }
})

routerProductos.put('/:id', (req, res) => {
    const productId = productos.filter(data => data.id === parseInt(req.params.id));
    if (productId.length > 0) {
        productId[0].title = req.body.title;
        productId[0].price = req.body.price;
        productId[0].thumbnail = req.body.thumbnail;
        res.json(productId[0])      
    } else {
        res.json({"error":"Producto no encontrado"});
    }
})

routerProductos.delete('/:id', (req, res) => {
    const indiceDelete = productos.findIndex(data => data.id === parseInt(req.params.id));
    if (indiceDelete >= 0) {
        productos.splice(indiceDelete, 1);
        res.json({productos});
    }
})