DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS schools CASCADE;

DROP TABLE IF EXISTS subjects CASCADE;

DROP TABLE IF EXISTS users_subjects CASCADE;

DROP TABLE IF EXISTS units CASCADE;

DROP TABLE IF EXISTS standards CASCADE;

DROP TABLE IF EXISTS standards_sets CASCADE;

DROP TABLE IF EXISTS questions_schools CASCADE;

DROP TABLE IF EXISTS questions_subjects CASCADE;

DROP TABLE IF EXISTS questions CASCADE;

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

CREATE TABLE standards_sets (
    id serial PRIMARY KEY,
    source text NOT NULL,
    subject text NOT NULL,
    grade text NOT NULL
);

CREATE TABLE standards (
    id serial PRIMARY KEY,
    code text NOT NULL,
    description text NOT NULL,
    set_id integer NOT NULL REFERENCES standards_sets ON DELETE CASCADE
);

CREATE TABLE subjects (
    id serial PRIMARY KEY,
    name text NOT NULL,
    grade text NOT NULL,
    school_id integer NOT NULL REFERENCES schools ON DELETE CASCADE,
    set_id integer NOT NULL REFERENCES standards_sets ON DELETE CASCADE
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
    planning jsonb NOT NULL DEFAULT '{}'::jsonb,
    collaboration jsonb NOT NULL DEFAULT '{}'::jsonb,
    completed boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE questions (
    id serial PRIMARY KEY,
    text text NOT NULL
);

CREATE TABLE questions_subjects (
    id serial PRIMARY KEY,
    question_id integer NOT NULL REFERENCES questions ON DELETE CASCADE,
    subject_id integer NOT NULL REFERENCES subjects ON DELETE CASCADE
);

CREATE TABLE questions_schools (
    id serial PRIMARY KEY,
    question_id integer NOT NULL REFERENCES questions ON DELETE CASCADE,
    school_id integer NOT NULL REFERENCES schools ON DELETE CASCADE
);

INSERT INTO schools (name, district, state, jurisdiction_code)
    VALUES ('Cielo Azul', 'Rio Rancho', 'New Mexico', 'C558A97651934F3989D0D0A41196060C');

INSERT INTO users (email, PASSWORD, first_name, last_name, school_id, admin)
    VALUES ('teacher1@school.edu', '$2b$13$Ro0NvAv9zqoxkYG8ubn2j.jyO5OiT2RWuLa9qCMdIrdx0l2LLce.K', 'Carl', 'Smith', 1, FALSE), ('teacher2@school.edu', '$2b$13$jZFZifRPendj.gxvJeyZOevNoZ.O.z2qclvl18gMVXLImEl/ZgRAm', 'Kate', 'Wilkinson', 1, FALSE), ('teacher3@school.edu', '$2b$13$wNW9ZdwKLDxCRfMBbMHyo.giaRZX5V/69n1i6Pm5CxEpcvgb7hrKG', 'Julia', 'Packer', 1, FALSE), ('coach@school.edu', '$2b$13$1W83Qev/Il1Vis.80gRCpePuHj5fzLMmO7Pcsjxsltz6znQqci0Pm', 'Austin', 'Larkman', 1, TRUE), ('no1@school.edu', '$2b$13$1W83Qev/Il1Vis.80gRCpePuHj5fzLMmO7Pcsjxsltz6znQqci0Pm', 'No', 'One', 1, FALSE);

INSERT INTO standards_sets (source, subject, grade)
    VALUES ('Common Core', 'MATH', '5'), ('Common Core', 'ELA', '5'), ('NGSS', 'SCIENCE', '5'), ('Common Core', 'ELA', '3');

INSERT INTO subjects (name, grade, school_id, set_id)
    VALUES ('ELA', '5', 1, 2), ('MATH', '5', 1, 1), ('SCIENCE', '5', 1, 3), ('ELA', '3', 1, 4);

INSERT INTO users_subjects (user_id, subject_id)
    VALUES (1, 1), (2, 1), (1, 2), (2, 2), (1, 3), (2, 3), (3, 4), (4, 1), (4, 2), (4, 3), (4, 4);

INSERT INTO questions (text)
    VALUES ('What skills are the students excelling at?'), ('What skills are the students struggling with?'), ('What are our common instructional commitments?'), ('How will we extend based on mastery?'), ('How will we intervene for students who are below proficient?');

INSERT INTO questions_schools (question_id, school_id)
    VALUES (1,1), (2,1), (3,1), (4,1), (5,1);

INSERT INTO standards (code, description, set_id)
    VALUES ('CCSS.ELA-Literacy.L.5.5b',
  'Recognize and explain the meaning of common idioms, adages, and proverbs.',
  2),
('CCSS.ELA-Literacy.L.5.5a',
  'Interpret figurative language, including similes and metaphors, in context.',
  2),
('CCSS.ELA-Literacy.L.3.5b',
  'Identify real-life connections between words and their use (e.g., describe people who are friendly or helpful).',
  4),
('CCSS.ELA-Literacy.L.3.5a',
  'Distinguish the literal and nonliteral meanings of words and phrases in context (e.g., take steps).',
  4),
('CCSS.Math.Content.5.NF.B.7b',
  'Interpret division of a whole number by a unit fraction, and compute such quotients.',
  1),
('CCSS.Math.Content.5.NF.B.7a',
  'Interpret division of a unit fraction by a non-zero whole number, and compute such quotients.',
  1),
('5-PS2-1',
  'Support an argument that the gravitational force exerted by Earth on objects is directed down.',
  3),
('5-PS2',
  'Motion and Stability: Forces and Interactions',
  3)
