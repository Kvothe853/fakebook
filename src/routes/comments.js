const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const { isLoggedIn } = require("../middleware");
const { dbConfig } = require("../config");

// get all question comments
router.get("/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELECT * 
    FROM comments
    WHERE question_id = ${req.params.id}
    `);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error POST" });
  }
});

// add comment
router.post("/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        INSERT INTO comments (user_id, question_id, comment)
        VALUES (
            ${mysql.escape(req.params.user.id)},
            ${mysql.escape(req.params.id)},
            ${mysql.escape(req.body.comment)}
        )
    `);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error POST" });
  }
});

// update question
router.patch("/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        UPDATE comments
        SET comments.comment = '${req.body.comment}', comments.edited = 1
        WHERE comments.id = ${mysql.escape(req.params.id)}
        AND comments.user_id = ${mysql.escape(req.params.user.id)}
    `);
    res.send(data);
    await con.end();
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Error PATCH" });
  }
});

// delete comment
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        DELETE FROM comments 
        WHERE comments.user_id = ${req.params.user.id} 
        AND comments.id = ${req.params.id}
      `);
    res.send(data);
    await con.end();
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Error Delete" });
  }
});

module.exports = router;
