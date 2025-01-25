PGDMP  1    )                 }         	   diplomapp    16.6 (Postgres.app)    16.1     0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            3           1262    36216 	   diplomapp    DATABASE     u   CREATE DATABASE diplomapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE diplomapp;
                postgres    false            �            1259    36300    TrialLessons    TABLE     �  CREATE TABLE public."TrialLessons" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    age integer NOT NULL,
    message text,
    status character varying(255) DEFAULT 'Рассматривается'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."TrialLessons";
       public         heap    postgres    false            �            1259    36299    TrialLessons_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TrialLessons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."TrialLessons_id_seq";
       public          postgres    false    218            4           0    0    TrialLessons_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."TrialLessons_id_seq" OWNED BY public."TrialLessons".id;
          public          postgres    false    217            �            1259    36233    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    patronymic character varying(255) NOT NULL,
    img character varying(255) DEFAULT 'default.png'::character varying,
    email character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'USER'::character varying NOT NULL,
    "resetPasswordToken" character varying(255),
    "resetPasswordExpires" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    36232    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            5           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �           2604    36303    TrialLessons id    DEFAULT     v   ALTER TABLE ONLY public."TrialLessons" ALTER COLUMN id SET DEFAULT nextval('public."TrialLessons_id_seq"'::regclass);
 @   ALTER TABLE public."TrialLessons" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    36236    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            -          0    36300    TrialLessons 
   TABLE DATA           p   COPY public."TrialLessons" (id, name, phone, email, age, message, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   Y       +          0    36233    users 
   TABLE DATA           �   COPY public.users (id, name, surname, patronymic, img, email, phone, password, role, "resetPasswordToken", "resetPasswordExpires", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216          6           0    0    TrialLessons_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."TrialLessons_id_seq"', 19, true);
          public          postgres    false    217            7           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    215            �           2606    36308    TrialLessons TrialLessons_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."TrialLessons"
    ADD CONSTRAINT "TrialLessons_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."TrialLessons" DROP CONSTRAINT "TrialLessons_pkey";
       public            postgres    false    218            �           2606    36244    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    36246    users users_phone_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_key;
       public            postgres    false    216            �           2606    36242    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            -   �   x�u�A
�@E�3��}�0����ʃ���"ܩ�� �Gp(UDiϐ���[�@����/�B�^4PKw�V�-�i�z3`y��:^})=�I$��>c2��]Z�u]���*+��
���������u��iP܂BP�ᩥ��Q�؉�_���y��R�5�b��P{t��_dQ[Fr����`l�      +   C  x�e��N�@���)X�3L�L;��J���Tæ�b���b]��.\�j�&��0����b�$3s��8A�i~%f�k�!���y�����Wyd�N|�9�����-:�N�G�lt��B�ǉ�%�s��0F:B�����<u����u��8͸mE}3-f|��4��,W��Ԛ�V(����;�R;@�M�f�޲(PV R -����x����n�3�e�P$�ŧ\�f�\�fK�d=��*&���@����uT5�̌Y��q'�k��nfٕ��eƝ�09%Y��Z�B׏2�nm5Wr��PĔ�V�K�V�4ޕ     