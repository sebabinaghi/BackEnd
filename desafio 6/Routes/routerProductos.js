import { Router } from "express";
import { ApiProductos } from "../src/ProductosApi.js"; 


const routerProductos = Router();




routerProductos.get("/", (req,res) =>{
    const productos = ApiProductos.getAll()
    res.send(productos) 

} );


routerProductos.get('/:id', (req, res) => {
    const{id}=req.params
    const productId = ApiProductos.getById(id)
    if (productId) {
        res.json(productId)      
    } else {
        res.json({"error":"Producto no encontrado"});
    }
})



routerProductos.post("/", (req, res) => {
    const {title,price,thumbnail} =req.body
    if (title&&price&&thumbnail) {
        const producto = ApiProductos.save({title,price,thumbnail}) 
        res.send({ id:producto, "mensaje" : "se agrego el producto   " })
    } else {
        res.json({"mensaje" : "producto mal ingresado " })
    }
})


routerProductos.put('/:id', (req, res) => {
    const{id}=req.params
    const {title,price,thumbnail} =req.body
    if (title&&price&&thumbnail) {
        const producto = ApiProductos.put( id, {title,price,thumbnail}) 
        res.send({ id:producto, "mensaje" : "se cambio el producto " })
    } else {
        res.json({"mensaje" : "producto mal ingresado " })
    }
})

routerProductos.delete("/:id", (req,res)=> {
    const{id}=req.params
    const producto = ApiProductos.deleteById(id)
    if (!producto) {
        res.json(producto)      
    } else {
        res.json({"error":"Producto no encontrado"});
    }
})


export {routerProductos};