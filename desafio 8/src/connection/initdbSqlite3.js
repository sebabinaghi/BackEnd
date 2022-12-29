import {dbSqlite3} from './dbSqlite3.js'

dbSqlite3.schema.createTable('messages', table => {
	table.increments('id')
	table.string('author')
	table.string('text')
	table.string('dateFormated')
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err); })
.finally(() => dbSqlite3.destroy())

/* {
    producto: "calculadora",
    precio : 500,
    urlImagen: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png"
  } */