import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import healthRoutes from "./routes/healthRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

// Security and Logging Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// CORS setup (supports Vite default localhost:5173 and configurable origin)
const allowedOrigins = [
  config.corsOrigin,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for local development
    },
    credentials: true,
  })
);

app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome route
app.get("/", (req, res) => {
  res.json({
    name: "The Master Academy API",
    status: "online",
    documentation: "/api/health",
    endpoints: {
      health: "/api/health",
      courses: "/api/courses",
      contact: "/api/contact",
      enrollments: "/api/enrollments",
      newsletter: "/api/newsletter",
      testimonials: "/api/testimonials",
    },
  });
});

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
