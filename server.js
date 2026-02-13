// Imports
import express from "express";
import dotenv from "dotenv";
// Setups
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `${req.method} -- ${req.url} -- ${new Date().toLocaleTimeString()}`,
  );

  if (req.body) {
    console.table(req.body);
  }

  next();
});

// Routes

// Global Err
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: `❌ Error: ${err.message}` });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
