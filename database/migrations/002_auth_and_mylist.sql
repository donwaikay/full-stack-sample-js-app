-- Adds password auth fields to app_users and a per-user saved-titles list.
-- Title data itself is a static catalog shipped with the frontend/functions,
-- so my_list only stores the numeric title id, not a foreign key to a titles table.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE app_users
  ADD COLUMN IF NOT EXISTS password_hash TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS display_name VARCHAR(120) NOT NULL DEFAULT '';

ALTER TABLE app_users ALTER COLUMN password_hash DROP DEFAULT;
ALTER TABLE app_users ALTER COLUMN display_name DROP DEFAULT;

ALTER TABLE app_users ALTER COLUMN id SET DEFAULT gen_random_uuid();

CREATE TABLE IF NOT EXISTS my_list (
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  title_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, title_id)
);
