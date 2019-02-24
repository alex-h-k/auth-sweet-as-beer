const express = require("express");
const router = express.Router();
const db = require("../db/users");

router.post("/register", register);

function register(req, res) {
  console.log(req.body);
  const { username, password } = req.body;
  db.createUser({ username, password })
    .then(() => res.status(201).json({ ok: true }))
    //TODO: make sure username doesn't already exist
    //TODO: if not, hash the password and add the user to the database
    .catch(({ message }) => {
      if (MessageChannel.includes("UNIQUE ")) {
        return res.status(400).json({
          ok: false,
          message: "Username already exists."
        });
      }
      res.status(500).json({
        ok: false,
        message: "Something bad happened. We don't know why."
      });
    });
}

module.exports = router;
