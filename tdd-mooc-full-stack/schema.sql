BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  name TEXT,
  done BOOLEAN
);

COMMIT;