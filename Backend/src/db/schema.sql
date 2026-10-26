-- The Master Academy MySQL Database Schema

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

CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(100) PRIMARY KEY,
  category VARCHAR(50) NOT NULL, -- 'crash' or 'full'
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

CREATE TABLE IF NOT EXISTS subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(50) DEFAULT 'footer_newsletter',
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

