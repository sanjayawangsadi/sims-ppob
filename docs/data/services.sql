INSERT INTO services (service_code, service_name, service_icon, service_tarif, created_at)
VALUES
  ('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, NOW()),
  ('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000, NOW()),
  ('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000, NOW()),
  ('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000, NOW()),
  ('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, NOW()),
  ('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, NOW()),
  ('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, NOW()),
  ('PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000, NOW()),
  ('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, NOW()),
  ('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000, NOW()),
  ('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000, NOW()),
  ('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000, NOW())
RETURNING id, service_code, service_name, service_tarif, created_at;
