import app from "./app.js";
import { config } from "./config/env.js";
import { connectDB, isDbConnected } from "./config/db.js";
import { initializeDatabase } from "./db/initDb.js";

async function startServer() {
  console.log("=========================================");
  console.log("   🚀 Launching The Master Academy UAE API  ");
  console.log("=========================================");

  // Attempt database connection
  const dbOk = await connectDB();
  if (dbOk) {
    await initializeDatabase();
  }

  const server = app.listen(config.port, () => {
    console.log(`🌐 Server running at: http://localhost:${config.port}`);
    console.log(`📡 Health Check:     http://localhost:${config.port}/api/health`);
    console.log(`📚 Courses API:      http://localhost:${config.port}/api/courses`);
    console.log(`📩 Contact API:      http://localhost:${config.port}/api/contact`);
    console.log(`🗄️  MySQL:            ${isDbConnected() ? "Connected & Synced" : "Pending (Fallback Active)"}`);
    console.log("=========================================");
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log("\n🛑 Shutting down gracefully...");
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

startServer().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
