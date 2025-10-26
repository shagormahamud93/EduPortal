import { errorHandler } from "./app/middleware/error.middleware";
import express, { Request, Response } from "express";
import router from "./app/routes";
import cors from "cors";
import path from "path";

const app = express();

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); 

// Configure CORS properly BEFORE routes
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow REST tools like Postman
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/v1", router);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Error middleware
app.use(errorHandler);

export default app;