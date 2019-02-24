const express = require("express");
const router = express.Router();
const db = require("../db/users");
const token = require("../auth/token");
const verifyJwt = require("express-jwt");

router.post("/register", register, token.issue);

function register(req, res, next) {
  console.log(req.body);
  const { username, password } = req.body;
  db.createUser({ username, password })
    .then(([id]) => {
      res.locals.userId = id;
      next();
    })
    // .then(() => res.status(201).json({ ok: true }))
    //TODO: make sure username doesn't already exist
    //TODO: if not, hash the password and add the user to the database
    .catch(({ message }) => {
      if (message.includes("UNIQUE ")) {
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

router.get("/user", verifyJwt({ secret: process.env.JWT_SECRET }), user);

function user(req, res) {
  db.getUser(req.user.id)
    .then(({ username }) =>
      res.json({
        ok: true,
        username
      })
    )
    .catch(() =>
      res.status(500).json({
        ok: false,
        message: "An error ocurred while retrieving your user profile."
      })
    );
}

module.exports = router;
