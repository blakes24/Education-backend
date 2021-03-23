\c education 
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS schools;

CREATE TABLE schools (
    id integer PRIMARY KEY,
    name text,
    district text,
    state text
);

CREATE TABLE users (
    email text PRIMARY KEY,
    password TEXT NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    school_id integer NOT NULL REFERENCES schools ON DELETE CASCADE,
    admin boolean NOT NULL DEFAULT FALSE
);

INSERT INTO schools (id, name, district, state)
    VALUES (1, 'Cielo Azul', 'Rio Rancho', 'New Mexico');

INSERT INTO users (email, PASSWORD, first_name, last_name, school_id, admin)
    VALUES ('teacher1@school.edu', 'teacher1pw', 'Carl', 'Smith', 1, FALSE), ('teacher2@school.edu', 'teacher2pw', 'Kate', 'Wilkinson', 1, FALSE), ('teacher3@school.edu', 'teacher3pw', 'Julia', 'Packer', 1, FALSE), ('coach@school.edu', 'coachpw', 'Austin', 'Larkman', 1, TRUE);

