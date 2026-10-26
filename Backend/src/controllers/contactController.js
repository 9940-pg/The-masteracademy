import { query, isDbConnected, inMemoryStore } from "../config/db.js";

/**
 * Handle new contact inquiries
 * POST /api/contact
 */
export async function createContact(req, res, next) {
  try {
    const { name, email, phone, course, message, source = "website_contact_form" } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required fields.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    if (isDbConnected()) {
      const sql = `
        INSERT INTO contacts (name, email, phone, course, message, source)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [name.trim(), email.trim().toLowerCase(), phone?.trim() || null, course || null, message?.trim() || null, source];
      const result = await query(sql, values);

      const savedContact = {
        id: result.insertId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        course: course || null,
        message: message?.trim() || null,
        source,
        status: "new",
        created_at: new Date().toISOString(),
      };

      return res.status(201).json({
        success: true,
        message: "Thank you for reaching out to Master Academy! An admissions mentor will contact you soon.",
        data: savedContact,
      });
    } else {
      // In-memory fallback
      const newContact = {
        id: inMemoryStore.contacts.length + 1,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        course: course || null,
        message: message?.trim() || null,
        source,
        status: "new",
        created_at: new Date().toISOString(),
      };
      inMemoryStore.contacts.push(newContact);

      return res.status(201).json({
        success: true,
        message: "Thank you for reaching out to Master Academy! An admissions mentor will contact you soon.",
        data: newContact,
        mode: "in-memory (MySQL pending configuration)",
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Get all contact inquiries
 * GET /api/contact
 */
export async function getContacts(req, res, next) {
  try {
    if (isDbConnected()) {
      const result = await query("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100");
      return res.json({
        success: true,
        count: result.rows.length,
        data: result.rows,
      });
    } else {
      return res.json({
        success: true,
        count: inMemoryStore.contacts.length,
        data: [...inMemoryStore.contacts].reverse(),
        mode: "in-memory",
      });
    }
  } catch (err) {
    next(err);
  }
}
