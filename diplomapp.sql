PGDMP  0    5                |         	   diplomapp    16.6 (Postgres.app)    16.1     %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    36142 	   diplomapp    DATABASE     u   CREATE DATABASE diplomapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE diplomapp;
                postgres    false            �            1259    36201    users    TABLE     =  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    patronymic character varying(255) NOT NULL,
    img character varying(255) DEFAULT 'default.png'::character varying,
    email character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    36200    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            )           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �           2604    36204    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            "          0    36201    users 
   TABLE DATA           {   COPY public.users (id, name, surname, patronymic, img, email, phone, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �       *           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    215            �           2606    36212    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    36214    users users_phone_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_key;
       public            postgres    false    216            �           2606    36210    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            "   �  x�}��N�@����"���\l�'��H�ȉqu3q���5�'���>@��Z	Q�g��Q�TH���,�����w�o�y��d�܀T�
��Pq	�t�G~��0���s�0B�d�Afd5.��V�+5�{�f!gr�^�P�U�秥_D�d��vs���Q6Ń��a�� ��� �2y�8����X������"L�'���`FM�"�6#{�����	��W'
q��ꖹc)�;��h��]��M�~v;��]ƃ�}_�����_r?s�ݵ~�}�?����[�����?ꪅ����^��G}��0��rY� �l#��a�MJ1��/��B�+g$;�-O60P�#o5����/���W��{7��f�+��z�>�iYZ�z%�g�����v��     