const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const { dbConfig } = require("../config");

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
      SELECT *
      FROM users
      `);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error Get" });
  }
});

module.exports = router;
