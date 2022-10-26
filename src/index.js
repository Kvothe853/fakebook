const express = require("express");
const cors = require("cors");

const { port, dbConfig } = require("./config");
const { auth } = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth/", auth);

app.get("/", (req, res) => {
  res.send({ msg: "Server is running" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
