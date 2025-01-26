DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
                       id uuid NOT NULL,
                       title VARCHAR(250) NOT NULL,
                       author VARCHAR(250) NOT NULL,
                       isbn VARCHAR(250) NOT NULL UNIQUE,
                       publisher VARCHAR(250),
                       CONSTRAINT books_pkey PRIMARY KEY (id)
);
