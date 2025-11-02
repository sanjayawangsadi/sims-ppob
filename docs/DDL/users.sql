CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) unique NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255) NOT NULL,
  balance BIGINT DEFAULT(0),
  created_at timestamp NULL,
  updated_at timestamp NULL
)