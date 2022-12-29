const fs = require ("fs");
const express = require("express");
const { json } = require("body-parser");
const app = express ();
const PORT = process.env.PORT || 8080;


class Contenedor{

    constructor(nombreArchivo){
      this.nombreArchivo = nombreArchivo;
    }

     async save (object){ 
        try {
             const productos = await this.getAll();
             const id =  productos.length === 0 ? 1 : productos [productos.length-1].id+1
        
        object["id"] = id;
        productos.push(object)
        await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,3),"utf-8")
            return id;
        
    } catch (error) {
        console.log(error)}
        
    }

    async getById(id){
        try {
            const encontrado = await this.getAll();
             const idEncontrado = encontrado.find ((ProducEncontrado)=>ProducEncontrado.id ==id)
             if (idEncontrado) {
                return idEncontrado
                } else { return null}    
        } catch (error) {
            console.log(error)
             }
    }
    
     async getAll() {
        try{
            const file = await fs.promises.readFile(this.nombreArchivo, "utf-8")
            const files = JSON.parse(file);
            return files
            
        }catch (error){
            console.log(error)
             await  fs.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,3),"utf-8");
             return [];};
    }
}


const randomFunction = (limite) => {
     return parseInt(Math.random()*limite) +1
}


const Producto1 = new Contenedor ("./archivo.txt");
Producto1.getAll();


const cargarProductos = async () => {
       try {
        await Producto1.save({
 
            "title": "PlayStation",
            "price" : "10000",
            "thumbnail": "vacio"
        });
         await Producto1.save({
        
            "title": "PlayStation2",
            "price" : "15000",
            "thumbnail": "vacio"
        });
         await Producto1.save({
        
            "title": "PlayStation3",
            "price" : "20000",
            "thumbnail": "vacio"
        });
    
} catch (error) {
    console.log(error)}
}

// cargarProductos();
// Producto1.deleteAll()

app.get("/productos", (req,res) => {
    Producto1.getAll()
    .then(listaParse=>{
        res.json(listaParse)
    })
})

app.get("/productosRandom", (req,res)=>{
    Producto1.getAll()
    .then(lista => JSON.parse(lista))
    .then(listaParse => listaParse[randomFunction(listaParse.length)])
    .then(itemLista => res.json(itemLista))
    .catch(console.error(error));
})

const server = app.listen(PORT, () =>console.log (`El server esta escuchando en PUERTO ${PORT}` ));