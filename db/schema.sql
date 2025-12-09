-- Schema za D1 bazo podatkov
-- Pošlji te ukaze prek Cloudflare D1 konzole ali wrangler CLI

-- Tabela uporabnikov za avtentikacijo
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Tabela nepremičninskih oglasov
CREATE TABLE IF NOT EXISTS offers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  price INTEGER,
  area_m2 INTEGER,
  city TEXT,
  district TEXT,
  source TEXT,
  url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Ustvari indekse za hitrejše poizvedbe
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON offers(created_at);
CREATE INDEX IF NOT EXISTS idx_offers_city ON offers(city);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
