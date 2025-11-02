CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_code VARCHAR(255) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_icon VARCHAR(255) NULL,
  service_tarif BIGINT DEFAULT(0),
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
)