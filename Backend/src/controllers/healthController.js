import { isDbConnected } from "../config/db.js";
import { config } from "../config/env.js";

/**
 * Health check endpoint
 * GET /api/health
 */
export function getHealth(req, res) {
  res.json({
    status: "ok",
    service: "The Master Academy API",
    version: "1.0.0",
    environment: config.nodeEnv,
    database: {
      provider: "MySQL",
      status: isDbConnected() ? "connected" : "standalone_mode",
      note: isDbConnected()
        ? "Connected to live MySQL database"
        : "MySQL not connected yet. Running in safe mode with In-Memory store.",
    },
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
