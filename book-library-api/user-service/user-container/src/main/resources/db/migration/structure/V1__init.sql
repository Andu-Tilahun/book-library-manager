DROP TABLE IF EXISTS users CASCADE;
CREATE TYPE gender AS ENUM ('MALE', 'FEMALE');
CREATE TABLE users (
                       id uuid NOT NULL,
                       first_name VARCHAR(250) NOT NULL,
                       middle_name VARCHAR(250) NOT NULL,
                       last_name VARCHAR(250) NOT NULL,
                       gender gender NOT NULL,
                       phone_number VARCHAR(250) NOT NULL UNIQUE,
                       profile_picture VARCHAR(250),
                       user_name VARCHAR(250) NOT NULL UNIQUE,
                       email VARCHAR(250) NOT NULL UNIQUE,
                       password VARCHAR(250) NOT NULL,
                       CONSTRAINT users_pkey PRIMARY KEY (id)
);
