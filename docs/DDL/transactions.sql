CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(255) unique NOT NULL,
  user_id UUID NOT NULL,
  service_id UUID NULL,
  transaction_type VARCHAR NOT NULL,
  total_amount BIGINT DEFAULT(0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL 
)