CREATE TYPE role_value AS ENUM ('ADMIN', 'READER');
ALTER TABLE users
ADD COLUMN role role_value;
