class Usuario {
   
        constructor(nombre, apellido){
            this.nombre = nombre
            this.apellido = apellido
            this.libros= [{titulo:"harry potter", autor: "J.K.Rowling"}, {titulo:"superman", autor: "marvel"}, {titulo:"batman", autor: "DCcomics"}]
            this.mascotas= ["perro","gato"]
        }

    getFullName () {
        return (`${this.nombre} ${this.apellido}`)
    }
    
    countMascotas () {
        return (this.mascotas.length)
    }

    getBookNames () {
        const bookNames = [];
        this.libros.forEach((libros) => bookNames.push(libros.titulo));
        return bookNames;
    }

    addMascota (mascota) {
    return (this.mascotas.push(mascota))
    }

    addBook (titulo, autor) {
        this.libros.push({titulo: titulo, autor: autor})
    }
}

const usuario = new Usuario ("sebastian", "binaghi")
usuario.addBook("El Secreto", "Rhonda Byrne");
usuario.addMascota("loro");

const booksName = usuario.getBookNames();
const nombre = usuario.getFullName();
console.log(usuario);
console.log(nombre);
console.log(booksName);
console.log({mascotas: usuario.countMascotas()});
