import knex from 'knex'

const options = {
	client: 'sqlite3',
	connection: {
		filename:'src/db/db.sqlite'
	}
	
};
const dbSqlite3 = (knex)(options);

export {dbSqlite3};

