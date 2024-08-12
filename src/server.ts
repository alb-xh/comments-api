import * as express from "express";

const app = express.default();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.send('Hello World!')
});