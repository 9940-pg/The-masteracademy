import { query, isDbConnected, inMemoryStore } from "../config/db.js";

/**
 * Subscribe email to newsletter (UAE API)
 * POST /api/newsletter
 */
export async function subscribeNewsletter(req, res, next) {
  try {
    const { email, source = "uae_footer_newsletter" } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "البريد الإلكتروني حقل إلزامي.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
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
          message: "تم اشتراكك بنجاح في نشرة ذا ماستر أكاديمي الإمارات التكنولوجية!",
          data: { id: result.insertId, email: cleanEmail },
        });
      } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(200).json({
            success: true,
            message: "أنت مشترك بالفعل في نشرة ذا ماستر أكاديمي الإمارات!",
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
        message: "تم اشتراكك بنجاح في نشرة ذا ماستر أكاديمي الإمارات التكنولوجية!",
        data: { email: cleanEmail },
        mode: "in-memory",
      });
    }
  } catch (err) {
    next(err);
  }
}
