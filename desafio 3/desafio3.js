const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;


class Contenedor {

    async getProductById(id) {
        try {
            const contenido = await this.getProducts();
            const findById = contenido.filter(data => data.id === id);
            return findById;
        } catch (e) {
            console.log("error en el getProductById " + e);
        }
    }

    async getProducts() {
        try {
            const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
            console.log(contenido);
            return JSON.parse(contenido);
        } catch (e) {
            console.log("error en el getProducts " + e);
        }
    }
    
 }

const contenedor = new Contenedor();


const server = app.listen(PORT, ()=>{
    try {
        console.log(`servidor iniciado en puerto: ${PORT}`);
    } catch (e) {
        console.log('Error iniciando Servidor' + e);
    }
})

app.get("/productos", (req, res) => {   
    contenedor.getProducts().then(productos => {
        res.send(productos)
    })
})

app.get("/productosRandom", (req, res) => {
    function randomIntervalo(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const randomId = randomIntervalo(1, 4)
    //console.log(randomId);
    contenedor.getProductById(randomId).then(producto => {
        res.send(producto)
    })
})




[
    {
      "title": "productoNuevo",
      "price": 453.12,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      "id": 2
    },
    {
      "title": "productoNuevo",
      "price": 453.12,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      "id": 4
    },
    {
      "title": "Globo Terráqueo",
      "price": 345.67,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      "id": 3
    },
    {
      "title": "Escuadra",
      "price": 123.45,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      "id": 1
    }
  ]