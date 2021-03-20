\c education 

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE
    
);

INSERT INTO users (username, password, first_name, last_name, email, admin)
VALUES ('testuser',
        'tester1pw',
        'Test',
        'User',
        'testuser@email.com',
        FALSE),
       ('testadmin',
        'adminpw',
        'Test',
        'Admin!',
        'admin@email.com',
        TRUE);

