CREATE TABLE public."users"
(
    id serial NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."users"
    OWNER to postgres;