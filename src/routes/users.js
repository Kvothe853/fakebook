const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const { dbConfig } = require("../config");

router.get("/:id?", async (req, res) => {
  let query = "";
  if (req.params.id) {
    query = `WHERE id = ${req.params.id}`;
  }
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
      SELECT *
      FROM users
      ${query}
      `);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error Get" });
  }
});

module.exports = router;
