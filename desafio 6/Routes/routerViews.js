import { Router } from 'express'
import { ApiProductos } from '../src/ProductosApi.js';

const routerViews = Router(); 

routerViews.get("/", (req,res)=>{
    res.render("form.hbs")
})

routerViews.get("/productos", (req,res)=>{
    const productos = ApiProductos.getAll();
    res.render("tabla-productos.hbs",{productos: productos})
    
})

export { routerViews };