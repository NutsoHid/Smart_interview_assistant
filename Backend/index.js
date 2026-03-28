import express from "express";
import cors from "cors";
import "dotenv/config";

import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", interviewRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Smart Interview Assistant Backend Running!",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
// const test = async () => {
//   const result = await metrics({
//     transcript:
//       "I built a uhh React application using Node.js and MongoDB with JWT authentication",
//     duration: 25,
//   });

//   console.log(result);
// };

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
