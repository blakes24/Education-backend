\c education 
DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS schools CASCADE;

DROP TABLE IF EXISTS subjects CASCADE;

DROP TABLE IF EXISTS users_subjects CASCADE;

DROP TABLE IF EXISTS units CASCADE;

CREATE TABLE schools (
    id serial PRIMARY KEY,
    name text NOT NULL,
    district text NOT NULL,
    state text NOT NULL,
    jurisdiction_code text
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

CREATE TABLE subjects (
    id serial PRIMARY KEY,
    name text NOT NULL,
    grade text NOT NULL,
    school_id integer NOT NULL REFERENCES schools ON DELETE CASCADE,
    standards_code text
);

CREATE TABLE users_subjects (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users ON DELETE CASCADE,
    subject_id integer NOT NULL REFERENCES subjects ON DELETE CASCADE
);

CREATE TABLE units (
    id serial PRIMARY KEY,
    subject_id integer NOT NULL REFERENCES subjects ON DELETE CASCADE,
    number integer NOT NULL,
    title text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    review_date date NOT NULL,
    details jsonb,
    completed boolean NOT NULL DEFAULT FALSE
);

INSERT INTO schools (name, district, state, jurisdiction_code)
    VALUES ('Cielo Azul', 'Rio Rancho', 'New Mexico', 'C558A97651934F3989D0D0A41196060C');

INSERT INTO users (email, PASSWORD, first_name, last_name, school_id, admin)
    VALUES ('teacher1@school.edu', '$2b$13$Ro0NvAv9zqoxkYG8ubn2j.jyO5OiT2RWuLa9qCMdIrdx0l2LLce.K', 'Carl', 'Smith', 1, FALSE), ('teacher2@school.edu', '$2b$13$jZFZifRPendj.gxvJeyZOevNoZ.O.z2qclvl18gMVXLImEl/ZgRAm', 'Kate', 'Wilkinson', 1, FALSE), ('teacher3@school.edu', '$2b$13$wNW9ZdwKLDxCRfMBbMHyo.giaRZX5V/69n1i6Pm5CxEpcvgb7hrKG', 'Julia', 'Packer', 1, FALSE), ('coach@school.edu', '$2b$13$1W83Qev/Il1Vis.80gRCpePuHj5fzLMmO7Pcsjxsltz6znQqci0Pm', 'Austin', 'Larkman', 1, TRUE);

INSERT INTO subjects (name, grade, school_id, standards_code)
    VALUES ('ELA', '5', 1, 'C558A97651934F3989D0D0A41196060C_D2554723_grade-05'), ('MATH', '5', 1, 'C558A97651934F3989D0D0A41196060C_D2554019_grade-05'), ('SCIENCE', '5', 1, 'C558A97651934F3989D0D0A41196060C_D1000119_grade-05'), ('ELA', '3', 1, 'C558A97651934F3989D0D0A41196060C_D2554723_grade-03');

INSERT INTO users_subjects (user_id, subject_id)
    VALUES (1, 1), (2, 1), (1, 2), (2, 2), (1, 3), (2, 3), (3, 4), (4, 1), (4, 2), (4, 3), (4, 4);
