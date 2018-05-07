const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);

// const connectionString = 'postgres://localhost:5432/apateez';
const connectionString = 'postgres://postgres:postgres@database:5432/apateez'; //for docker
const postgresql = pgp(connectionString);

const findOneQuery = 'SELECT * FROM nearby WHERE place_id = $1';
const findOne = (id) => {
  return postgresql.any(findOneQuery, id)
};

// const findManyQuery = `select * FROM nearby WHERE place_id = ANY ('{$1,$2,$3,$4,$5,$6}'::int[]);`
const findManyQuery = `select * FROM nearby WHERE place_id IN ($1:list);`
const findMany = (ids) => {
  return postgresql.any(findManyQuery, [ids])
};

module.exports = {
  findOne: findOne,
  findMany: findMany
};
