import { query, isDbConnected, inMemoryStore } from "../config/db.js";

/**
 * Subscribe email to newsletter
 * POST /api/newsletter
 */
export async function subscribeNewsletter(req, res, next) {
  try {
    const { email, source = "footer_newsletter" } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (isDbConnected()) {
      try {
        const sql = `
          INSERT IGNORE INTO subscribers (email, source)
          VALUES (?, ?)
        `;
        const result = await query(sql, [cleanEmail, source]);
        return res.status(201).json({
          success: true,
          message: "You have been successfully subscribed to Master Academy updates!",
          data: { id: result.insertId, email: cleanEmail },
        });
      } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(200).json({
            success: true,
            message: "You are already subscribed to Master Academy updates!",
          });
        }
        throw err;
      }
    } else {
      const exists = inMemoryStore.subscribers.some((s) => s.email === cleanEmail);
      if (!exists) {
        inMemoryStore.subscribers.push({
          id: inMemoryStore.subscribers.length + 1,
          email: cleanEmail,
          source,
          subscribed_at: new Date().toISOString(),
        });
      }

      return res.status(201).json({
        success: true,
        message: "You have been successfully subscribed to Master Academy updates!",
        data: { email: cleanEmail },
        mode: "in-memory",
      });
    }
  } catch (err) {
    next(err);
  }
}
