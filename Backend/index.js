import express from "express";
import cors from "cors";
import "dotenv/config";

// Existing modules
import interviewRoutes from "./routes/interviewRoutes.js";

// 👇 Add your analyze route
import analyzeRoute from "./services/analyze.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", interviewRoutes);     // existing routes
app.use("/analyze", analyzeRoute);    // ✅ FIXED: your analyze endpoint

// Root route (health check)
app.get("/", (req, res) => {
  res.json({ message: "Smart Interview Assistant Backend Running!" });
});

// Debug fallback (VERY useful for 404)
app.use((req, res) => {
  console.log(" Unknown route:", req.method, req.url);
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server started at ${PORT}`);
});

// const test = async () => {
//   const result = await metrics({
//     transcript:
//       "I built a uhh React application using Node.js and MongoDB with JWT authentication",
//     duration: 25,
//   });

//   console.log(result);
// };

// test();

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
