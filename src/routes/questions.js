const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const { isLoggedIn, isAuthenticated } = require("../middleware");
const { dbConfig } = require("../config");

// get all questions
// router.get("/", async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbConfig);
//     const [data] = await con.execute(`
//     SELECT *
//     FROM questions
//     LEFT JOIN comments
//     ON questions.id = comments.question_id
//     ORDER BY questions.id ASC
//     `);
//     res.send(data);
//     await con.end();
//   } catch (err) {
//     res.status(400).send({ err: "Error Get" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELECT *
    FROM questions
    WHERE questions.archived = 0
    `);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error Get" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELECT *
    FROM questions
    WHERE questions.id = 3
    `);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error Get" });
  }
});

// add question
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `
        INSERT INTO questions (user_id, title, content)
        VALUES (
            ${mysql.escape(req.params.user.id)},
            ${mysql.escape(req.body.title)},
            ${mysql.escape(req.body.content)}
        )
        `
    );
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error Post" });
  }
});

// update question
router.patch("/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
      UPDATE questions
      SET questions.title = '${req.body.title}', questions.content = '${req.body.content}', questions.edited = 1
      WHERE questions.id = ${req.params.id}
      AND questions.user_id = ${req.params.user.id};
    `);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: "Error Patch" });
  }
});

// delete question
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    UPDATE questions
    SET questions.archived = 1
    WHERE questions.id = ${req.params.id}
    AND questions.user_id = ${req.params.user.id}
    `);
    res.send(data);
    await con.end();
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Error Delete" });
  }
});

// router.delete("/:id", isLoggedIn, async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbConfig);
//     const [data] = await con.execute(`
//       DELETE FROM questions
//       WHERE questions.user_id = ${req.params.user.id}
//       AND questions.id = ${req.params.id}
//     `);
//     res.send(data);
//     await con.end();
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ err: "Error Delete" });
//   }
// });

module.exports = router;
