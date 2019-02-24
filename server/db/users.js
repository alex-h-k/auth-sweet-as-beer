const connection = require("./connection");

module.exports = { createUser };

function createUser({ username, password }, db = connection) {
  return db("users").insert({ username, hash: password });
}
