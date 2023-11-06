--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 14.5 (Debian 14.5-2.pgdg110+2)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.account (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    email text NOT NULL,
    password character varying(500) NOT NULL,
    years_of_experience integer,
    education character varying(150),
    picture text,
    is_mentor boolean
);


ALTER TABLE public.account OWNER TO admin;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_id_seq OWNER TO admin;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- Name: attendees; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.attendees (
    id integer NOT NULL,
    project_id integer NOT NULL,
    account_id integer NOT NULL
);


ALTER TABLE public.attendees OWNER TO admin;

--
-- Name: attendees_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.attendees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.attendees_id_seq OWNER TO admin;

--
-- Name: attendees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.attendees_id_seq OWNED BY public.attendees.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.migrations (
    name character varying(300) NOT NULL,
    digest bytea NOT NULL
);


ALTER TABLE public.migrations OWNER TO admin;

--
-- Name: project; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project (
    id integer NOT NULL,
    project_name character varying(255) NOT NULL,
    project_picture character varying(255) NOT NULL,
    goal text NOT NULL,
    is_completed boolean,
    owner_id integer NOT NULL
);


ALTER TABLE public.project OWNER TO admin;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO admin;

--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- Name: project_stacks; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project_stacks (
    id integer NOT NULL,
    project_id integer NOT NULL,
    tech_stacks_id character varying(100) NOT NULL
);


ALTER TABLE public.project_stacks OWNER TO admin;

--
-- Name: project_stacks_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.project_stacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_stacks_id_seq OWNER TO admin;

--
-- Name: project_stacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.project_stacks_id_seq OWNED BY public.project_stacks.id;


--
-- Name: tech_stacks; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tech_stacks (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.tech_stacks OWNER TO admin;

--
-- Name: tech_stacks_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.tech_stacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tech_stacks_id_seq OWNER TO admin;

--
-- Name: tech_stacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.tech_stacks_id_seq OWNED BY public.tech_stacks.id;


--
-- Name: user_stacks; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_stacks (
    id integer NOT NULL,
    account_id integer NOT NULL,
    tech_stack_id character varying(100) NOT NULL
);


ALTER TABLE public.user_stacks OWNER TO admin;

--
-- Name: user_stacks_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_stacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_stacks_id_seq OWNER TO admin;

--
-- Name: user_stacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_stacks_id_seq OWNED BY public.user_stacks.id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- Name: attendees id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.attendees ALTER COLUMN id SET DEFAULT nextval('public.attendees_id_seq'::regclass);


--
-- Name: project id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- Name: project_stacks id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_stacks ALTER COLUMN id SET DEFAULT nextval('public.project_stacks_id_seq'::regclass);


--
-- Name: tech_stacks id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tech_stacks ALTER COLUMN id SET DEFAULT nextval('public.tech_stacks_id_seq'::regclass);


--
-- Name: user_stacks id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_stacks ALTER COLUMN id SET DEFAULT nextval('public.user_stacks_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.account (id, first_name, last_name, username, email, password, years_of_experience, education, picture, is_mentor) FROM stdin;
1	test	test	test	test@test.com	$2b$12$Pwm9z/ueMmI92lwYPQitF.yhaEbE4IW0KFv0E6ItAIMN2.C.LSMQa	\N	\N	test	f
2	Alexa	Doe	alexaDoe	alexa.doe@example.com	SecurePass01	4	Bachelors in Computer Science, JavaScript Expert, Front-end Specialist	https://live.staticflickr.com/65535/53162813795_69f565c4ff_w.jpg	t
3	Bryan	Smith	bryanSmith	bryan.smith@example.com	SecurePass02	6	Masters in Software Engineering, AWS Certified Developer	https://live.staticflickr.com/65535/53162871248_c93e265e2a_n.jpg	t
4	Caroline	Turner	carolineTurner	caroline.turner@example.com	SecurePass03	8	Associates in Software Development, Java Certification, Python Expert	https://live.staticflickr.com/65535/53162871178_accb7d53a7_w.jpg	t
5	David	Perez	davidPerez	david.perez@example.com	SecurePass04	3	Masters in Web Development, JavaScript Expert, Front-end Specialist	https://live.staticflickr.com/65535/53161791257_e03a701eb9_n.jpg	t
6	Ellen	Gonzalez	ellenGonzalez	ellen.gonzalez@example.com	SecurePass05	5	Bachelors in Computer Engineering, Ruby Certification, Back-end Specialist	https://live.staticflickr.com/65535/53162381006_8a3c51bf5f_w.jpg	t
7	Frank	Hernandez	frankHernandez	frank.hernandez@example.com	SecurePass06	7	Bachelors in IT, Django Expert	https://live.staticflickr.com/65535/53162813845_f8bbbe6850_w.jpg	t
8	Grace	Freeman	graceFreeman	grace.freeman@example.com	SecurePass07	6	Masters in Software Engineering, ReactJS Certification	https://live.staticflickr.com/65535/53162871173_e51a7df5a1_w.jpg	t
9	Henry	Gibson	henryGibson	henry.gibson@example.com	SecurePass08	5	Associates in Software Development, AWS Certified Developer	https://live.staticflickr.com/65535/53161791247_5608bf312f_w.jpg	t
10	Irene	Fletcher	ireneFletcher	irene.fletcher@example.com	SecurePass09	4	Masters in Computer Science, Ruby Certification	https://live.staticflickr.com/65535/53162589619_459ba9f8aa_w.jpg	t
11	Jack	West	jackWest	jack.west@example.com	SecurePass10	7	Bachelors in Software Development, Front-end Specialist, AWS Certified Developer	https://live.staticflickr.com/65535/53162589544_60e1dedc21_w.jpg	t
12	Kelly	Simpson	kellySimpson	kelly.simpson@example.com	SecurePass11	6	Masters in Web Development, JavaScript Expert	https://live.staticflickr.com/65535/53162871273_cef3b21cfa_w.jpg	t
13	Lucas	Griffith	lucasGriffith	lucas.griffith@example.com	SecurePass12	5	Bachelors in IT, Python Expert, Back-end Specialist	https://live.staticflickr.com/65535/53161791242_3187443678_w.jpg	t
14	Monica	Graham	monicaGraham	monica.graham@example.com	SecurePass13	7	Masters in Software Engineering, Java Certification	https://live.staticflickr.com/65535/53162589594_03f66ac56a_w.jpg	t
15	Nathan	Tucker	nathanTucker	nathan.tucker@example.com	SecurePass14	6	Associates in Software Development, Front-end Specialist	https://live.staticflickr.com/65535/53162589519_ce978ed8de_w.jpg	t
16	Olivia	Rose	oliviaRose	olivia.rose@example.com	SecurePass15	5	Bachelors in Computer Engineering, AWS Certified Developer	https://live.staticflickr.com/65535/53162871268_92d42749d3_w.jpg	t
17	Patrick	Sullivan	patrickSullivan	patrick.sullivan@example.com	SecurePass16	3	Bachelors in IT, Django Expert	https://live.staticflickr.com/65535/53162871193_48dd59d024_w.jpg	f
\.


--
-- Data for Name: attendees; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.attendees (id, project_id, account_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.migrations (name, digest) FROM stdin;
001_sample_migration	\\x54eb503cfcd49409c26962f35f8bafbaa30ac4ce9f7d68a5d1fb12b7c3e092a2
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project (id, project_name, project_picture, goal, is_completed, owner_id) FROM stdin;
1	test	test	test	f	1
\.


--
-- Data for Name: project_stacks; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project_stacks (id, project_id, tech_stacks_id) FROM stdin;
1	1	{React}
\.


--
-- Data for Name: tech_stacks; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tech_stacks (id, name) FROM stdin;
1	HTML
2	CSS
3	JavaScript
4	jQuery
5	Bootstrap
6	React
7	Angular
8	Vue.js
9	TypeScript
10	Swift
11	Kotlin
12	React Native
13	Flutter
14	Linux
15	Apache
16	MySQL
17	PHP
18	MongoDB
19	Express.js
20	Angular
21	Node.js
22	Ruby
23	Ruby on Rails
24	PostgreSQL
25	Django
26	Java
27	Spring Boot
28	Hibernate
29	C#
30	ASP.NET
31	Entity Framework
32	Ember.js
33	Backbone.js
34	Aurelia
35	Knockout.js
36	Flask
37	Sinatra
38	Play Framework
39	FastAPI
40	Nest.js
41	Phoenix
42	Meteor
43	Grails
44	Sails.js
45	LoopBack
46	Strapi
47	Prisma
48	Kubernetes
\.


--
-- Data for Name: user_stacks; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_stacks (id, account_id, tech_stack_id) FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.account_id_seq', 17, true);


--
-- Name: attendees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.attendees_id_seq', 1, true);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.project_id_seq', 1, true);


--
-- Name: project_stacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.project_stacks_id_seq', 1, true);


--
-- Name: tech_stacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tech_stacks_id_seq', 1, false);


--
-- Name: user_stacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_stacks_id_seq', 1, false);


--
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- Name: attendees attendees_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.attendees
    ADD CONSTRAINT attendees_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (name);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: project_stacks project_stacks_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_stacks
    ADD CONSTRAINT project_stacks_pkey PRIMARY KEY (id);


--
-- Name: tech_stacks tech_stacks_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tech_stacks
    ADD CONSTRAINT tech_stacks_pkey PRIMARY KEY (id);


--
-- Name: user_stacks user_stacks_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_stacks
    ADD CONSTRAINT user_stacks_pkey PRIMARY KEY (id);


--
-- Name: attendees attendees_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.attendees
    ADD CONSTRAINT attendees_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id) ON DELETE CASCADE;


--
-- Name: attendees attendees_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.attendees
    ADD CONSTRAINT attendees_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(id) ON DELETE CASCADE;


--
-- Name: project project_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.account(id) ON DELETE CASCADE;


--
-- Name: project_stacks project_stacks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_stacks
    ADD CONSTRAINT project_stacks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(id) ON DELETE CASCADE;


--
-- Name: user_stacks user_stacks_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_stacks
    ADD CONSTRAINT user_stacks_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

