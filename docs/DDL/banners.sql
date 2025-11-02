CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_name VARCHAR(255) NOT NULL,
  banner_image VARCHAR(255) NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
)