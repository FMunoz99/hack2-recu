--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: coordinate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coordinate (
    id bigint NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL
);


ALTER TABLE public.coordinate OWNER TO postgres;

--
-- Name: coordinate_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coordinate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coordinate_id_seq OWNER TO postgres;

--
-- Name: coordinate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coordinate_id_seq OWNED BY public.coordinate.id;


--
-- Name: driver; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driver (
    category smallint NOT NULL,
    hex_adress character varying(255),
    id bigint NOT NULL,
    vehicle_id bigint NOT NULL,
    CONSTRAINT driver_category_check CHECK (((category >= 0) AND (category <= 2)))
);


ALTER TABLE public.driver OWNER TO postgres;

--
-- Name: passenger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.passenger (
    id bigint NOT NULL
);


ALTER TABLE public.passenger OWNER TO postgres;

--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id bigint NOT NULL,
    comment character varying(255),
    rating integer NOT NULL,
    author_id bigint,
    ride_id bigint,
    target_id bigint,
    CONSTRAINT review_rating_check CHECK (((rating <= 5) AND (rating >= 0)))
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_id_seq OWNER TO postgres;

--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- Name: ride; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ride (
    id bigint NOT NULL,
    arrival_date timestamp(6) without time zone,
    departure_date timestamp(6) without time zone,
    destination_name character varying(255) NOT NULL,
    origin_name character varying(255) NOT NULL,
    price double precision NOT NULL,
    status smallint NOT NULL,
    destination_coordinates_id bigint,
    driver_id bigint,
    origin_coordinates_id bigint,
    passenger_id bigint,
    CONSTRAINT ride_status_check CHECK (((status >= 0) AND (status <= 4)))
);


ALTER TABLE public.ride OWNER TO postgres;

--
-- Name: ride_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ride_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ride_id_seq OWNER TO postgres;

--
-- Name: ride_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ride_id_seq OWNED BY public.ride.id;


--
-- Name: user_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_location (
    description character varying(255) NOT NULL,
    passenger_id bigint NOT NULL,
    coordinate_id bigint NOT NULL
);


ALTER TABLE public.user_location OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    avg_rating double precision DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    role smallint NOT NULL,
    trips integer DEFAULT 0,
    updated_at timestamp(6) with time zone,
    CONSTRAINT users_role_check CHECK (((role >= 0) AND (role <= 2)))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_seq OWNER TO postgres;

--
-- Name: vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle (
    id bigint NOT NULL,
    brand character varying(255) NOT NULL,
    capacity integer NOT NULL,
    fabrication_year integer NOT NULL,
    license_plate character varying(255) NOT NULL,
    model character varying(255) NOT NULL
);


ALTER TABLE public.vehicle OWNER TO postgres;

--
-- Name: vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicle_id_seq OWNER TO postgres;

--
-- Name: vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicle_id_seq OWNED BY public.vehicle.id;


--
-- Name: coordinate id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordinate ALTER COLUMN id SET DEFAULT nextval('public.coordinate_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- Name: ride id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride ALTER COLUMN id SET DEFAULT nextval('public.ride_id_seq'::regclass);


--
-- Name: vehicle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle ALTER COLUMN id SET DEFAULT nextval('public.vehicle_id_seq'::regclass);


--
-- Data for Name: coordinate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coordinate (id, latitude, longitude) FROM stdin;
1	1.2	2.2
2	1.1	2.2
3	1.1	2.2
6	1.1	2.2
7	1.1	2.2
\.


--
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.driver (category, hex_adress, id, vehicle_id) FROM stdin;
0	\N	2	1
\.


--
-- Data for Name: passenger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.passenger (id) FROM stdin;
1
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, comment, rating, author_id, ride_id, target_id) FROM stdin;
\.


--
-- Data for Name: ride; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ride (id, arrival_date, departure_date, destination_name, origin_name, price, status, destination_coordinates_id, driver_id, origin_coordinates_id, passenger_id) FROM stdin;
2	\N	2024-05-27 01:09:11.184694	Callao	SMP	19.7	3	6	2	7	1
1	\N	2024-05-27 01:00:00	Lima	Barranco	20.99	3	2	2	3	1
\.


--
-- Data for Name: user_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_location (description, passenger_id, coordinate_id) FROM stdin;
Test place	1	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, avg_rating, created_at, email, first_name, last_name, password, phone_number, role, trips, updated_at) FROM stdin;
2	0	2024-05-21 00:17:56.415755-05	john.doe@utec.edu.pe	John	Doe	$2a$10$MpZ1CKmZyMHTUnMKhzz84e5OTMpxvTVOSPx.c3uHiVFkOcd1tnqbm	999999999	2	0	\N
1	0	2024-05-20 23:32:22.874029-05	jmonja@utec.edu.pe	Jeffrey	Monja	$2a$10$WloHutd2jTVy6AKqKwq0se3DuOkCh7b.eCGiZlNZIlQFu/JwxEDPi	987654321	1	0	\N
\.


--
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicle (id, brand, capacity, fabrication_year, license_plate, model) FROM stdin;
1	Toyota	5	2020	ABC-123	Yaris
\.


--
-- Name: coordinate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coordinate_id_seq', 7, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_seq', 1, false);


--
-- Name: ride_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ride_id_seq', 2, true);


--
-- Name: users_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seq', 1, false);


--
-- Name: vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicle_id_seq', 1, false);


--
-- Name: coordinate coordinate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordinate
    ADD CONSTRAINT coordinate_pkey PRIMARY KEY (id);


--
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (id);


--
-- Name: passenger passenger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passenger
    ADD CONSTRAINT passenger_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: ride ride_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT ride_pkey PRIMARY KEY (id);


--
-- Name: ride uk_4fj2ljydirpiq8l1bt08blgbc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT uk_4fj2ljydirpiq8l1bt08blgbc UNIQUE (destination_coordinates_id);


--
-- Name: driver uk_5re22gwi1fmuj8i9qhm0wt1sc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT uk_5re22gwi1fmuj8i9qhm0wt1sc UNIQUE (vehicle_id);


--
-- Name: review uk_axq72c544avkvpa7785elblkn; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT uk_axq72c544avkvpa7785elblkn UNIQUE (ride_id);


--
-- Name: ride uk_dmf7vxqv9wtbq1ioid30v494p; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT uk_dmf7vxqv9wtbq1ioid30v494p UNIQUE (origin_coordinates_id);


--
-- Name: vehicle uk_j5v3su3bdx4bvsk1t9dga4bsq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT uk_j5v3su3bdx4bvsk1t9dga4bsq UNIQUE (license_plate);


--
-- Name: user_location user_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_location
    ADD CONSTRAINT user_location_pkey PRIMARY KEY (coordinate_id, passenger_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (id);


--
-- Name: user_location fk5i20wmntqc58vadrwb0x0cy6e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_location
    ADD CONSTRAINT fk5i20wmntqc58vadrwb0x0cy6e FOREIGN KEY (passenger_id) REFERENCES public.passenger(id);


--
-- Name: user_location fk5rwhf2pcwqmlooo0263ilqcyr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_location
    ADD CONSTRAINT fk5rwhf2pcwqmlooo0263ilqcyr FOREIGN KEY (coordinate_id) REFERENCES public.coordinate(id);


--
-- Name: review fk7x1lxb54nj03cylb7c1d1yoyt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk7x1lxb54nj03cylb7c1d1yoyt FOREIGN KEY (ride_id) REFERENCES public.ride(id);


--
-- Name: ride fk9ijti1ms6rql4c7i8lny2ube3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT fk9ijti1ms6rql4c7i8lny2ube3 FOREIGN KEY (passenger_id) REFERENCES public.passenger(id);


--
-- Name: review fk9o91rotu09ywxerf1evksnxhd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk9o91rotu09ywxerf1evksnxhd FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: driver fkf3lot723ogx3kvhe7aky9c9g3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT fkf3lot723ogx3kvhe7aky9c9g3 FOREIGN KEY (id) REFERENCES public.users(id);


--
-- Name: review fkgl80drgmr1ssg0rrt3sn9v1mm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fkgl80drgmr1ssg0rrt3sn9v1mm FOREIGN KEY (target_id) REFERENCES public.users(id);


--
-- Name: passenger fkgv9n67e9n8651r07qhf8qv8m3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passenger
    ADD CONSTRAINT fkgv9n67e9n8651r07qhf8qv8m3 FOREIGN KEY (id) REFERENCES public.users(id);


--
-- Name: ride fkjul90syqqhks11eup312des4d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT fkjul90syqqhks11eup312des4d FOREIGN KEY (destination_coordinates_id) REFERENCES public.coordinate(id);


--
-- Name: driver fkjvtsi9cks0ah62ffq4ilpi8oj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT fkjvtsi9cks0ah62ffq4ilpi8oj FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(id);


--
-- Name: ride fko12dq19jo25foqggvedgvaa0p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT fko12dq19jo25foqggvedgvaa0p FOREIGN KEY (driver_id) REFERENCES public.driver(id);


--
-- Name: ride fko1qb0m0a253ppyrahgg6l03vy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT fko1qb0m0a253ppyrahgg6l03vy FOREIGN KEY (origin_coordinates_id) REFERENCES public.coordinate(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

