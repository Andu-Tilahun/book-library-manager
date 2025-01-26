ALTER TABLE books
ADD COLUMN created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN modified_date TIMESTAMP DEFAULT NULL,
ADD COLUMN created_by character varying COLLATE pg_catalog."default",
ADD COLUMN modified_by character varying COLLATE pg_catalog."default";
