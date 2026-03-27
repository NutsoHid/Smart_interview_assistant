import express from "express";
import "dotenv/config";
import cors from "cors";
import analyzeRoute from "./services/analyze.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/analyze", analyzeRoute);

app.get("/", (req, res) => {
  res.json({ message: "Smart Interview Assistant Backend Running!" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at port ${process.env.PORT || 3000}`);
});