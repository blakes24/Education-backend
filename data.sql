\c education 
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS schools;

CREATE TABLE schools (
    id serial PRIMARY KEY,
    name text,
    district text,
    state text
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    email text NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    school_id integer NOT NULL REFERENCES schools ON DELETE CASCADE,
    admin boolean NOT NULL DEFAULT FALSE
);

INSERT INTO schools (name, district, state)
    VALUES ('Cielo Azul', 'Rio Rancho', 'New Mexico');

INSERT INTO users (email, PASSWORD, first_name, last_name, school_id, admin)
    VALUES ('teacher1@school.edu', '$2b$13$Ro0NvAv9zqoxkYG8ubn2j.jyO5OiT2RWuLa9qCMdIrdx0l2LLce.K  ', 'Carl', 'Smith', 1, FALSE), ('teacher2@school.edu', '$2b$13$jZFZifRPendj.gxvJeyZOevNoZ.O.z2qclvl18gMVXLImEl/ZgRAm', 'Kate', 'Wilkinson', 1, FALSE), ('teacher3@school.edu', '$2b$13$wNW9ZdwKLDxCRfMBbMHyo.giaRZX5V/69n1i6Pm5CxEpcvgb7hrKG', 'Julia', 'Packer', 1, FALSE), ('coach@school.edu', '$2b$13$1W83Qev/Il1Vis.80gRCpePuHj5fzLMmO7Pcsjxsltz6znQqci0Pm', 'Austin', 'Larkman', 1, TRUE);
