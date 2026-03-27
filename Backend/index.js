import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Server started at ${process.env.PORT}`);
});
