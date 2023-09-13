--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE article;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:NmqVigzKM+qJeekxbmUsEQ==$lKs3/yAmuWiPEuA3ls0qpffS2NM/rNeUgJAI5e8cZdQ=:j7+87/brFjbqi97js7RZXrekcc/zZakbqpe8Qe784Ew=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "article" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

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
-- Name: article; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE article WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE article OWNER TO postgres;

\connect article

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


--
-- Name: Chude; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Chude" AS ENUM (
    'TINTUC',
    'TUYENDUNG',
    'CAUHOI'
);


ALTER TYPE public."Chude" OWNER TO postgres;

--
-- Name: Provider; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Provider" AS ENUM (
    'STUDENT',
    'TEACHER',
    'GOOGLE'
);


ALTER TYPE public."Provider" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Bookmark; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Bookmark" (
    "userId" integer NOT NULL,
    "articleId" integer NOT NULL
);


ALTER TABLE public."Bookmark" OWNER TO postgres;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    content text NOT NULL,
    "articleId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    file uuid
);


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Follows" (
    "followerId" integer NOT NULL,
    "followingId" integer NOT NULL
);


ALTER TABLE public."Follows" OWNER TO postgres;

--
-- Name: Like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Like" (
    "userId" integer NOT NULL,
    "articleId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Like" OWNER TO postgres;

--
-- Name: _ArticleToTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ArticleToTag" (
    "A" integer NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ArticleToTag" OWNER TO postgres;

--
-- Name: _TagToUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_TagToUser" (
    "A" text NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_TagToUser" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    thumbnail text NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    chude public."Chude" NOT NULL
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles_files (
    id integer NOT NULL,
    articles_id integer,
    directus_files_id uuid
);


ALTER TABLE public.articles_files OWNER TO postgres;

--
-- Name: articles_files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_files_id_seq OWNER TO postgres;

--
-- Name: articles_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_files_id_seq OWNED BY public.articles_files.id;


--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: directus_activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_activity (
    id integer NOT NULL,
    action character varying(45) NOT NULL,
    "user" uuid,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip character varying(50),
    user_agent character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    comment text,
    origin character varying(255)
);


ALTER TABLE public.directus_activity OWNER TO postgres;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_activity_id_seq OWNER TO postgres;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_activity_id_seq OWNED BY public.directus_activity.id;


--
-- Name: directus_collections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_collections (
    collection character varying(64) NOT NULL,
    icon character varying(30),
    note text,
    display_template character varying(255),
    hidden boolean DEFAULT false NOT NULL,
    singleton boolean DEFAULT false NOT NULL,
    translations json,
    archive_field character varying(64),
    archive_app_filter boolean DEFAULT true NOT NULL,
    archive_value character varying(255),
    unarchive_value character varying(255),
    sort_field character varying(64),
    accountability character varying(255) DEFAULT 'all'::character varying,
    color character varying(255),
    item_duplication_fields json,
    sort integer,
    "group" character varying(64),
    collapse character varying(255) DEFAULT 'open'::character varying NOT NULL,
    preview_url character varying(255)
);


ALTER TABLE public.directus_collections OWNER TO postgres;

--
-- Name: directus_dashboards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_dashboards (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(30) DEFAULT 'dashboard'::character varying NOT NULL,
    note text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    color character varying(255)
);


ALTER TABLE public.directus_dashboards OWNER TO postgres;

--
-- Name: directus_fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_fields (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    field character varying(64) NOT NULL,
    special character varying(64),
    interface character varying(64),
    options json,
    display character varying(64),
    display_options json,
    readonly boolean DEFAULT false NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    sort integer,
    width character varying(30) DEFAULT 'full'::character varying,
    translations json,
    note text,
    conditions json,
    required boolean DEFAULT false,
    "group" character varying(64),
    validation json,
    validation_message text
);


ALTER TABLE public.directus_fields OWNER TO postgres;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_fields_id_seq OWNER TO postgres;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_fields_id_seq OWNED BY public.directus_fields.id;


--
-- Name: directus_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_files (
    id uuid NOT NULL,
    storage character varying(255) NOT NULL,
    filename_disk character varying(255),
    filename_download character varying(255) NOT NULL,
    title character varying(255),
    type character varying(255),
    folder uuid,
    uploaded_by uuid,
    uploaded_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by uuid,
    modified_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    charset character varying(50),
    filesize bigint,
    width integer,
    height integer,
    duration integer,
    embed character varying(200),
    description text,
    location text,
    tags text,
    metadata json
);


ALTER TABLE public.directus_files OWNER TO postgres;

--
-- Name: directus_flows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_flows (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(30),
    color character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    trigger character varying(255),
    accountability character varying(255) DEFAULT 'all'::character varying,
    options json,
    operation uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_flows OWNER TO postgres;

--
-- Name: directus_folders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_folders (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    parent uuid
);


ALTER TABLE public.directus_folders OWNER TO postgres;

--
-- Name: directus_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_migrations (
    version character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.directus_migrations OWNER TO postgres;

--
-- Name: directus_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_notifications (
    id integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(255) DEFAULT 'inbox'::character varying,
    recipient uuid NOT NULL,
    sender uuid,
    subject character varying(255) NOT NULL,
    message text,
    collection character varying(64),
    item character varying(255)
);


ALTER TABLE public.directus_notifications OWNER TO postgres;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_notifications_id_seq OWNER TO postgres;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_notifications_id_seq OWNED BY public.directus_notifications.id;


--
-- Name: directus_operations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_operations (
    id uuid NOT NULL,
    name character varying(255),
    key character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    options json,
    resolve uuid,
    reject uuid,
    flow uuid NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_operations OWNER TO postgres;

--
-- Name: directus_panels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_panels (
    id uuid NOT NULL,
    dashboard uuid NOT NULL,
    name character varying(255),
    icon character varying(30) DEFAULT NULL::character varying,
    color character varying(10),
    show_header boolean DEFAULT false NOT NULL,
    note text,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    options json,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_panels OWNER TO postgres;

--
-- Name: directus_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_permissions (
    id integer NOT NULL,
    role uuid,
    collection character varying(64) NOT NULL,
    action character varying(10) NOT NULL,
    permissions json,
    validation json,
    presets json,
    fields text
);


ALTER TABLE public.directus_permissions OWNER TO postgres;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_permissions_id_seq OWNER TO postgres;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_permissions_id_seq OWNED BY public.directus_permissions.id;


--
-- Name: directus_presets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_presets (
    id integer NOT NULL,
    bookmark character varying(255),
    "user" uuid,
    role uuid,
    collection character varying(64),
    search character varying(100),
    layout character varying(100) DEFAULT 'tabular'::character varying,
    layout_query json,
    layout_options json,
    refresh_interval integer,
    filter json,
    icon character varying(30) DEFAULT 'bookmark'::character varying,
    color character varying(255)
);


ALTER TABLE public.directus_presets OWNER TO postgres;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_presets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_presets_id_seq OWNER TO postgres;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_presets_id_seq OWNED BY public.directus_presets.id;


--
-- Name: directus_relations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_relations (
    id integer NOT NULL,
    many_collection character varying(64) NOT NULL,
    many_field character varying(64) NOT NULL,
    one_collection character varying(64),
    one_field character varying(64),
    one_collection_field character varying(64),
    one_allowed_collections text,
    junction_field character varying(64),
    sort_field character varying(64),
    one_deselect_action character varying(255) DEFAULT 'nullify'::character varying NOT NULL
);


ALTER TABLE public.directus_relations OWNER TO postgres;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_relations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_relations_id_seq OWNER TO postgres;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_relations_id_seq OWNED BY public.directus_relations.id;


--
-- Name: directus_revisions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_revisions (
    id integer NOT NULL,
    activity integer NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    data json,
    delta json,
    parent integer
);


ALTER TABLE public.directus_revisions OWNER TO postgres;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_revisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_revisions_id_seq OWNER TO postgres;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_revisions_id_seq OWNED BY public.directus_revisions.id;


--
-- Name: directus_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_roles (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(30) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
    description text,
    ip_access text,
    enforce_tfa boolean DEFAULT false NOT NULL,
    admin_access boolean DEFAULT false NOT NULL,
    app_access boolean DEFAULT true NOT NULL
);


ALTER TABLE public.directus_roles OWNER TO postgres;

--
-- Name: directus_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_sessions (
    token character varying(64) NOT NULL,
    "user" uuid,
    expires timestamp with time zone NOT NULL,
    ip character varying(255),
    user_agent character varying(255),
    share uuid,
    origin character varying(255)
);


ALTER TABLE public.directus_sessions OWNER TO postgres;

--
-- Name: directus_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_settings (
    id integer NOT NULL,
    project_name character varying(100) DEFAULT 'Directus'::character varying NOT NULL,
    project_url character varying(255),
    project_color character varying(50) DEFAULT NULL::character varying,
    project_logo uuid,
    public_foreground uuid,
    public_background uuid,
    public_note text,
    auth_login_attempts integer DEFAULT 25,
    auth_password_policy character varying(100),
    storage_asset_transform character varying(7) DEFAULT 'all'::character varying,
    storage_asset_presets json,
    custom_css text,
    storage_default_folder uuid,
    basemaps json,
    mapbox_key character varying(255),
    module_bar json,
    project_descriptor character varying(100),
    default_language character varying(255) DEFAULT 'en-US'::character varying NOT NULL,
    custom_aspect_ratios json
);


ALTER TABLE public.directus_settings OWNER TO postgres;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_settings_id_seq OWNER TO postgres;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_settings_id_seq OWNED BY public.directus_settings.id;


--
-- Name: directus_shares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_shares (
    id uuid NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    role uuid,
    password character varying(255),
    user_created uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_start timestamp with time zone,
    date_end timestamp with time zone,
    times_used integer DEFAULT 0,
    max_uses integer
);


ALTER TABLE public.directus_shares OWNER TO postgres;

--
-- Name: directus_translations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_translations (
    id uuid NOT NULL,
    language character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.directus_translations OWNER TO postgres;

--
-- Name: directus_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_users (
    id uuid NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(128),
    password character varying(255),
    location character varying(255),
    title character varying(50),
    description text,
    tags json,
    avatar uuid,
    language character varying(255) DEFAULT NULL::character varying,
    theme character varying(20) DEFAULT 'auto'::character varying,
    tfa_secret character varying(255),
    status character varying(16) DEFAULT 'active'::character varying NOT NULL,
    role uuid,
    token character varying(255),
    last_access timestamp with time zone,
    last_page character varying(255),
    provider character varying(128) DEFAULT 'default'::character varying NOT NULL,
    external_identifier character varying(255),
    auth_data json,
    email_notifications boolean DEFAULT true
);


ALTER TABLE public.directus_users OWNER TO postgres;

--
-- Name: directus_webhooks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_webhooks (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    method character varying(10) DEFAULT 'POST'::character varying NOT NULL,
    url character varying(255) NOT NULL,
    status character varying(10) DEFAULT 'active'::character varying NOT NULL,
    data boolean DEFAULT true NOT NULL,
    actions character varying(100) NOT NULL,
    collections character varying(255) NOT NULL,
    headers json
);


ALTER TABLE public.directus_webhooks OWNER TO postgres;

--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_webhooks_id_seq OWNER TO postgres;

--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_webhooks_id_seq OWNED BY public.directus_webhooks.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    name text NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    avatar text,
    password text,
    "firstName" text,
    "lastName" text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    provider public."Provider" NOT NULL,
    "refreshToken" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    github text,
    linkedin text,
    title character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: articles_files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles_files ALTER COLUMN id SET DEFAULT nextval('public.articles_files_id_seq'::regclass);


--
-- Name: directus_activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_activity ALTER COLUMN id SET DEFAULT nextval('public.directus_activity_id_seq'::regclass);


--
-- Name: directus_fields id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_fields ALTER COLUMN id SET DEFAULT nextval('public.directus_fields_id_seq'::regclass);


--
-- Name: directus_notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications ALTER COLUMN id SET DEFAULT nextval('public.directus_notifications_id_seq'::regclass);


--
-- Name: directus_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_permissions ALTER COLUMN id SET DEFAULT nextval('public.directus_permissions_id_seq'::regclass);


--
-- Name: directus_presets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets ALTER COLUMN id SET DEFAULT nextval('public.directus_presets_id_seq'::regclass);


--
-- Name: directus_relations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_relations ALTER COLUMN id SET DEFAULT nextval('public.directus_relations_id_seq'::regclass);


--
-- Name: directus_revisions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions ALTER COLUMN id SET DEFAULT nextval('public.directus_revisions_id_seq'::regclass);


--
-- Name: directus_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings ALTER COLUMN id SET DEFAULT nextval('public.directus_settings_id_seq'::regclass);


--
-- Name: directus_webhooks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_webhooks ALTER COLUMN id SET DEFAULT nextval('public.directus_webhooks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: Bookmark; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Bookmark" ("userId", "articleId") FROM stdin;
1	2
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, "userId", content, "articleId", "createdAt", "updatedAt", file) FROM stdin;
2	2	wef	5	2023-09-12 12:01:42.029	2023-09-12 12:01:42.029	\N
1	2	wefwfwefw	5	2023-09-12 12:01:39.893	2023-09-12 12:01:46.158	\N
4	1	dasd	2	2023-09-13 13:15:06.714	2023-09-13 13:15:06.714	9ba6a256-ee7d-48a5-81b5-b690b2fd6b53
5	1	dasd	2	2023-09-13 13:27:02.139	2023-09-13 13:27:02.139	fda55e34-ab43-4892-8c96-5d4be8bc829e
6	1	dasd	2	2023-09-13 13:27:55.644	2023-09-13 13:27:55.644	383885c2-2940-4c53-a5af-682ca4183768
8	1	dasd	2	2023-09-13 13:28:25.123	2023-09-13 13:28:25.123	5ae2fcb3-e736-477c-9472-b7ca5f85f02e
9	1	dasd	2	2023-09-13 13:36:34.782	2023-09-13 13:36:34.782	207455fa-3ace-4f8f-8f73-076cd9573b22
7	1	dasd	4	2023-09-13 13:27:59.31	2023-09-13 13:27:59.31	0ba9c34a-5450-41b2-a023-703acfa9f73e
10	1	dasd	2	2023-09-13 13:39:55.49	2023-09-13 13:39:55.49	bef10624-bbd8-4171-9b26-77ffed31b53a
11	1	dasd	2	2023-09-13 13:41:08.784	2023-09-13 13:41:08.784	d8f5407a-c337-4528-bdb7-8b861017444e
12	1	dasd	4	2023-09-13 13:41:38.649	2023-09-13 13:41:38.649	08e70613-f77e-4d96-8575-3c312c6b8840
13	2	sdfs	4	2023-09-13 13:45:27.921	2023-09-13 13:45:27.921	\N
14	2	fsdihufisld	4	2023-09-13 13:45:30.491	2023-09-13 13:45:30.491	\N
\.


--
-- Data for Name: Follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Follows" ("followerId", "followingId") FROM stdin;
\.


--
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Like" ("userId", "articleId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _ArticleToTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ArticleToTag" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _TagToUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_TagToUser" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9447ee68-a417-43c8-af75-268551e7aa8a	f99e27cb6d0086521277f12b72ec0408ba9e61ca24d9d491f6cba2779a1df97a	2023-09-04 09:05:06.047496+00	20230504025930_init	\N	\N	2023-09-04 09:05:05.900282+00	1
9c6e8077-ec45-4480-a91c-abd679a255d9	a2004e232c136331f1dadb9570a93d4249c3a0f3d1934d647cc99f22cf782a0a	2023-09-04 09:05:06.07726+00	20230507022317_update_bookmark	\N	\N	2023-09-04 09:05:06.051852+00	1
774eb42f-57a0-4965-873d-86dfb39aabf0	ebf5800293b01a98663a9d6d580a9792b96eae039a5c83fc99ea74788df3c389	2023-09-04 09:05:06.101385+00	20230507130721_update	\N	\N	2023-09-04 09:05:06.081717+00	1
e8b40b83-0e33-41f6-adf6-1e1454b6024d	abfc14b025a535658da8ebf063506b8dc7dfb46968beebd6ee8ad99a356edbdd	2023-09-04 09:05:06.129929+00	20230514012535_update_bookmark	\N	\N	2023-09-04 09:05:06.105611+00	1
a708939e-1cc9-4747-9791-9c5095604fe2	ebf5800293b01a98663a9d6d580a9792b96eae039a5c83fc99ea74788df3c389	2023-09-04 09:05:06.154071+00	20230514132231_update_bookmark	\N	\N	2023-09-04 09:05:06.134667+00	1
3e2b0303-36fb-48f9-8af1-df1b0c55b5b5	42aa52791e365d82019d4b7f16b0441c1858b1c0d2de263d7577fc203f8461ab	2023-09-04 09:05:06.181923+00	20230517023634_update_follower	\N	\N	2023-09-04 09:05:06.159137+00	1
5845da9e-a673-4df2-b7dc-1acc3288abf9	fc982c15d572a8881e2626b036e442b53004a409d70826b4579dc7cd9ef15d3f	2023-09-04 09:05:06.220246+00	20230518002823_update_tag	\N	\N	2023-09-04 09:05:06.186627+00	1
f6d43779-bf27-4faf-b134-e52d117515bd	ff979b454839d322e8a29146e2e43251578c39d13299f0d873c4a13f5e69d6f3	2023-09-04 09:05:06.24677+00	20230529135204_update	\N	\N	2023-09-04 09:05:06.22474+00	1
14cc6214-ec39-4712-9d4b-47e2ccca47a5	040f0f50d55c997f6866032fa98b19502188ca89bd995b2a11a7f0f17ce979be	2023-09-04 09:05:06.294074+00	20230821124825_update	\N	\N	2023-09-04 09:05:06.251233+00	1
598b971c-d54c-4079-a991-74ad125f2702	79a76f39febbf327ea29fea8a55ec3cbc7a89d3d1306292b0e86dd5a4804742c	2023-09-04 09:05:19.258826+00	20230904090519_init	\N	\N	2023-09-04 09:05:19.244499+00	1
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, content, thumbnail, views, "userId", "createdAt", "updatedAt", chude) FROM stdin;
1	asd	<p>asdasd</p>	http://res.cloudinary.com/dxlsponnf/image/upload/v1693822620/ro8fvikkzb5en0qtn3tw.png	1	1	2023-09-04 10:17:02.469	2023-09-10 12:37:48.742	CAUHOI
4	day la tin tuc	<p>gbiuergiuerhgoiwe'</p><p>wroighwoierlkgpewr</p><p>gwporgjpow['rg</p>	http://res.cloudinary.com/dxlsponnf/image/upload/v1694090649/yq4sflea4qbpfqhevvkr.png	42	1	2023-09-07 12:44:24.29	2023-09-13 13:46:26.069	TINTUC
3	Day la tuyen dung	<p>dqwbgyqwugydugquywgdiuqwduiquhefouiewfiuoweknmfwef</p>	http://res.cloudinary.com/dxlsponnf/image/upload/v1694090318/yekiccfrkefftyzaw1dj.png	3	1	2023-09-07 12:38:45.089	2023-09-12 11:54:41.128	TUYENDUNG
2	Xin chào 2023	<div class="se-component se-image-container __se__float-center"><figure><img src="data:image/jpeg;base64,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" alt="" data-rotate="" data-proportion="true" data-align="center" data-size="," data-percentage="auto,auto" data-file-name="113.jpg" data-file-size="185862" data-origin="," style=""></figure></div>	http://res.cloudinary.com/dxlsponnf/image/upload/v1693823890/r1frnedvzhn1kdu1oxtk.jpg	4	1	2023-09-04 10:38:34.189	2023-09-13 13:39:26.233	CAUHOI
5	Day la Hoi dap	<p>dasdasdkjgfiuajklsf</p><p>wkhowslk;d</p><p>sdplv</p>	http://res.cloudinary.com/dxlsponnf/image/upload/v1694091408/kmxaskjjhnq3s5vl41ki.png	70	1	2023-09-07 12:56:51.761	2023-09-13 13:39:46.315	CAUHOI
\.


--
-- Data for Name: articles_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles_files (id, articles_id, directus_files_id) FROM stdin;
\.


--
-- Data for Name: directus_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_activity (id, action, "user", "timestamp", ip, user_agent, collection, item, comment, origin) FROM stdin;
1	login	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:05.633+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_users	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	http://localhost:8057
2	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:11.527+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Bookmark	\N	http://localhost:8057
3	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:14.478+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Comment	\N	http://localhost:8057
4	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:17.464+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Follows	\N	http://localhost:8057
5	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:19.223+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Like	\N	http://localhost:8057
6	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:22.49+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	_ArticleToTag	\N	http://localhost:8057
7	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:24.768+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	_TagToUser	\N	http://localhost:8057
8	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:26.902+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	_prisma_migrations	\N	http://localhost:8057
9	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:30.412+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	articles	\N	http://localhost:8057
10	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:32.707+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	tag	\N	http://localhost:8057
11	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:34.76+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	users	\N	http://localhost:8057
12	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-04 09:06:44.403+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	1	\N	http://localhost:8057
13	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:15.91+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	2	\N	http://localhost:8057
14	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:16.87+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	3	\N	http://localhost:8057
15	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:17.764+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	4	\N	http://localhost:8057
16	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:19.238+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	5	\N	http://localhost:8057
17	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:20.193+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	6	\N	http://localhost:8057
18	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:21.064+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	7	\N	http://localhost:8057
19	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:21.996+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	8	\N	http://localhost:8057
20	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:22.897+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	9	\N	http://localhost:8057
21	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:40.563+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	10	\N	http://localhost:8057
22	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:40.764+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	11	\N	http://localhost:8057
23	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:40.791+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	articles_files	\N	http://localhost:8057
24	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:40.92+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	12	\N	http://localhost:8057
25	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:41.074+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	13	\N	http://localhost:8057
26	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:46.551+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	14	\N	http://localhost:8057
27	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:47.393+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	15	\N	http://localhost:8057
28	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:48.601+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	16	\N	http://localhost:8057
29	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:49.505+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	17	\N	http://localhost:8057
30	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:50.18+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	18	\N	http://localhost:8057
31	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:50.87+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	19	\N	http://localhost:8057
32	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:52.231+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	20	\N	http://localhost:8057
33	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:53.059+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	21	\N	http://localhost:8057
34	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:53.885+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	22	\N	http://localhost:8057
35	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:54.62+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	23	\N	http://localhost:8057
36	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:55.858+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	24	\N	http://localhost:8057
37	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:51:57.676+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	25	\N	http://localhost:8057
38	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:52:00.183+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	26	\N	http://localhost:8057
39	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 12:52:41.509+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	27	\N	http://localhost:8057
40	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:26.13+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Like	\N	http://localhost:8057
41	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:28.115+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Follows	\N	http://localhost:8057
42	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:29.971+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Comment	\N	http://localhost:8057
43	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:33.004+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	_ArticleToTag	\N	http://localhost:8057
44	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:36.857+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	_TagToUser	\N	http://localhost:8057
45	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:39.284+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	_prisma_migrations	\N	http://localhost:8057
46	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:42.316+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	tag	\N	http://localhost:8057
47	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:00:49.97+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Bookmark	\N	http://localhost:8057
48	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:01:22.763+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_settings	1	\N	http://localhost:8057
49	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-10 13:01:27.902+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_settings	1	\N	http://localhost:8057
50	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 12:50:16.959+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_permissions	1	\N	http://localhost:8057
51	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 12:50:18.179+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_permissions	2	\N	http://localhost:8057
52	create	\N	2023-09-12 13:04:22.443+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	02aa2df1-fd5c-42d7-ab66-d6002785573f	\N	http://localhost:8000
53	create	\N	2023-09-12 13:05:07.047+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	2654b6d6-078a-4327-8592-8269d58fe2fe	\N	http://localhost:8000
54	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:05:40.566+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_permissions	3	\N	http://localhost:8057
55	create	\N	2023-09-12 13:05:55.223+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	ccc412b0-e892-4a20-9746-7a68dab0c153	\N	http://localhost:8000
56	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:06:43.943+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_users	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	http://localhost:8057
57	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:10:11.405+00	172.24.0.1	PostmanRuntime/7.32.3	directus_files	0331f1bb-e2e0-401e-9763-d8dcf9c83d88	\N	\N
58	delete	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:10:11.445+00	172.24.0.1	PostmanRuntime/7.32.3	directus_files	0331f1bb-e2e0-401e-9763-d8dcf9c83d88	\N	\N
59	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:12:55.576+00	172.24.0.1	PostmanRuntime/7.32.3	directus_files	507f6885-f5a0-469f-9283-0b1d9a2e1c9b	\N	\N
60	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:22:52.389+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	6f7edad2-aace-4734-90aa-48540c89db02	\N	http://localhost:8000
61	delete	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:23:08.672+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	ccc412b0-e892-4a20-9746-7a68dab0c153	\N	http://localhost:8057
62	delete	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:23:08.679+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	2654b6d6-078a-4327-8592-8269d58fe2fe	\N	http://localhost:8057
63	delete	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:23:08.689+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	02aa2df1-fd5c-42d7-ab66-d6002785573f	\N	http://localhost:8057
64	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:23:13.623+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	703aead2-7095-4558-887d-0116e0149b25	\N	http://localhost:8000
65	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:25:34.351+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	548d6ffd-dfa2-4fe0-8392-8b5fb58a9ef3	\N	http://localhost:8000
66	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:03:23.091+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	b382a96a-4a03-4c91-80ed-4aa2130b4788	\N	http://localhost:8000
67	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:04:58.722+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_collections	Comment	\N	http://localhost:8057
68	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:00.911+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	28	\N	http://localhost:8057
69	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:02.073+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	29	\N	http://localhost:8057
70	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:02.898+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	30	\N	http://localhost:8057
71	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:03.695+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	31	\N	http://localhost:8057
72	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:04.471+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	32	\N	http://localhost:8057
75	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:24.595+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	28	\N	http://localhost:8057
76	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:24.691+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	29	\N	http://localhost:8057
77	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:24.786+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	34	\N	http://localhost:8057
78	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:24.873+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	30	\N	http://localhost:8057
79	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:24.953+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	31	\N	http://localhost:8057
80	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:25.042+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	32	\N	http://localhost:8057
81	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:25.116+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	33	\N	http://localhost:8057
73	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:05.205+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	33	\N	http://localhost:8057
74	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:05:19.955+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_fields	34	\N	http://localhost:8057
82	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:08:04.463+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	97bbce77-713b-4a87-9800-22d59b9050fd	\N	http://localhost:8000
83	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:13:25.18+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	35b517d2-6e6f-42b8-9610-5f63fe395c31	\N	http://localhost:8000
84	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:14:24.743+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	879880c6-7462-4a73-9ba0-92c37c78e9be	\N	http://localhost:8000
85	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:15:06.127+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	9ba6a256-ee7d-48a5-81b5-b690b2fd6b53	\N	http://localhost:8000
86	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:27:01.614+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	fda55e34-ab43-4892-8c96-5d4be8bc829e	\N	http://localhost:8000
87	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:27:55.106+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	383885c2-2940-4c53-a5af-682ca4183768	\N	http://localhost:8000
88	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:27:58.877+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	0ba9c34a-5450-41b2-a023-703acfa9f73e	\N	http://localhost:8000
89	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:28:24.632+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	5ae2fcb3-e736-477c-9472-b7ca5f85f02e	\N	http://localhost:8000
90	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:36:34.092+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	207455fa-3ace-4f8f-8f73-076cd9573b22	\N	http://localhost:8000
91	update	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:39:43.721+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	Comment	7	\N	http://localhost:8057
92	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:39:54.842+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	bef10624-bbd8-4171-9b26-77ffed31b53a	\N	http://localhost:8000
93	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:41:08.015+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	d8f5407a-c337-4528-bdb7-8b861017444e	\N	http://localhost:8000
94	create	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:41:38.07+00	172.18.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	directus_files	08e70613-f77e-4d96-8575-3c312c6b8840	\N	http://localhost:8000
\.


--
-- Data for Name: directus_collections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, "group", collapse, preview_url) FROM stdin;
articles	\N	\N	\N	f	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
users	\N	\N	\N	f	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
articles_files	import_export	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
Like	\N	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
Follows	\N	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
_ArticleToTag	\N	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
_TagToUser	\N	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
_prisma_migrations	\N	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
tag	\N	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
Bookmark	\N	\N	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
Comment	\N	\N	\N	f	f	\N	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N
\.


--
-- Data for Name: directus_dashboards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_dashboards (id, name, icon, note, date_created, user_created, color) FROM stdin;
\.


--
-- Data for Name: directus_fields; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_fields (id, collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) FROM stdin;
1	articles	chude	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
2	articles	id	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
3	articles	title	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
4	articles	content	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
5	articles	thumbnail	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
6	articles	views	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
7	articles	userId	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
8	articles	createdAt	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
9	articles	updatedAt	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
10	articles	files	files	files	\N	\N	\N	f	f	1	full	\N	\N	\N	f	\N	\N	\N
11	articles_files	id	\N	\N	\N	\N	\N	f	t	1	full	\N	\N	\N	f	\N	\N	\N
12	articles_files	articles_id	\N	\N	\N	\N	\N	f	t	2	full	\N	\N	\N	f	\N	\N	\N
13	articles_files	directus_files_id	\N	\N	\N	\N	\N	f	t	3	full	\N	\N	\N	f	\N	\N	\N
14	users	id	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
15	users	email	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
16	users	avatar	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
17	users	password	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
18	users	firstName	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
19	users	lastName	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
20	users	role	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
21	users	provider	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
22	users	refreshToken	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
23	users	createdAt	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
24	users	updatedAt	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
25	users	github	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
26	users	linkedin	\N	\N	\N	\N	\N	f	f	\N	full	\N	\N	\N	f	\N	\N	\N
27	users	title	\N	input	\N	\N	\N	f	f	1	full	\N	\N	\N	f	\N	\N	\N
28	Comment	id	\N	\N	\N	\N	\N	f	f	1	full	\N	\N	\N	f	\N	\N	\N
29	Comment	userId	\N	\N	\N	\N	\N	f	f	2	full	\N	\N	\N	f	\N	\N	\N
34	Comment	file	file	file	\N	\N	\N	f	f	3	full	\N	\N	\N	f	\N	\N	\N
30	Comment	content	\N	\N	\N	\N	\N	f	f	4	full	\N	\N	\N	f	\N	\N	\N
31	Comment	articleId	\N	\N	\N	\N	\N	f	f	5	full	\N	\N	\N	f	\N	\N	\N
32	Comment	createdAt	\N	\N	\N	\N	\N	f	f	6	full	\N	\N	\N	f	\N	\N	\N
33	Comment	updatedAt	\N	\N	\N	\N	\N	f	f	7	full	\N	\N	\N	f	\N	\N	\N
\.


--
-- Data for Name: directus_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_files (id, storage, filename_disk, filename_download, title, type, folder, uploaded_by, uploaded_on, modified_by, modified_on, charset, filesize, width, height, duration, embed, description, location, tags, metadata) FROM stdin;
507f6885-f5a0-469f-9283-0b1d9a2e1c9b	local	507f6885-f5a0-469f-9283-0b1d9a2e1c9b.jpg	nhasach.jpg	Nhasach	image/jpeg	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:12:55.550943+00	\N	2023-09-12 13:12:55.678+00	\N	1501670	1200	800	\N	\N	\N	\N	\N	{}
6f7edad2-aace-4734-90aa-48540c89db02	local	6f7edad2-aace-4734-90aa-48540c89db02.png	check.png	Check	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:22:52.336573+00	\N	2023-09-12 13:22:52.57+00	\N	275	72	72	\N	\N	\N	\N	\N	{}
703aead2-7095-4558-887d-0116e0149b25	local	703aead2-7095-4558-887d-0116e0149b25.json	Reward.json	Reward	application/json	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:23:13.611428+00	\N	2023-09-12 13:23:13.68+00	\N	5922	\N	\N	\N	\N	\N	\N	\N	\N
548d6ffd-dfa2-4fe0-8392-8b5fb58a9ef3	local	548d6ffd-dfa2-4fe0-8392-8b5fb58a9ef3.png	Onboarding.png	Onboarding	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-12 13:25:34.334405+00	\N	2023-09-12 13:25:34.428+00	\N	17826	1125	2436	\N	\N	\N	\N	\N	{}
b382a96a-4a03-4c91-80ed-4aa2130b4788	local	b382a96a-4a03-4c91-80ed-4aa2130b4788.png	Screenshot from 2023-08-31 10-12-45.png	Screenshot From 2023 08 31 10 12 45	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:03:23.06824+00	\N	2023-09-13 13:03:23.15+00	\N	107123	921	501	\N	\N	\N	\N	\N	{}
97bbce77-713b-4a87-9800-22d59b9050fd	local	97bbce77-713b-4a87-9800-22d59b9050fd.png	Screenshot from 2023-09-06 08-25-47.png	Screenshot From 2023 09 06 08 25 47	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:08:04.448973+00	\N	2023-09-13 13:08:04.522+00	\N	33325	581	369	\N	\N	\N	\N	\N	{}
35b517d2-6e6f-42b8-9610-5f63fe395c31	local	35b517d2-6e6f-42b8-9610-5f63fe395c31.png	Screenshot from 2023-08-31 14-52-44.png	Screenshot From 2023 08 31 14 52 44	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:13:25.166919+00	\N	2023-09-13 13:13:25.231+00	\N	10562	431	137	\N	\N	\N	\N	\N	{}
879880c6-7462-4a73-9ba0-92c37c78e9be	local	879880c6-7462-4a73-9ba0-92c37c78e9be.jpg	113.jpg	113	image/jpeg	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:14:24.729684+00	\N	2023-09-13 13:14:24.803+00	\N	185862	1621	1080	\N	\N	\N	\N	\N	{}
9ba6a256-ee7d-48a5-81b5-b690b2fd6b53	local	9ba6a256-ee7d-48a5-81b5-b690b2fd6b53.jpeg	drstone.jpeg	Drstone	image/jpeg	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:15:06.112891+00	\N	2023-09-13 13:15:06.175+00	\N	14936	225	224	\N	\N	\N	\N	\N	{}
fda55e34-ab43-4892-8c96-5d4be8bc829e	local	fda55e34-ab43-4892-8c96-5d4be8bc829e.png	Screenshot from 2023-09-12 11-27-24.png	Screenshot From 2023 09 12 11 27 24	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:27:01.606002+00	\N	2023-09-13 13:27:01.648+00	\N	48171	867	581	\N	\N	\N	\N	\N	{}
383885c2-2940-4c53-a5af-682ca4183768	local	383885c2-2940-4c53-a5af-682ca4183768.webp	sil2.webp	Sil2	image/webp	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:27:55.091188+00	\N	2023-09-13 13:27:55.156+00	\N	18144	1320	583	\N	\N	\N	\N	\N	{}
0ba9c34a-5450-41b2-a023-703acfa9f73e	local	0ba9c34a-5450-41b2-a023-703acfa9f73e.png	Screenshot from 2023-08-11 20-33-44.png	Screenshot From 2023 08 11 20 33 44	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:27:58.86934+00	\N	2023-09-13 13:27:58.925+00	\N	121844	895	651	\N	\N	\N	\N	\N	{}
5ae2fcb3-e736-477c-9472-b7ca5f85f02e	local	5ae2fcb3-e736-477c-9472-b7ca5f85f02e.json	Reward.json	Reward	application/json	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:28:24.620593+00	\N	2023-09-13 13:28:24.671+00	\N	5922	\N	\N	\N	\N	\N	\N	\N	\N
207455fa-3ace-4f8f-8f73-076cd9573b22	local	207455fa-3ace-4f8f-8f73-076cd9573b22.png	close.png	Close	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:36:34.084364+00	\N	2023-09-13 13:36:34.137+00	\N	267	60	60	\N	\N	\N	\N	\N	{}
bef10624-bbd8-4171-9b26-77ffed31b53a	local	bef10624-bbd8-4171-9b26-77ffed31b53a.png	check.png	Check	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:39:54.827827+00	\N	2023-09-13 13:39:54.879+00	\N	275	72	72	\N	\N	\N	\N	\N	{}
d8f5407a-c337-4528-bdb7-8b861017444e	local	d8f5407a-c337-4528-bdb7-8b861017444e.png	News - State Off.png	News   State Off	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:41:08.004155+00	\N	2023-09-13 13:41:08.062+00	\N	8048	1000	1000	\N	\N	\N	\N	\N	{}
08e70613-f77e-4d96-8575-3c312c6b8840	local	08e70613-f77e-4d96-8575-3c312c6b8840.png	Reward - State Off.png	Reward   State Off	image/png	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-13 13:41:38.059403+00	\N	2023-09-13 13:41:38.11+00	\N	10441	1000	1000	\N	\N	\N	\N	\N	{}
\.


--
-- Data for Name: directus_flows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_flows (id, name, icon, color, description, status, trigger, accountability, options, operation, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_folders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_folders (id, name, parent) FROM stdin;
\.


--
-- Data for Name: directus_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_migrations (version, name, "timestamp") FROM stdin;
20201028A	Remove Collection Foreign Keys	2023-09-04 09:05:55.437173+00
20201029A	Remove System Relations	2023-09-04 09:05:55.450198+00
20201029B	Remove System Collections	2023-09-04 09:05:55.459955+00
20201029C	Remove System Fields	2023-09-04 09:05:55.482249+00
20201105A	Add Cascade System Relations	2023-09-04 09:05:55.583505+00
20201105B	Change Webhook URL Type	2023-09-04 09:05:55.597708+00
20210225A	Add Relations Sort Field	2023-09-04 09:05:55.609861+00
20210304A	Remove Locked Fields	2023-09-04 09:05:55.619251+00
20210312A	Webhooks Collections Text	2023-09-04 09:05:55.635262+00
20210331A	Add Refresh Interval	2023-09-04 09:05:55.645176+00
20210415A	Make Filesize Nullable	2023-09-04 09:05:55.663452+00
20210416A	Add Collections Accountability	2023-09-04 09:05:55.675957+00
20210422A	Remove Files Interface	2023-09-04 09:05:55.684285+00
20210506A	Rename Interfaces	2023-09-04 09:05:55.750167+00
20210510A	Restructure Relations	2023-09-04 09:05:55.800596+00
20210518A	Add Foreign Key Constraints	2023-09-04 09:05:55.821962+00
20210519A	Add System Fk Triggers	2023-09-04 09:05:55.892768+00
20210521A	Add Collections Icon Color	2023-09-04 09:05:55.904558+00
20210525A	Add Insights	2023-09-04 09:05:55.938812+00
20210608A	Add Deep Clone Config	2023-09-04 09:05:55.944567+00
20210626A	Change Filesize Bigint	2023-09-04 09:05:55.977764+00
20210716A	Add Conditions to Fields	2023-09-04 09:05:55.987127+00
20210721A	Add Default Folder	2023-09-04 09:05:56.003387+00
20210802A	Replace Groups	2023-09-04 09:05:56.016776+00
20210803A	Add Required to Fields	2023-09-04 09:05:56.026895+00
20210805A	Update Groups	2023-09-04 09:05:56.036975+00
20210805B	Change Image Metadata Structure	2023-09-04 09:05:56.047175+00
20210811A	Add Geometry Config	2023-09-04 09:05:56.055774+00
20210831A	Remove Limit Column	2023-09-04 09:05:56.064181+00
20210903A	Add Auth Provider	2023-09-04 09:05:56.108737+00
20210907A	Webhooks Collections Not Null	2023-09-04 09:05:56.126845+00
20210910A	Move Module Setup	2023-09-04 09:05:56.139077+00
20210920A	Webhooks URL Not Null	2023-09-04 09:05:56.158683+00
20210924A	Add Collection Organization	2023-09-04 09:05:56.171817+00
20210927A	Replace Fields Group	2023-09-04 09:05:56.193837+00
20210927B	Replace M2M Interface	2023-09-04 09:05:56.202017+00
20210929A	Rename Login Action	2023-09-04 09:05:56.208999+00
20211007A	Update Presets	2023-09-04 09:05:56.227231+00
20211009A	Add Auth Data	2023-09-04 09:05:56.236407+00
20211016A	Add Webhook Headers	2023-09-04 09:05:56.242701+00
20211103A	Set Unique to User Token	2023-09-04 09:05:56.258021+00
20211103B	Update Special Geometry	2023-09-04 09:05:56.268018+00
20211104A	Remove Collections Listing	2023-09-04 09:05:56.278036+00
20211118A	Add Notifications	2023-09-04 09:05:56.31504+00
20211211A	Add Shares	2023-09-04 09:05:56.356186+00
20211230A	Add Project Descriptor	2023-09-04 09:05:56.364366+00
20220303A	Remove Default Project Color	2023-09-04 09:05:56.382734+00
20220308A	Add Bookmark Icon and Color	2023-09-04 09:05:56.393054+00
20220314A	Add Translation Strings	2023-09-04 09:05:56.402153+00
20220322A	Rename Field Typecast Flags	2023-09-04 09:05:56.413481+00
20220323A	Add Field Validation	2023-09-04 09:05:56.422695+00
20220325A	Fix Typecast Flags	2023-09-04 09:05:56.43381+00
20220325B	Add Default Language	2023-09-04 09:05:56.457176+00
20220402A	Remove Default Value Panel Icon	2023-09-04 09:05:56.478895+00
20220429A	Add Flows	2023-09-04 09:05:56.569136+00
20220429B	Add Color to Insights Icon	2023-09-04 09:05:56.578038+00
20220429C	Drop Non Null From IP of Activity	2023-09-04 09:05:56.587052+00
20220429D	Drop Non Null From Sender of Notifications	2023-09-04 09:05:56.595797+00
20220614A	Rename Hook Trigger to Event	2023-09-04 09:05:56.603547+00
20220801A	Update Notifications Timestamp Column	2023-09-04 09:05:56.632716+00
20220802A	Add Custom Aspect Ratios	2023-09-04 09:05:56.638843+00
20220826A	Add Origin to Accountability	2023-09-04 09:05:56.654067+00
20230401A	Update Material Icons	2023-09-04 09:05:56.671013+00
20230525A	Add Preview Settings	2023-09-04 09:05:56.678083+00
20230526A	Migrate Translation Strings	2023-09-04 09:05:56.701885+00
20230721A	Require Shares Fields	2023-09-04 09:05:56.711918+00
\.


--
-- Data for Name: directus_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_notifications (id, "timestamp", status, recipient, sender, subject, message, collection, item) FROM stdin;
\.


--
-- Data for Name: directus_operations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_operations (id, name, key, type, position_x, position_y, options, resolve, reject, flow, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_panels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_panels (id, dashboard, name, icon, color, show_header, note, type, position_x, position_y, width, height, options, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_permissions (id, role, collection, action, permissions, validation, presets, fields) FROM stdin;
1	\N	directus_files	read	{}	{}	\N	*
2	\N	directus_files	create	{}	{}	\N	*
3	\N	directus_files	update	{}	{}	\N	*
\.


--
-- Data for Name: directus_presets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_presets (id, bookmark, "user", role, collection, search, layout, layout_query, layout_options, refresh_interval, filter, icon, color) FROM stdin;
5	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	tag	\N	\N	{"tabular":{"page":1}}	\N	\N	\N	bookmark	\N
2	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	_ArticleToTag	\N	\N	\N	\N	\N	\N	bookmark	\N
7	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	Like	\N	\N	\N	\N	\N	\N	bookmark	\N
8	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	_prisma_migrations	\N	\N	{"tabular":{"page":1}}	\N	\N	\N	bookmark	\N
3	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	Bookmark	\N	\N	{"tabular":{"page":1}}	\N	\N	\N	bookmark	\N
1	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	users	\N	\N	{"tabular":{"limit":25,"page":1}}	\N	\N	\N	bookmark	\N
4	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	articles	\N	\N	{"tabular":{"limit":25,"page":1}}	\N	\N	\N	bookmark	\N
9	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	directus_users	\N	cards	{"cards":{"sort":["email"],"limit":25}}	{"cards":{"icon":"account_circle","title":"{{ first_name }} {{ last_name }}","subtitle":"{{ email }}","size":4}}	\N	\N	bookmark	\N
10	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	directus_files	\N	cards	{"cards":{"sort":["-uploaded_on"],"limit":25}}	{"cards":{"icon":"insert_drive_file","title":"{{ title }}","subtitle":"{{ type }} • {{ filesize }}","size":4,"imageFit":"crop"}}	\N	\N	bookmark	\N
6	\N	e4c3c919-2788-48c7-8e14-24f7f90c90c0	\N	Comment	\N	\N	{"tabular":{"page":1,"limit":25,"sort":["content"]}}	\N	\N	\N	bookmark	\N
\.


--
-- Data for Name: directus_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_relations (id, many_collection, many_field, one_collection, one_field, one_collection_field, one_allowed_collections, junction_field, sort_field, one_deselect_action) FROM stdin;
1	articles_files	directus_files_id	directus_files	\N	\N	\N	articles_id	\N	nullify
2	articles_files	articles_id	articles	files	\N	\N	directus_files_id	\N	nullify
3	Comment	file	directus_files	\N	\N	\N	\N	\N	nullify
\.


--
-- Data for Name: directus_revisions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_revisions (id, activity, collection, item, data, delta, parent) FROM stdin;
1	2	directus_collections	Bookmark	{"collection":"Bookmark"}	{"collection":"Bookmark"}	\N
2	3	directus_collections	Comment	{"collection":"Comment"}	{"collection":"Comment"}	\N
3	4	directus_collections	Follows	{"collection":"Follows"}	{"collection":"Follows"}	\N
4	5	directus_collections	Like	{"collection":"Like"}	{"collection":"Like"}	\N
5	6	directus_collections	_ArticleToTag	{"collection":"_ArticleToTag"}	{"collection":"_ArticleToTag"}	\N
6	7	directus_collections	_TagToUser	{"collection":"_TagToUser"}	{"collection":"_TagToUser"}	\N
7	8	directus_collections	_prisma_migrations	{"collection":"_prisma_migrations"}	{"collection":"_prisma_migrations"}	\N
8	9	directus_collections	articles	{"collection":"articles"}	{"collection":"articles"}	\N
9	10	directus_collections	tag	{"collection":"tag"}	{"collection":"tag"}	\N
10	11	directus_collections	users	{"collection":"users"}	{"collection":"users"}	\N
11	12	directus_fields	1	{"special":null,"collection":"articles","field":"chude"}	{"special":null,"collection":"articles","field":"chude"}	\N
12	13	directus_fields	2	{"special":null,"collection":"articles","field":"id"}	{"special":null,"collection":"articles","field":"id"}	\N
13	14	directus_fields	3	{"special":null,"collection":"articles","field":"title"}	{"special":null,"collection":"articles","field":"title"}	\N
14	15	directus_fields	4	{"special":null,"collection":"articles","field":"content"}	{"special":null,"collection":"articles","field":"content"}	\N
15	16	directus_fields	5	{"special":null,"collection":"articles","field":"thumbnail"}	{"special":null,"collection":"articles","field":"thumbnail"}	\N
16	17	directus_fields	6	{"special":null,"collection":"articles","field":"views"}	{"special":null,"collection":"articles","field":"views"}	\N
17	18	directus_fields	7	{"special":null,"collection":"articles","field":"userId"}	{"special":null,"collection":"articles","field":"userId"}	\N
18	19	directus_fields	8	{"special":null,"collection":"articles","field":"createdAt"}	{"special":null,"collection":"articles","field":"createdAt"}	\N
19	20	directus_fields	9	{"special":null,"collection":"articles","field":"updatedAt"}	{"special":null,"collection":"articles","field":"updatedAt"}	\N
20	21	directus_fields	10	{"sort":1,"interface":"files","special":["files"],"collection":"articles","field":"files"}	{"sort":1,"interface":"files","special":["files"],"collection":"articles","field":"files"}	\N
21	22	directus_fields	11	{"sort":1,"hidden":true,"field":"id","collection":"articles_files"}	{"sort":1,"hidden":true,"field":"id","collection":"articles_files"}	\N
22	23	directus_collections	articles_files	{"hidden":true,"icon":"import_export","collection":"articles_files"}	{"hidden":true,"icon":"import_export","collection":"articles_files"}	\N
23	24	directus_fields	12	{"sort":2,"hidden":true,"collection":"articles_files","field":"articles_id"}	{"sort":2,"hidden":true,"collection":"articles_files","field":"articles_id"}	\N
24	25	directus_fields	13	{"sort":3,"hidden":true,"collection":"articles_files","field":"directus_files_id"}	{"sort":3,"hidden":true,"collection":"articles_files","field":"directus_files_id"}	\N
25	26	directus_fields	14	{"special":null,"collection":"users","field":"id"}	{"special":null,"collection":"users","field":"id"}	\N
26	27	directus_fields	15	{"special":null,"collection":"users","field":"email"}	{"special":null,"collection":"users","field":"email"}	\N
27	28	directus_fields	16	{"special":null,"collection":"users","field":"avatar"}	{"special":null,"collection":"users","field":"avatar"}	\N
28	29	directus_fields	17	{"special":null,"collection":"users","field":"password"}	{"special":null,"collection":"users","field":"password"}	\N
29	30	directus_fields	18	{"special":null,"collection":"users","field":"firstName"}	{"special":null,"collection":"users","field":"firstName"}	\N
30	31	directus_fields	19	{"special":null,"collection":"users","field":"lastName"}	{"special":null,"collection":"users","field":"lastName"}	\N
31	32	directus_fields	20	{"special":null,"collection":"users","field":"role"}	{"special":null,"collection":"users","field":"role"}	\N
32	33	directus_fields	21	{"special":null,"collection":"users","field":"provider"}	{"special":null,"collection":"users","field":"provider"}	\N
33	34	directus_fields	22	{"special":null,"collection":"users","field":"refreshToken"}	{"special":null,"collection":"users","field":"refreshToken"}	\N
34	35	directus_fields	23	{"special":null,"collection":"users","field":"createdAt"}	{"special":null,"collection":"users","field":"createdAt"}	\N
35	36	directus_fields	24	{"special":null,"collection":"users","field":"updatedAt"}	{"special":null,"collection":"users","field":"updatedAt"}	\N
36	37	directus_fields	25	{"special":null,"collection":"users","field":"github"}	{"special":null,"collection":"users","field":"github"}	\N
37	38	directus_fields	26	{"special":null,"collection":"users","field":"linkedin"}	{"special":null,"collection":"users","field":"linkedin"}	\N
38	39	directus_fields	27	{"sort":1,"interface":"input","special":null,"collection":"users","field":"title"}	{"sort":1,"interface":"input","special":null,"collection":"users","field":"title"}	\N
39	40	directus_collections	Like	{"collection":"Like","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
40	41	directus_collections	Follows	{"collection":"Follows","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
41	42	directus_collections	Comment	{"collection":"Comment","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
42	43	directus_collections	_ArticleToTag	{"collection":"_ArticleToTag","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
43	44	directus_collections	_TagToUser	{"collection":"_TagToUser","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
44	45	directus_collections	_prisma_migrations	{"collection":"_prisma_migrations","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
45	46	directus_collections	tag	{"collection":"tag","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
46	47	directus_collections	Bookmark	{"collection":"Bookmark","icon":null,"note":null,"display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":true}	\N
47	48	directus_settings	1	{"module_bar":[{"type":"module","id":"content","enabled":true},{"type":"module","id":"users","enabled":true},{"type":"module","id":"files","enabled":true},{"type":"module","id":"insights","enabled":true},{"type":"module","id":"settings","enabled":true,"locked":true}]}	{"module_bar":[{"type":"module","id":"content","enabled":true},{"type":"module","id":"users","enabled":true},{"type":"module","id":"files","enabled":true},{"type":"module","id":"insights","enabled":true},{"type":"module","id":"settings","enabled":true,"locked":true}]}	\N
48	49	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":null,"project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":[{"type":"module","id":"content","enabled":true},{"type":"module","id":"users","enabled":true},{"type":"module","id":"files","enabled":true},{"type":"module","id":"insights","enabled":true},{"type":"module","id":"settings","enabled":true,"locked":true}],"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null}	{"module_bar":[{"type":"module","id":"content","enabled":true},{"type":"module","id":"users","enabled":true},{"type":"module","id":"files","enabled":true},{"type":"module","id":"insights","enabled":true},{"type":"module","id":"settings","enabled":true,"locked":true}]}	\N
49	50	directus_permissions	1	{"role":null,"collection":"directus_files","action":"read","fields":["*"],"permissions":{},"validation":{}}	{"role":null,"collection":"directus_files","action":"read","fields":["*"],"permissions":{},"validation":{}}	\N
50	51	directus_permissions	2	{"role":null,"collection":"directus_files","action":"create","fields":["*"],"permissions":{},"validation":{}}	{"role":null,"collection":"directus_files","action":"create","fields":["*"],"permissions":{},"validation":{}}	\N
51	52	directus_files	02aa2df1-fd5c-42d7-ab66-d6002785573f	{"title":"File","filename_download":"file","type":"image/png","storage":"local"}	{"title":"File","filename_download":"file","type":"image/png","storage":"local"}	\N
52	53	directus_files	2654b6d6-078a-4327-8592-8269d58fe2fe	{"title":"Reward   State Off","filename_download":"Reward - State Off.png","type":"image/png","storage":"local"}	{"title":"Reward   State Off","filename_download":"Reward - State Off.png","type":"image/png","storage":"local"}	\N
53	54	directus_permissions	3	{"role":null,"collection":"directus_files","action":"update","fields":["*"],"permissions":{},"validation":{}}	{"role":null,"collection":"directus_files","action":"update","fields":["*"],"permissions":{},"validation":{}}	\N
54	55	directus_files	ccc412b0-e892-4a20-9746-7a68dab0c153	{"title":"Close","filename_download":"close.png","type":"image/png","storage":"local"}	{"title":"Close","filename_download":"close.png","type":"image/png","storage":"local"}	\N
55	56	directus_users	e4c3c919-2788-48c7-8e14-24f7f90c90c0	{"id":"e4c3c919-2788-48c7-8e14-24f7f90c90c0","first_name":"Admin","last_name":"User","email":"holoc22102001@gmail.com","password":"**********","location":null,"title":null,"description":null,"tags":null,"avatar":null,"language":null,"theme":"auto","tfa_secret":null,"status":"active","role":"90c808a3-7c14-447c-874f-b1c39b32c52b","token":"**********","last_access":"2023-09-12T13:05:34.875Z","last_page":"/users/e4c3c919-2788-48c7-8e14-24f7f90c90c0","provider":"default","external_identifier":null,"auth_data":null,"email_notifications":true}	{"token":"**********"}	\N
56	57	directus_files	0331f1bb-e2e0-401e-9763-d8dcf9c83d88	{"title":"Nhasach","filename_download":"nhasach.jpg","type":"image/jpeg","storage":"local"}	{"title":"Nhasach","filename_download":"nhasach.jpg","type":"image/jpeg","storage":"local"}	\N
57	59	directus_files	507f6885-f5a0-469f-9283-0b1d9a2e1c9b	{"title":"Nhasach","filename_download":"nhasach.jpg","type":"image/jpeg","storage":"local"}	{"title":"Nhasach","filename_download":"nhasach.jpg","type":"image/jpeg","storage":"local"}	\N
58	60	directus_files	6f7edad2-aace-4734-90aa-48540c89db02	{"title":"Check","filename_download":"check.png","type":"image/png","storage":"local"}	{"title":"Check","filename_download":"check.png","type":"image/png","storage":"local"}	\N
59	64	directus_files	703aead2-7095-4558-887d-0116e0149b25	{"title":"Reward","filename_download":"Reward.json","type":"application/json","storage":"local"}	{"title":"Reward","filename_download":"Reward.json","type":"application/json","storage":"local"}	\N
60	65	directus_files	548d6ffd-dfa2-4fe0-8392-8b5fb58a9ef3	{"title":"Onboarding","filename_download":"Onboarding.png","type":"image/png","storage":"local"}	{"title":"Onboarding","filename_download":"Onboarding.png","type":"image/png","storage":"local"}	\N
61	66	directus_files	b382a96a-4a03-4c91-80ed-4aa2130b4788	{"title":"Screenshot From 2023 08 31 10 12 45","filename_download":"Screenshot from 2023-08-31 10-12-45.png","type":"image/png","storage":"local"}	{"title":"Screenshot From 2023 08 31 10 12 45","filename_download":"Screenshot from 2023-08-31 10-12-45.png","type":"image/png","storage":"local"}	\N
62	67	directus_collections	Comment	{"collection":"Comment","icon":null,"note":null,"display_template":null,"hidden":false,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null}	{"hidden":false}	\N
63	68	directus_fields	28	{"special":null,"collection":"Comment","field":"id"}	{"special":null,"collection":"Comment","field":"id"}	\N
64	69	directus_fields	29	{"special":null,"collection":"Comment","field":"userId"}	{"special":null,"collection":"Comment","field":"userId"}	\N
65	70	directus_fields	30	{"special":null,"collection":"Comment","field":"content"}	{"special":null,"collection":"Comment","field":"content"}	\N
66	71	directus_fields	31	{"special":null,"collection":"Comment","field":"articleId"}	{"special":null,"collection":"Comment","field":"articleId"}	\N
67	72	directus_fields	32	{"special":null,"collection":"Comment","field":"createdAt"}	{"special":null,"collection":"Comment","field":"createdAt"}	\N
70	75	directus_fields	28	{"id":28,"collection":"Comment","field":"id","special":null,"interface":null,"options":null,"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":1,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"Comment","field":"id","sort":1,"group":null}	\N
71	76	directus_fields	29	{"id":29,"collection":"Comment","field":"userId","special":null,"interface":null,"options":null,"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":2,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"Comment","field":"userId","sort":2,"group":null}	\N
72	77	directus_fields	34	{"id":34,"collection":"Comment","field":"file","special":["file"],"interface":"file","options":null,"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":3,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"Comment","field":"file","sort":3,"group":null}	\N
73	78	directus_fields	30	{"id":30,"collection":"Comment","field":"content","special":null,"interface":null,"options":null,"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":4,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"Comment","field":"content","sort":4,"group":null}	\N
74	79	directus_fields	31	{"id":31,"collection":"Comment","field":"articleId","special":null,"interface":null,"options":null,"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":5,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"Comment","field":"articleId","sort":5,"group":null}	\N
75	80	directus_fields	32	{"id":32,"collection":"Comment","field":"createdAt","special":null,"interface":null,"options":null,"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":6,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"Comment","field":"createdAt","sort":6,"group":null}	\N
76	81	directus_fields	33	{"id":33,"collection":"Comment","field":"updatedAt","special":null,"interface":null,"options":null,"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":7,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"Comment","field":"updatedAt","sort":7,"group":null}	\N
68	73	directus_fields	33	{"special":null,"collection":"Comment","field":"updatedAt"}	{"special":null,"collection":"Comment","field":"updatedAt"}	\N
69	74	directus_fields	34	{"sort":1,"interface":"file","special":["file"],"collection":"Comment","field":"file"}	{"sort":1,"interface":"file","special":["file"],"collection":"Comment","field":"file"}	\N
77	82	directus_files	97bbce77-713b-4a87-9800-22d59b9050fd	{"title":"Screenshot From 2023 09 06 08 25 47","filename_download":"Screenshot from 2023-09-06 08-25-47.png","type":"image/png","storage":"local"}	{"title":"Screenshot From 2023 09 06 08 25 47","filename_download":"Screenshot from 2023-09-06 08-25-47.png","type":"image/png","storage":"local"}	\N
78	83	directus_files	35b517d2-6e6f-42b8-9610-5f63fe395c31	{"title":"Screenshot From 2023 08 31 14 52 44","filename_download":"Screenshot from 2023-08-31 14-52-44.png","type":"image/png","storage":"local"}	{"title":"Screenshot From 2023 08 31 14 52 44","filename_download":"Screenshot from 2023-08-31 14-52-44.png","type":"image/png","storage":"local"}	\N
79	84	directus_files	879880c6-7462-4a73-9ba0-92c37c78e9be	{"title":"113","filename_download":"113.jpg","type":"image/jpeg","storage":"local"}	{"title":"113","filename_download":"113.jpg","type":"image/jpeg","storage":"local"}	\N
80	85	directus_files	9ba6a256-ee7d-48a5-81b5-b690b2fd6b53	{"title":"Drstone","filename_download":"drstone.jpeg","type":"image/jpeg","storage":"local"}	{"title":"Drstone","filename_download":"drstone.jpeg","type":"image/jpeg","storage":"local"}	\N
81	86	directus_files	fda55e34-ab43-4892-8c96-5d4be8bc829e	{"title":"Screenshot From 2023 09 12 11 27 24","filename_download":"Screenshot from 2023-09-12 11-27-24.png","type":"image/png","storage":"local"}	{"title":"Screenshot From 2023 09 12 11 27 24","filename_download":"Screenshot from 2023-09-12 11-27-24.png","type":"image/png","storage":"local"}	\N
82	87	directus_files	383885c2-2940-4c53-a5af-682ca4183768	{"title":"Sil2","filename_download":"sil2.webp","type":"image/webp","storage":"local"}	{"title":"Sil2","filename_download":"sil2.webp","type":"image/webp","storage":"local"}	\N
83	88	directus_files	0ba9c34a-5450-41b2-a023-703acfa9f73e	{"title":"Screenshot From 2023 08 11 20 33 44","filename_download":"Screenshot from 2023-08-11 20-33-44.png","type":"image/png","storage":"local"}	{"title":"Screenshot From 2023 08 11 20 33 44","filename_download":"Screenshot from 2023-08-11 20-33-44.png","type":"image/png","storage":"local"}	\N
84	89	directus_files	5ae2fcb3-e736-477c-9472-b7ca5f85f02e	{"title":"Reward","filename_download":"Reward.json","type":"application/json","storage":"local"}	{"title":"Reward","filename_download":"Reward.json","type":"application/json","storage":"local"}	\N
85	90	directus_files	207455fa-3ace-4f8f-8f73-076cd9573b22	{"title":"Close","filename_download":"close.png","type":"image/png","storage":"local"}	{"title":"Close","filename_download":"close.png","type":"image/png","storage":"local"}	\N
86	91	Comment	7	{"id":7,"userId":1,"content":"dasd","articleId":4,"createdAt":"2023-09-13T13:27:59","updatedAt":"2023-09-13T13:27:59","file":"0ba9c34a-5450-41b2-a023-703acfa9f73e"}	{"articleId":4}	\N
87	92	directus_files	bef10624-bbd8-4171-9b26-77ffed31b53a	{"title":"Check","filename_download":"check.png","type":"image/png","storage":"local"}	{"title":"Check","filename_download":"check.png","type":"image/png","storage":"local"}	\N
88	93	directus_files	d8f5407a-c337-4528-bdb7-8b861017444e	{"title":"News   State Off","filename_download":"News - State Off.png","type":"image/png","storage":"local"}	{"title":"News   State Off","filename_download":"News - State Off.png","type":"image/png","storage":"local"}	\N
89	94	directus_files	08e70613-f77e-4d96-8575-3c312c6b8840	{"title":"Reward   State Off","filename_download":"Reward - State Off.png","type":"image/png","storage":"local"}	{"title":"Reward   State Off","filename_download":"Reward - State Off.png","type":"image/png","storage":"local"}	\N
\.


--
-- Data for Name: directus_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_roles (id, name, icon, description, ip_access, enforce_tfa, admin_access, app_access) FROM stdin;
90c808a3-7c14-447c-874f-b1c39b32c52b	Administrator	verified	$t:admin_description	\N	f	t	t
\.


--
-- Data for Name: directus_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_sessions (token, "user", expires, ip, user_agent, share, origin) FROM stdin;
G_tS7aQeyIMxUWprg5UioS76wo_XGupbJe7ci_K0RnZugi__1iN-71R2P4Qg2I7-	e4c3c919-2788-48c7-8e14-24f7f90c90c0	2023-09-20 13:38:51.292+00	172.24.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36	\N	http://localhost:8057
\.


--
-- Data for Name: directus_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_settings (id, project_name, project_url, project_color, project_logo, public_foreground, public_background, public_note, auth_login_attempts, auth_password_policy, storage_asset_transform, storage_asset_presets, custom_css, storage_default_folder, basemaps, mapbox_key, module_bar, project_descriptor, default_language, custom_aspect_ratios) FROM stdin;
1	Directus	\N	\N	\N	\N	\N	\N	25	\N	all	\N	\N	\N	\N	\N	[{"type":"module","id":"content","enabled":true},{"type":"module","id":"users","enabled":true},{"type":"module","id":"files","enabled":true},{"type":"module","id":"insights","enabled":true},{"type":"module","id":"settings","enabled":true,"locked":true}]	\N	en-US	\N
\.


--
-- Data for Name: directus_shares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_shares (id, name, collection, item, role, password, user_created, date_created, date_start, date_end, times_used, max_uses) FROM stdin;
\.


--
-- Data for Name: directus_translations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_translations (id, language, key, value) FROM stdin;
\.


--
-- Data for Name: directus_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_users (id, first_name, last_name, email, password, location, title, description, tags, avatar, language, theme, tfa_secret, status, role, token, last_access, last_page, provider, external_identifier, auth_data, email_notifications) FROM stdin;
e4c3c919-2788-48c7-8e14-24f7f90c90c0	Admin	User	holoc22102001@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$Ni72JvZ5xQdSR3wSysc+qQ$zaQfrH7dOlms+QcA9/WaF2XW332/EB5CLEQCi2FaCC8	\N	\N	\N	\N	\N	\N	auto	\N	active	90c808a3-7c14-447c-874f-b1c39b32c52b	gxMtOafBAeY9SeByNghkKB5XysplUStn	2023-09-13 13:38:51.318+00	/content/Comment	default	\N	\N	t
\.


--
-- Data for Name: directus_webhooks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_webhooks (id, name, method, url, status, data, actions, collections, headers) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (name) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, avatar, password, "firstName", "lastName", role, provider, "refreshToken", "createdAt", "updatedAt", github, linkedin, title) FROM stdin;
1	htloc1900442@student.ctuet.edu.vn	https://lh3.googleusercontent.com/a/AAcHTte4nPOCV6ikIPOWtW983seBQQ21AcboyIazknVqlqZh=s96-c	\N	Ho Tan	Loc	USER	STUDENT	\N	2023-09-04 09:12:21.53	2023-09-09 00:30:26.368	\N	\N	\N
2	hotanloc2001@gmail.com	http://res.cloudinary.com/dxlsponnf/image/upload/v1694520083/t65trxjdctp8sdhnlqw6.jpg	$argon2id$v=19$m=65536,t=3,p=4$X/lIQhUZVPWFMOxzPcRH8A$kIU2rxLJQJgofa0LGJODNGJYdwUCdoYjyu51m7rnHF0	Hồ Tấn	Lộc	USER	GOOGLE	$argon2id$v=19$m=65536,t=3,p=4$MvuzyK5mOFycGNocfwntSg$Q2Xf8ahH3mEbOkXDR9BMp9MxT7feZyGklJK3mbg3GGU	2023-09-12 12:01:05.553	2023-09-13 13:00:47.397	\N	\N	\N
\.


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 14, true);


--
-- Name: articles_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_files_id_seq', 1, false);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 5, true);


--
-- Name: directus_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_activity_id_seq', 94, true);


--
-- Name: directus_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_fields_id_seq', 34, true);


--
-- Name: directus_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_notifications_id_seq', 1, false);


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_permissions_id_seq', 3, true);


--
-- Name: directus_presets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_presets_id_seq', 10, true);


--
-- Name: directus_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_relations_id_seq', 3, true);


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_revisions_id_seq', 89, true);


--
-- Name: directus_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_settings_id_seq', 1, true);


--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_webhooks_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: Bookmark Bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bookmark"
    ADD CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("userId", "articleId");


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Follows Follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId", "followingId");


--
-- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("userId", "articleId");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: articles_files articles_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles_files
    ADD CONSTRAINT articles_files_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: directus_activity directus_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_activity
    ADD CONSTRAINT directus_activity_pkey PRIMARY KEY (id);


--
-- Name: directus_collections directus_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_pkey PRIMARY KEY (collection);


--
-- Name: directus_dashboards directus_dashboards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_pkey PRIMARY KEY (id);


--
-- Name: directus_fields directus_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_fields
    ADD CONSTRAINT directus_fields_pkey PRIMARY KEY (id);


--
-- Name: directus_files directus_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_pkey PRIMARY KEY (id);


--
-- Name: directus_flows directus_flows_operation_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_operation_unique UNIQUE (operation);


--
-- Name: directus_flows directus_flows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_pkey PRIMARY KEY (id);


--
-- Name: directus_folders directus_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_pkey PRIMARY KEY (id);


--
-- Name: directus_migrations directus_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_migrations
    ADD CONSTRAINT directus_migrations_pkey PRIMARY KEY (version);


--
-- Name: directus_notifications directus_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_reject_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_unique UNIQUE (reject);


--
-- Name: directus_operations directus_operations_resolve_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_unique UNIQUE (resolve);


--
-- Name: directus_panels directus_panels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_pkey PRIMARY KEY (id);


--
-- Name: directus_permissions directus_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_pkey PRIMARY KEY (id);


--
-- Name: directus_presets directus_presets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_pkey PRIMARY KEY (id);


--
-- Name: directus_relations directus_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_relations
    ADD CONSTRAINT directus_relations_pkey PRIMARY KEY (id);


--
-- Name: directus_revisions directus_revisions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_pkey PRIMARY KEY (id);


--
-- Name: directus_roles directus_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_pkey PRIMARY KEY (id);


--
-- Name: directus_sessions directus_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_pkey PRIMARY KEY (token);


--
-- Name: directus_settings directus_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_pkey PRIMARY KEY (id);


--
-- Name: directus_shares directus_shares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_pkey PRIMARY KEY (id);


--
-- Name: directus_translations directus_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_translations
    ADD CONSTRAINT directus_translations_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_email_unique UNIQUE (email);


--
-- Name: directus_users directus_users_external_identifier_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_external_identifier_unique UNIQUE (external_identifier);


--
-- Name: directus_users directus_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_token_unique UNIQUE (token);


--
-- Name: directus_webhooks directus_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_pkey PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Comment_articleId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Comment_articleId_idx" ON public."Comment" USING btree ("articleId");


--
-- Name: Like_articleId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Like_articleId_idx" ON public."Like" USING btree ("articleId");


--
-- Name: _ArticleToTag_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON public."_ArticleToTag" USING btree ("A", "B");


--
-- Name: _ArticleToTag_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ArticleToTag_B_index" ON public."_ArticleToTag" USING btree ("B");


--
-- Name: _TagToUser_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_TagToUser_AB_unique" ON public."_TagToUser" USING btree ("A", "B");


--
-- Name: _TagToUser_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_TagToUser_B_index" ON public."_TagToUser" USING btree ("B");


--
-- Name: articles_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_id_idx ON public.articles USING btree (id);


--
-- Name: tag_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tag_name_idx ON public.tag USING btree (name);


--
-- Name: tag_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tag_name_key ON public.tag USING btree (name);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_id_idx ON public.users USING btree (id);


--
-- Name: Bookmark Bookmark_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bookmark"
    ADD CONSTRAINT "Bookmark_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.articles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Bookmark Bookmark_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bookmark"
    ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.articles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Follows Follows_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Follows Follows_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Like Like_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.articles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Like Like_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _ArticleToTag _ArticleToTag_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ArticleToTag"
    ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES public.articles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ArticleToTag _ArticleToTag_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ArticleToTag"
    ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES public.tag(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TagToUser _TagToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TagToUser"
    ADD CONSTRAINT "_TagToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public.tag(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TagToUser _TagToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TagToUser"
    ADD CONSTRAINT "_TagToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: articles_files articles_files_articles_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles_files
    ADD CONSTRAINT articles_files_articles_id_foreign FOREIGN KEY (articles_id) REFERENCES public.articles(id) ON DELETE SET NULL;


--
-- Name: articles_files articles_files_directus_files_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles_files
    ADD CONSTRAINT articles_files_directus_files_id_foreign FOREIGN KEY (directus_files_id) REFERENCES public.directus_files(id) ON DELETE SET NULL;


--
-- Name: articles articles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment comment_file_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT comment_file_foreign FOREIGN KEY (file) REFERENCES public.directus_files(id) ON DELETE SET NULL;


--
-- Name: directus_collections directus_collections_group_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_group_foreign FOREIGN KEY ("group") REFERENCES public.directus_collections(collection);


--
-- Name: directus_dashboards directus_dashboards_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_folder_foreign FOREIGN KEY (folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_modified_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_modified_by_foreign FOREIGN KEY (modified_by) REFERENCES public.directus_users(id);


--
-- Name: directus_files directus_files_uploaded_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_uploaded_by_foreign FOREIGN KEY (uploaded_by) REFERENCES public.directus_users(id);


--
-- Name: directus_flows directus_flows_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_folders directus_folders_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_folders(id);


--
-- Name: directus_notifications directus_notifications_recipient_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_recipient_foreign FOREIGN KEY (recipient) REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_notifications directus_notifications_sender_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_sender_foreign FOREIGN KEY (sender) REFERENCES public.directus_users(id);


--
-- Name: directus_operations directus_operations_flow_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_flow_foreign FOREIGN KEY (flow) REFERENCES public.directus_flows(id) ON DELETE CASCADE;


--
-- Name: directus_operations directus_operations_reject_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_foreign FOREIGN KEY (reject) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_resolve_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_foreign FOREIGN KEY (resolve) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_panels directus_panels_dashboard_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_dashboard_foreign FOREIGN KEY (dashboard) REFERENCES public.directus_dashboards(id) ON DELETE CASCADE;


--
-- Name: directus_panels directus_panels_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_permissions directus_permissions_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_activity_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_activity_foreign FOREIGN KEY (activity) REFERENCES public.directus_activity(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_revisions(id);


--
-- Name: directus_sessions directus_sessions_share_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_share_foreign FOREIGN KEY (share) REFERENCES public.directus_shares(id) ON DELETE CASCADE;


--
-- Name: directus_sessions directus_sessions_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_settings directus_settings_project_logo_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_project_logo_foreign FOREIGN KEY (project_logo) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_background_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_background_foreign FOREIGN KEY (public_background) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_foreground_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_foreground_foreign FOREIGN KEY (public_foreground) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_storage_default_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_storage_default_folder_foreign FOREIGN KEY (storage_default_folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_shares directus_shares_collection_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_users directus_users_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

