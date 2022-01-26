DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  name TEXT,
  done BOOLEAN
);

INSERT INTO todos (name, done) VALUES ('Go out', false);
INSERT INTO todos (name, done) VALUES ('Do homework', false);
INSERT INTO todos (name, done) VALUES ('Go to the school', true);
INSERT INTO todos (name, done) VALUES ('Do food', false);
INSERT INTO todos (name, done) VALUES ('Wash dishes', false);