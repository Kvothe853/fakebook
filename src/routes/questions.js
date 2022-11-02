const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const { isLoggedIn } = require("../middleware");
const { dbConfig } = require("../config");

// get all questions
// main

// SELECT *
// FROM questions
// WHERE questions.archived = 0
// ORDER BY questions.date ${order}

router.get("/:sort?", async (req, res) => {
  let order = "DESC";
  let query = ``;

  if (req.params.sort === "DESC" || req.params.sort === "ASC") {
    order = req.params.sort;
    query = `
    SELECT questions.*, (SELECT COUNT(*) FROM comments c WHERE c.question_id = questions.id AND c.archived = 0) AS total_question_comments
    FROM questions
    WHERE questions.archived = 0
    ORDER BY questions.date ${order}
    `;
  } else if (req.params.sort === "MOST") {
    order = "DESC";
    query = `
    SELECT questions.*, (SELECT COUNT(*) FROM comments c WHERE c.question_id = questions.id AND c.archived = 0) AS total_question_comments
    FROM questions
    WHERE questions.archived = 0
    ORDER BY total_question_comments ${order}
    
    `;
  } else if (req.params.sort === "LEAST") {
    order = "ASC";
    query = `
    SELECT questions.*, (SELECT COUNT(*) FROM comments c WHERE c.question_id = questions.id AND c.archived = 0) AS total_question_comments
    FROM questions
    WHERE questions.archived = 0
    ORDER BY total_question_comments ${order}
    `;
  }

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    ${query}
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

module.exports = router;
