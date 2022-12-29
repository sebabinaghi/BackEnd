const fs = require ("fs");

class Contenedor {

    constructor (nombreArchivo) {
      this.nombreArchivo = nombreArchivo;
    }

    async save (object){ 
        try {const productos = await this.getAll();
             const id =  productos.length === 0 ? 1 : productos [productos.length - 1].id + 1
         
        object["id"] = id;
        productos.push(object)
        await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,3),"utf-8")
            return id;
    } catch (error) {
        console.log(error)
    }
    }

    async getById(id){
        try {const encontrado = await this.getAll();
             const idEncontrado = encontrado.find ((ProductoEncontrado)=>ProductoEncontrado.id ==id)
             if (idEncontrado) {
                return idEncontrado
                } else { return null}    
        } catch (error) {
            console.log(error)
        }
    }
    
    async deleteById(id){
        try {const producto = await this.getAll();
            const productoEncontrado = producto.find((elemento)=> elemento.id == id)
            if (!productoEncontrado) 
            return "Producto no encontrado."

            const productoFiltrado = producto.filter(elemento => elemento.id !=id)
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productoFiltrado,null,3),"utf-8")
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([]))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try{const file = await fs.promises.readFile(this.nombreArchivo, "utf-8")
            const files = JSON.parse(file);
            return files
            
        }catch (error){
            console.log(error)
             await  fs.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,3),"utf-8");
             return [];};
    }
}

const Producto1 = new Contenedor ("./prueba.txt");
Producto1.getAll();
// Producto1.save({
//     "id":"1",
//     "title": "PlayStation 3",
//     "price" : "10000",
//     "thumbnail": "vacio"
// })


// Producto1.deleteAll()

// Archivo1.getAll()
// .then((data)=>console.log({data}))
// .catch((error)=>console.log({error}))
// Producto1.save({
    
// //     "title": "PlayStation 3",
//        "price" : "10000",
//        "thumbnail": "vacio"
// // })

// Producto1.deleteById(2)
// .then((data)=>console.log({data}))
// .catch((error)=>console.log({error}))

const cargarProductos = async () => {
    try {
        await Producto1.save({
            "title": "PlayStation 3",
            "price" : "10000",
            "thumbnail": "vacio"
        });
        await Producto1.save({
            "title": "PlayStation 4",
            "price" : "20000",
            "thumbnail": "vacio"
        });
        await Producto1.save({
            "title": "PlayStation 5",
            "price" : "30000",
            "thumbnail": "vacio"
        });

} catch (error) {
    console.log(error)
}
}

cargarProductos();
// Producto1.deleteAll()