import express from "express";
import "dotenv/config";
import metrics from "./utils/metrics.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Server started at ${process.env.PORT}`);
});

try {
  const result = await metrics({
    transcript: "Um I built a frontend application using JavaScript and React",
    duration: 60,
  });
  console.log("from result:", result);
} catch (error) {
  console.log(error);
}
