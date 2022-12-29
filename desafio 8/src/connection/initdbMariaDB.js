import {dbMariaDB} from './dbMariaDB.js'

dbMariaDB.schema.createTable('productos', table => {
	table.increments('id')
	table.string('producto')
	table.integer('precio')
	table.string('urlImagen')
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err); })
.finally(() => dbMariaDB.destroy())
