const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const authRoutes = require("./routes/auth");

server.use(bodyParser.json());
server.use(express.json());
server.use(express.static(path.join(__dirname, "../public")));
server.use("/api/v1/auth", authRoutes);

module.exports = server;
