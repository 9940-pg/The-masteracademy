import { query, isDbConnected } from "../config/db.js";
import { initialCourses } from "../data/initialCourses.js";

function parseJsonFields(course) {
  if (!course) return course;
  const jsonKeys = ["learn", "projects", "who_should_join", "perks", "faqs"];
  const formatted = { ...course };
  for (const key of jsonKeys) {
    if (typeof formatted[key] === "string") {
      try {
        formatted[key] = JSON.parse(formatted[key]);
      } catch {
        // Leave as is if parse fails
      }
    }
  }
  return formatted;
}

/**
 * Get all courses, with optional category filter ('crash' or 'full')
 * GET /api/courses
 */
export async function getAllCourses(req, res, next) {
  try {
    const { category } = req.query;

    if (isDbConnected()) {
      let sql = "SELECT * FROM courses WHERE is_active = TRUE";
      const params = [];

      if (category) {
        sql += " AND category = ?";
        params.push(category.toLowerCase());
      }

      sql += " ORDER BY created_at ASC";
      const { rows } = await query(sql, params);
      const parsedRows = rows.map(parseJsonFields);

      return res.json({
        success: true,
        count: parsedRows.length,
        data: parsedRows,
      });
    } else {
      // In-memory fallback
      let filtered = initialCourses;
      if (category) {
        filtered = filtered.filter((c) => c.category === category.toLowerCase());
      }

      return res.json({
        success: true,
        count: filtered.length,
        data: filtered,
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Get course details by ID
 * GET /api/courses/:id
 */
export async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const { rows } = await query("SELECT * FROM courses WHERE id = ? AND is_active = TRUE", [id]);
      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: `Course with id '${id}' not found.`,
        });
      }
      return res.json({
        success: true,
        data: parseJsonFields(rows[0]),
      });
    } else {
      const course = initialCourses.find((c) => c.id === id);
      if (!course) {
        return res.status(404).json({
          success: false,
          error: `Course with id '${id}' not found.`,
        });
      }
      return res.json({
        success: true,
        data: course,
      });
    }
  } catch (err) {
    next(err);
  }
}
