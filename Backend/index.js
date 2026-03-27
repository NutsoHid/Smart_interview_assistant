import express from "express";
import "dotenv/config";
import questionGenerate from "./utils/questionGenerate.js";
import metrics from "./utils/metrics.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Server started at ${process.env.PORT}`);
});

const test = async () => {
  const result = await metrics({
    transcript:
      "I built a uhh React application using Node.js and MongoDB with JWT authentication",
    duration: 25,
  });

  console.log(result);
};

test();

// try {
//   const sampleData = `
//   My name is Prithivi.
//   I am doing well.
//   My main interests are AI, web development, and product design.
//   Currently I am building a chatbot project and learning backend systems.
//   `;

//   const result = await questionGenerate(sampleData);

//   console.log("Generated Question:");
//   console.log(result);
// } catch (error) {
//   console.log(error);
// }
