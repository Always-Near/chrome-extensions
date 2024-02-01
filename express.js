#!/usr/bin/env node

import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  setTimeout(() => {
    res.send("time:" + Date.now());
  }, 35000);
});

app.listen(8080);
