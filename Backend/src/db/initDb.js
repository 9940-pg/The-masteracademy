import { query, isDbConnected } from "../config/db.js";
import { initialCourses } from "../data/initialCourses.js";
import { initialTestimonials } from "../data/initialTestimonials.js";

export async function initializeDatabase() {
  if (!isDbConnected()) {
    console.log("ℹ️  Skipping MySQL schema sync (DB is offline/standalone mode).");
    return;
  }

  try {
    console.log("🔄 Verifying MySQL tables...");

    // Create contacts table
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        course VARCHAR(255),
        message TEXT,
        source VARCHAR(50) DEFAULT 'website_contact_form',
        status VARCHAR(50) DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_contacts_email (email),
        INDEX idx_contacts_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Create courses table
    await query(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(100) PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        tag VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        date VARCHAR(150),
        time VARCHAR(100),
        classes VARCHAR(100),
        duration VARCHAR(100),
        mode VARCHAR(100),
        level VARCHAR(100),
        price VARCHAR(50),
        price_note VARCHAR(100),
        price_number DECIMAL(10, 2),
        overview TEXT,
        learn JSON,
        projects JSON,
        who_should_join JSON,
        perks JSON,
        faqs JSON,
        is_active BOOLEAN DEFAULT TRUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_courses_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Create enrollments table
    await query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        amount DECIMAL(10, 2),
        payment_status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_enrollments_email (email),
        CONSTRAINT fk_enrollments_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Create subscribers table
    await query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        source VARCHAR(50) DEFAULT 'footer_newsletter',
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Create testimonials table
    await query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(150),
        course VARCHAR(255),
        rating TINYINT NOT NULL DEFAULT 5,
        comment TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'approved',
        source VARCHAR(50) DEFAULT 'website_testimonial_form',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_testimonials_rating (rating),
        INDEX idx_testimonials_created_at (created_at),
        INDEX idx_testimonials_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("✅ MySQL tables verified/created successfully.");

    // Check if courses need to be seeded
    const { rows } = await query("SELECT COUNT(*) as count FROM courses");
    const count = parseInt(rows[0]?.count || 0, 10);

    if (count === 0) {
      console.log("🌱 Seeding initial courses into MySQL...");
      for (const course of initialCourses) {
        await query(
          `INSERT INTO courses (
            id, category, tag, title, date, time, classes, duration, mode,
            level, price, price_note, price_number, overview, learn, projects,
            who_should_join, perks, faqs
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE title = VALUES(title)`,
          [
            course.id,
            course.category,
            course.tag,
            course.title,
            course.date,
            course.time,
            course.classes,
            course.duration,
            course.mode,
            course.level,
            course.price,
            course.price_note,
            course.price_number,
            course.overview,
            JSON.stringify(course.learn),
            JSON.stringify(course.projects),
            JSON.stringify(course.who_should_join),
            JSON.stringify(course.perks),
            JSON.stringify(course.faqs),
          ]
        );
      }
      console.log(`✅ Seeded ${initialCourses.length} courses into MySQL.`);
    }

    // Check if testimonials need to be seeded
    const { rows: testRows } = await query("SELECT COUNT(*) as count FROM testimonials");
    const testCount = parseInt(testRows[0]?.count || 0, 10);

    if (testCount === 0) {
      console.log("🌱 Seeding initial testimonials into MySQL...");
      for (const item of initialTestimonials) {
        await query(
          `INSERT INTO testimonials (
            name, email, phone, role, course, rating, comment, status, source, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.name,
            item.email,
            item.phone,
            item.role,
            item.course,
            item.rating,
            item.comment,
            item.status,
            item.source,
            item.created_at,
          ]
        );
      }
      console.log(`✅ Seeded ${initialTestimonials.length} testimonials into MySQL.`);
    }
  } catch (err) {
    console.error("❌ Failed to initialize MySQL database tables:", err.message);
  }
}

