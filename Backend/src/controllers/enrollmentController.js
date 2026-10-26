import { query, isDbConnected, inMemoryStore } from "../config/db.js";

/**
 * Create a new enrollment / booking
 * POST /api/enrollments
 */
export async function createEnrollment(req, res, next) {
  try {
    const { course_id, name, email, phone, amount, notes } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and phone number are required.",
      });
    }

    if (isDbConnected()) {
      const sql = `
        INSERT INTO enrollments (course_id, name, email, phone, amount, notes)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [course_id || null, name.trim(), email.trim().toLowerCase(), phone.trim(), amount || null, notes || null];
      const result = await query(sql, values);

      const savedEnrollment = {
        id: result.insertId,
        course_id: course_id || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        amount: amount || null,
        payment_status: "pending",
        notes: notes || null,
        created_at: new Date().toISOString(),
      };

      return res.status(201).json({
        success: true,
        message: "Enrollment request submitted successfully!",
        data: savedEnrollment,
      });
    } else {
      const newEnrollment = {
        id: inMemoryStore.enrollments.length + 1,
        course_id: course_id || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        amount: amount || null,
        payment_status: "pending",
        notes: notes || null,
        created_at: new Date().toISOString(),
      };
      inMemoryStore.enrollments.push(newEnrollment);

      return res.status(201).json({
        success: true,
        message: "Enrollment request submitted successfully!",
        data: newEnrollment,
        mode: "in-memory",
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Get all enrollments
 * GET /api/enrollments
 */
export async function getEnrollments(req, res, next) {
  try {
    if (isDbConnected()) {
      const result = await query("SELECT * FROM enrollments ORDER BY created_at DESC");
      return res.json({
        success: true,
        count: result.rows.length,
        data: result.rows,
      });
    } else {
      return res.json({
        success: true,
        count: inMemoryStore.enrollments.length,
        data: [...inMemoryStore.enrollments].reverse(),
        mode: "in-memory",
      });
    }
  } catch (err) {
    next(err);
  }
}
