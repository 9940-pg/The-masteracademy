import { query, isDbConnected, inMemoryStore } from "../config/db.js";
import { initialTestimonials } from "../data/initialTestimonials.js";

/**
 * Create a new user testimonial with rating and contact details
 * POST /api/testimonials
 */
export async function createTestimonial(req, res, next) {
  try {
    const { name, email, phone, role, course, rating, comment } = req.body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Please enter your full name (at least 2 characters).",
      });
    }

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        error: "Email address is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const numericRating = parseInt(rating, 10);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        error: "Please provide a rating between 1 and 5 stars.",
      });
    }

    if (!comment || typeof comment !== "string" || comment.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: "Please share your testimonial comment (at least 5 characters).",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone?.trim() || null;
    const cleanRole = role?.trim() || "Learner / Graduate";
    const cleanCourse = course?.trim() || null;
    const cleanComment = comment.trim();

    if (isDbConnected()) {
      const sql = `
        INSERT INTO testimonials (name, email, phone, role, course, rating, comment, status, source)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', 'website_testimonial_form')
      `;
      const values = [
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanRole,
        cleanCourse,
        numericRating,
        cleanComment,
      ];

      const result = await query(sql, values);

      const savedTestimonial = {
        id: result.insertId,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        role: cleanRole,
        course: cleanCourse,
        rating: numericRating,
        comment: cleanComment,
        status: "approved",
        created_at: new Date().toISOString(),
      };

      return res.status(201).json({
        success: true,
        message: "Thank you for your valuable rating and feedback! Your testimonial has been saved successfully.",
        data: savedTestimonial,
      });
    } else {
      // In-memory fallback
      const savedTestimonial = {
        id: (inMemoryStore.testimonials?.length || 0) + 100,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        role: cleanRole,
        course: cleanCourse,
        rating: numericRating,
        comment: cleanComment,
        status: "approved",
        created_at: new Date().toISOString(),
      };

      if (!inMemoryStore.testimonials) {
        inMemoryStore.testimonials = [...initialTestimonials];
      }
      inMemoryStore.testimonials.unshift(savedTestimonial);

      return res.status(201).json({
        success: true,
        message: "Thank you for your valuable rating and feedback! Your testimonial has been saved.",
        data: savedTestimonial,
        mode: "in-memory (MySQL pending configuration)",
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Get all testimonials, supporting optional rating filter, sorting, and summary metrics
 * GET /api/testimonials
 */
export async function getTestimonials(req, res, next) {
  try {
    const { rating, sort = "newest", limit = 100 } = req.query;
    const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 200);

    if (isDbConnected()) {
      let sql = "SELECT * FROM testimonials WHERE status = 'approved'";
      const params = [];

      if (rating) {
        const ratingFilter = parseInt(rating, 10);
        if (!isNaN(ratingFilter) && ratingFilter >= 1 && ratingFilter <= 5) {
          sql += " AND rating = ?";
          params.push(ratingFilter);
        }
      }

      if (sort === "highest") {
        sql += " ORDER BY rating DESC, created_at DESC";
      } else if (sort === "lowest") {
        sql += " ORDER BY rating ASC, created_at DESC";
      } else {
        // default newest
        sql += " ORDER BY created_at DESC";
      }

      sql += " LIMIT ?";
      params.push(parsedLimit);

      const [reviewsResult, statsResult, distributionResult] = await Promise.all([
        query(sql, params),
        query("SELECT COUNT(*) as total, AVG(rating) as avg_rating FROM testimonials WHERE status = 'approved'"),
        query("SELECT rating, COUNT(*) as count FROM testimonials WHERE status = 'approved' GROUP BY rating"),
      ]);

      const totalCount = parseInt(statsResult.rows[0]?.total || 0, 10);
      const rawAvg = parseFloat(statsResult.rows[0]?.avg_rating || 5);
      const averageRating = Number(rawAvg.toFixed(1));

      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      distributionResult.rows.forEach((r) => {
        distribution[r.rating] = parseInt(r.count, 10);
      });

      return res.json({
        success: true,
        count: reviewsResult.rows.length,
        stats: {
          total: totalCount,
          averageRating,
          distribution,
        },
        data: reviewsResult.rows,
      });
    } else {
      // In-memory fallback
      let list = inMemoryStore.testimonials;
      if (!list || list.length === 0) {
        list = [...initialTestimonials];
        inMemoryStore.testimonials = list;
      }

      let filtered = [...list];
      if (rating) {
        const rVal = parseInt(rating, 10);
        filtered = filtered.filter((t) => t.rating === rVal);
      }

      if (sort === "highest") {
        filtered.sort((a, b) => b.rating - a.rating || new Date(b.created_at) - new Date(a.created_at));
      } else if (sort === "lowest") {
        filtered.sort((a, b) => a.rating - b.rating || new Date(b.created_at) - new Date(a.created_at));
      } else {
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }

      const total = list.length;
      const avg = total > 0 ? list.reduce((acc, cur) => acc + (cur.rating || 5), 0) / total : 5;
      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      list.forEach((t) => {
        const r = t.rating || 5;
        if (distribution[r] !== undefined) distribution[r]++;
      });

      return res.json({
        success: true,
        count: filtered.length,
        stats: {
          total,
          averageRating: Number(avg.toFixed(1)),
          distribution,
        },
        data: filtered.slice(0, parsedLimit),
        mode: "in-memory",
      });
    }
  } catch (err) {
    next(err);
  }
}
