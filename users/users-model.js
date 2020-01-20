const bcrypt = require('bcryptjs');
const db = require('../data/db-config');

function find() {
  return db('users')
    .select('id', 'username')
};

function findBy(data) {
  return db('users')
    .where(data)
    .select('id', 'username', 'password')
};

async function add(user) {
  user.password = await bcrypt.hash(user.password, 15)

  const [id] = await db('users')
    .insert(user)

    return findById(id)
};

function findById(id) {
  return db('users')
    .where({ id })
    .first('id', 'username')
};

module.exports = {
  add,
  find,
  findBy,
  findById,
};