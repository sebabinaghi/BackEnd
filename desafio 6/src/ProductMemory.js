class ProductMemory {
    constructor(){
        this.productos = []
    }

    getAll(){
        return this.productos
    }

    save (elementos){
         const id = this.productos.length +1 
        const newProducto = {...elementos,id}
        this.productos.push(newProducto);
         return elementos;
    }


    put(id,newProduct){
        const productosIndex = this.productos.findIndex((data)=>data.id ==id)
        
        this.productos[productosIndex]={
        ...this.productos[productosIndex],...newProduct}
         return this.productos[productosIndex]
    }

    getById(id) {
        return this.productos.find(data=>data.id == id) 
    }

    deleteById(id){
        this.productos.filter(producto=>producto.id != id)
    }


}




export {ProductMemory}