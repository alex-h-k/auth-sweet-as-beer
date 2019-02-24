const connection = require("./connection");
const { generateHash } = require("../auth/hash");
module.exports = { createUser, getUser };

function createUser({ username, password }, db = connection) {
  return generateHash(password).then(hash =>
    db("users").insert({ username, hash })
  );
}
function getUser(id, db = connection) {
  return db("users")
    .select()
    .where("id", id);
}
