--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

-- Started on 2022-12-10 10:11:50 MSK

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
-- TOC entry 209 (class 1259 OID 17170)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    date timestamp(6) without time zone NOT NULL,
    user_id bigint NOT NULL,
    video_id bigint NOT NULL,
    text character varying(255) NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 17175)
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    episode bigint NOT NULL,
    video_id bigint NOT NULL,
    file character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.content OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 17183)
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 17182)
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genre_id_seq OWNER TO postgres;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 211
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- TOC entry 213 (class 1259 OID 17191)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    user_id bigint NOT NULL,
    video_id bigint NOT NULL,
    episodes integer,
    rating character varying(255),
    state character varying(255)
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17199)
-- Name: studio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studio (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.studio OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 17198)
-- Name: studio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studio_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studio_id_seq OWNER TO postgres;

--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 214
-- Name: studio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studio_id_seq OWNED BY public.studio.id;


--
-- TOC entry 217 (class 1259 OID 17206)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id bigint NOT NULL,
    password character varying(255) NOT NULL,
    picture character varying(255),
    role character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17205)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 216
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 219 (class 1259 OID 17215)
-- Name: video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video (
    type character varying(31) NOT NULL,
    id bigint NOT NULL,
    description character varying(3000),
    image character varying(255),
    name character varying(255) NOT NULL,
    rating double precision NOT NULL,
    studio_id bigint,
    episodes bigint
);


ALTER TABLE public.video OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17214)
-- Name: video_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.video_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.video_id_seq OWNER TO postgres;

--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 218
-- Name: video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.video_id_seq OWNED BY public.video.id;


--
-- TOC entry 220 (class 1259 OID 17223)
-- Name: video_to_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_to_genre (
    video_id bigint NOT NULL,
    genre_id bigint NOT NULL
);


ALTER TABLE public.video_to_genre OWNER TO postgres;

--
-- TOC entry 3238 (class 2604 OID 17186)
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 17202)
-- Name: studio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studio ALTER COLUMN id SET DEFAULT nextval('public.studio_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 17209)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 17218)
-- Name: video id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video ALTER COLUMN id SET DEFAULT nextval('public.video_id_seq'::regclass);


--
-- TOC entry 3409 (class 0 OID 17170)
-- Dependencies: 209
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (date, user_id, video_id, text) FROM stdin;
\.


--
-- TOC entry 3410 (class 0 OID 17175)
-- Dependencies: 210
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (episode, video_id, file, name) FROM stdin;
\.


--
-- TOC entry 3412 (class 0 OID 17183)
-- Dependencies: 212
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, description, name) FROM stdin;
1	\N	Драма
2	\N	Фэнтези
3	\N	Повседневность
4	\N	Триллер
5	\N	Психологическое
6	\N	Комедия
7	\N	Романтика
8	\N	Школа
9	\N	Детектив
10	\N	Сёнен
11	\N	Фантастика
12	\N	Меха
13	\N	Экшен
14	\N	Ужасы
15	\N	Сверхъестественное
16	\N	Сэйнэн
\.


--
-- TOC entry 3413 (class 0 OID 17191)
-- Dependencies: 213
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (user_id, video_id, episodes, rating, state) FROM stdin;
2	4	13	9	ABANDONED
2	14	0	0	WATCHED
2	7	0	0	ABANDONED
2	16	0	0	PLANNED
2	6	12	10	WATCHING
2	1	0	7	WATCHING
2	8	6	0	WATCHING
2	5	5	10	WATCHED
\.


--
-- TOC entry 3415 (class 0 OID 17199)
-- Dependencies: 215
-- Data for Name: studio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studio (id, name, description) FROM stdin;
1	Kyoto Animation	\N
2	White Fox	\N
3	Gainax	\N
4	Madhouse	\N
\.


--
-- TOC entry 3417 (class 0 OID 17206)
-- Dependencies: 217
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, password, picture, role, username) FROM stdin;
1	$2a$10$e2PA2YXzURWEzIuhBUU54uaGIYaDqNEmY/bpkEzUmTolH/8KA/xSq	\N	ROLE_MODERATOR	aboba
2	$2a$10$g4eHeFRf/cYgmBpArBCW2.eV2vWcOJ/Rv7tLijqEOL48fLKg5yfw.	\N	ROLE_USER	userboba
4	$2a$10$Laq1zAPR.b2UggzGkOBS/.TkGeZm8FzXXesQdhqjfDsYaWhsE7XJ2	\N	ROLE_USER	abobus
5	$2a$10$qg/MlrVcnyf5lr2M1mm/8e5IAybXxs/0wcl/nl/jTIShlKvk.qm1.	\N	ROLE_USER	psevdobobus
6	$2a$10$9Ebs.R8OmYWSwcmPGOlteu5HKS2Xb8ZBnPghxhJ62e1j2pObxUSt.	\N	ROLE_USER	abcd
\.


--
-- TOC entry 3419 (class 0 OID 17215)
-- Dependencies: 219
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video (type, id, description, image, name, rating, studio_id, episodes) FROM stdin;
season	7	Юта Тогаси во времена средней школы пережил тяжёлый период переходного возраста, что-то вроде небольшого психического отклонения под названием «синдром восьмиклассника». Он надевал плащ, брал огромный меч и давал волю своей буйной фантазии, да так, что даже родители не могли вернуть его к реальности.\nНо вот Юта подрос и решил начать всё с чистого листа в старшей школе. Разложив все свои магические безделушки по коробкам, Юта хочет забыть тот позорный период юности и просто веселиться с одноклассниками, как обычный подросток. По воле случая, накануне первого дня обучения, у Юты на балконе оказывается странная девочка с повязкой на правом глазу. Как впоследствии узнаёт Юта, её зовут Рикка Таканаси, она учится с ним в одном классе и совершенно не дружит с головой. Девушка утверждает, что обладает сверхъестественными силами, борется со злом и её «дурной глаз» говорит, что им суждено быть вместе. Неужели с планами на обычную жизнь Юте можно распрощаться? А вдруг его «тёмное прошлое» выплывет наружу?	14741.jpg	Чудачества любви не помеха!	7	1	12
season	4	После бесчисленного количества смертей Субару наконец удалось победить Петельгейзе Романе-Конти. Казалось, все преграды пройдены и настал момент воссоединения с любимой Эмилией. Но случается непредвиденное: на повозку Рем и леди Круш нападают двое из Культа Ведьмы, вследствие чего девушки теряют память, а о Рем и вовсе все забывают. В свете последних событий Субару начинает понимать, что еще ничего не кончилось, но главное — Эмилия и его друзья находятся в большой опасности!	39587.jpg	Re:Zero. Жизнь с нуля в альтернативном мире 2 	8	2	13
season	5	Продолжение аниме-сериала «Re:Zero. Жизнь с нуля в альтернативном мире 2».\nПосле неудачных попыток помочь друзьям Субару оказывается в тупике. С одной стороны, ему хочется спасти всех, но с другой — кажется, что это невозможно. Кроме того, Субару, отвергнувшему предложение Ехидны, запрещают проход на испытания в Святилище. Вслед за этим раскрывается одна страшная тайна, полностью ломающая планы Субару и повергающая его в отчаяние.\nУ кого просить помощи? Что делать дальше? Кому можно доверять?	42203.jpg	Re:Zero. Жизнь с нуля в альтернативном мире 2. Часть 2	8	2	12
movie	1	Подобно миру взрослых, мир детей не терпит различий, выделяющих кого-то на фоне других, коих принято считать нормальными. Этот мир жесток, поскольку его обитатели, в отличие от обитателей мира взрослых, еще не успели научиться скрывать мерзкие мысли за напускной улыбкой. Многие вещи им непонятны, более того — неведомы. Дети прямолинейны. И поэтому очень жестоки.\nОднако все дети когда-нибудь вырастают. И оглядываясь назад, во времена школьной рутины, некоторым из них становится стыдно за свою юность.\nСложно представить, сколько лет должно пройти, пока до примерного задиры и разгильдяя дойдет, каким глупцом он был, когда веселья ради издевался над инвалидом. Кто-то об этом даже не вспомнит. А кто-то вроде Сёи возненавидит себя крепкой ненавистью. В младшей школе он умудрился превратить жизнь одноклассницы по имени Сёко в ад. Только потому, что та была глухая, не как все. И теперь, несколько лет спустя, хоть и запоздало, но мальчишка понял: чтобы сказать нечто важное тому, кто не может тебя услышать, вовсе не обязательно использовать голос.	28851.jpg	Форма голоса	9	1	1
season	8	Вайолет Эвергарден, молодая девушка, чья жизнь — не что иное, как война, послушно служит под командованием майора Гилберта Бугенвиллеи из армии Ляйденшафтлиха.\nПосле серьёзных увечий, оставивших её без рук и разделивших с Гилбертом, она покинула поле боя и была взята под опеку бывшим командующим армии Клаудией Ходжинсом, который после окончания войны основал почтовую службу «C-H» в крупном портовом городе Ляйден. Эта компания осуществляет регулярные почтовые пересылки и предоставляет услуги «автозапоминающих кукол» — талантливых девушек, в чьи обязанности входит написание писем и корректировка текста для большей части неграмотного населения города.\nВ конечном итоге, тронутая работой автозапоминающих кукол, Вайолет решает присоединиться к команде, чтобы узнать судьбу майора Гилберта и смысл последних слов, сказанных им: «Я люблю тебя».	33352.jpg	Вайолет Эвергарден	8	1	13
season	6	Хотаро Орэки, юноша, казалось бы, равнодушный ко всем и всему, считает, что, если что-то можно не делать, нужно просто не делать это. А если сделать всё же надо — делать как можно скорее.\nПо просьбе старшей сестры он вступает в клуб классической литературы, которому грозит закрытие, где встречает Эру Читанду, красивую, воспитанную и настолько же любознательную девушку, неизменный девиз которой: «Мне интересно!» Вскоре к клубу присоединяется одноклассник Хотаро — Сатоши Фукубэ, улыбчивый и озорной, да ещё с фантастической памятью, называющий себя «базой данных». Классическая литература привлекает всё больше людей, и вот у порога появляется Маяка Ибара, влюблённая в Сатоши, вечно уклоняющегося от её попыток сблизиться.\nВместе ребята начинают расследовать таинственный случай, произошедший 40 с лишним лет назад. Случай, следы которого уже почти исчезли со страниц собрания сочинений бывших участников клуба, на обложке которого можно прочесть незамысловатое название «Хёка».	12189.jpg	Хёка	8	1	22
season	2	Сняв в Акихабаре квартиру, самопровозглашённый сумасшедший учёный Окабэ Ринтаро устроил там «лабораторию» и в компании своей подруги детства Сины Маюри и хакера-отаку Хасиды Итару изобретает «гаджеты будущего». Троица отлично проводит время вместе, работая над совместным проектом — «мобиловолновкой», которой можно управлять с помощью текстовых сообщений.\nВскоре «сотрудники лаборатории» сталкиваются с чередой загадочных инцидентов, которые приводят к открытию, изменившему правила игры: «мобиловолновка» может отправлять электронные письма в прошлое и таким образом изменять историю.	9253.jpg	Врата Штейна	9	2	24
season	3	На обратном пути из магазина Субару Нацуки неожиданно призывают в другой мир. Стоит чёрт знает где, самого призывающего ни следа, а на него ещё и нападают! Дело было бы совсем дрянь, если бы не прекрасная сереброволосая дева с пушистым котиком наперевес, которая спасает Субару, после чего тот в благодарность присоединяется к ней. Стоит им найти подсказку — и обоих тут же убивают.\nСубару приходит в себя в том же месте, что в первый раз, и обнаруживает у себя неплохую способность — «Возврат в прошлое после смерти». Сможет ли беспомощный парень, умеющий только отматывать время, спасти девушку от смертельной участи?	31240.jpg	Re:Zero. Жизнь с нуля в альтернативном мире	8	2	25
movie	14	Наступает середина декабря, и глава бригады SOS Судзумия Харухи объявляет о том, что Рождество они проведут в комнате клуба за рождественским ужином. Все члены SOS начинают приготовления.\nСпустя пару дней по дороге в школу Кён начинает замечать странности: не вяжется разговор с Танигути, тот внезапно заболел и не помнит вчерашнего разговора. В классе нет Харухи, а Рёко Асакура ожила и сидит на её месте, разговаривая с Кёном как ни в чём не бывало. Микуру Асахина не узнает Кёна, а Нагато – обычная девушка и единственный член литературного клуба.\nНи бригады SOS, ни Харухи в этой школе никогда не существовало...	7311.jpg	Исчезновение Харухи Судзумии	8	1	1
movie	13	Вайолет продолжает помогать другим людям писать письма, выражая все чувства клиентов на бумаге. Однако она всё никак не может забыть о майоре Гилберте Бугенвиллее, который однажды дал ей возможность понять, что же значит «Я люблю тебя» и шанс начать жизнь с чистого листа.\nОднажды она встречает старшего брата Гилберта — Дитфрида, который всё твердит ей позабыть о прошлом, связанным с майором, и идти навстречу будущему, но она, конечно же, понимает, что это крайне трудно смириться с потерей дорогого человека и подавить огромную боль в душе. Вскоре после этого поступает заказ от очередного клиента, а на складе почтового отделения оказывается письмо без адреса получателя. Достигнет ли Вайолет цели, и что ждёт девушку в дальнейшем?	37987.jpg	Вайолет Эвергарден. Фильм	9	1	1
movie	16	После победы над последним Ангелом, у Nerv остался единственный враг — люди под командованием Seele. Впавшему в депрессию нерешительному Синдзи Икари предстоит сделать важный выбор: полностью принять существование человечества или отказаться от человеческой индивидуальности. Параллельно, командующий Nerv Гэндо Икари готовится инициировать проект совершенствования человечества, используя Рей Аянами и Лилит для реализации своей заветной мечты. Судьба мира висит на волоске, приближается решающая финальная битва.\n«Евангелион нового поколения: Конец Евангелиона» служит альтернативным финалом противоречивых последних эпизодов «Евангелион нового поколения».	32.jpg	Евангелион нового поколения: Конец Евангелиона	8	3	1
movie	15	В 2015 году на Землю вновь нападают Ангелы, загадочные существа, отличающиеся гигантскими размерами и сокрушительной силой. Единственной надеждой для спасения человечества являются Евангелионы (сокращённо — Евы), человекоподобные боевые машины, разработанные Nerv, специальным отделом Организации Объединённых Наций. Евы в состоянии отражать нападения Ангелов, однако есть одна особенность — пилотировать роботов может ограниченное число людей. Только горстка подростков, рождённых четырнадцать лет назад, через девять месяцев после первого появления Ангелов, может управлять Евами. Один из них — Синдзи Икари, отец которого является руководителем Nerv. Втянутый в водоворот битв и событий, которых он не понимает, Синдзи вынужден проникнуть в глубины собственного внутреннего мира, чтобы найти силы и храбрость не только для сражений, но и для выживания, иначе он рискует потерять всё.	30.jpg	Евангелион нового поколения	8	3	26
movie	17	В начале ХХI века в Антарктиде упал метеорит, что привело к таянию льдов и затоплению всех прибрежных территорий. По крайней мере, так звучала официальная версия. Мир на время погрузился в хаос, но позднее постепенно восстановился. Это событие получило название Второй удар.\n\nШкольника Синдзи Икари вызвал к себе его отец Гэндо Икари, являющийся главой могущественной организации Nerv. Под давлением отца и обстоятельств Синдзи начал пилотировать самое удивительное и разрушительное оружие людей — боевого робота Евангелион.\nНа Токио-3, где находится штаб квартира Nerv, напали странные существа, называемые Ангелами. Однако с течением времени Синдзи открывается правда о Втором ударе, Nerv и Ангелах. И его разум начинает медленно погружаться в пучины отчаяния.\nКомпиляция эпизодов сериала «Евангелион нового поколения» с несколькими переснятыми сценами.	31.jpg	Евангелион нового поколения: Смерть и перерождение	7	3	1
movie	19	Ангелы продолжают свои непрерывные атаки, а в Nerv появляются два новых пилота: пилот павшего в первом же бою Евангелиона-05 Мари Илластриэс Макинами и пилот Евы-02, а позже Евы-03 Аска Лэнгли Сикинами.\nВ то же время Гэндо Икари и Seele приступают к проекту совершенствования человечества, в котором задействованы Рей с Синдзи и загадочный мальчик Каору Нагиса.	3784.jpg	Евангелион 2.22: Ты (не) пройдёшь	8	3	1
movie	20	После событий второго фильма Синдзи Икари пробуждается спустя 14 лет. Он не понимает, что происходит, но постепенно ему открывается пугающая истина. В результате Синдзи придётся снова сражаться с Ангелами вместе с неожиданными союзниками, преодолевая сопротивление бывших друзей. И снова судьба бросит его на передовую войны и заставит принимать решение за всё человечество. Что же он выберет в этот раз?	3785.jpg	Евангелион 3.33: Ты (не) исправишь	7	3	1
movie	21	Оставшись после Четвёртого удара без своих Евангелионов, Синдзи, Аска и Рей находят убежище в одном из редких очагов человечества, которые всё ещё существуют на полуразрушенной Земле. Там каждый из них живёт своей жизнью, совсем не похожей на ту, которая была у них, когда они были пилотами Евы. Однако опасность для мира не миновала. На горизонте маячит новый Удар — тот, который окажется истинным концом Евангелиона. Наконец, запущен проект совершенствования человечества, и теперь Wille предстоит финальный изнурительный бой, чтобы предотвратить Последний удар.	3786.jpg	Евангелион 3.0+1.01: Как-то раз	8	3	1
movie	18	После Второго удара всё, что остаётся от Японии — это город Токио-3, подвергаемый постоянным атакам гигантских существ, стремящихся уничтожить человечество, называемых Ангелами.\nСиндзи Икари, до этого не видевшийся с отцом три года, получает от него телефонный звонок с требованием немедленно прибыть в штаб-квартиру Nerv, организации, противостоящей Ангелам. Для борьбы с Ангелами.Nerv используют гигантских роботов, называемых Евангелионами.\nЗадачей Синдзи становится пилотирование Евы-01 и работа в команде с пилотом Евы-00 Рей Аянами.	2759.jpg	Евангелион 1.11: Ты (не) один	8	3	1
movie	23	Мима Киригоэ, участница поп-группы «CHAM!», решает бросить карьеру певицы, чтобы попробовать себя в качестве актрисы. Некоторые её фанаты недовольны этим решением — в особенности невменяемый и начавший преследовать девушку парень, который называет себя Мэмания. По мере продвижения Мимы в новой карьере близкие ей люди погибают от рук жестокого убийцы, и вскоре Мима постепенно теряет способность отличать реальность от вымысла...	437.jpg	Идеальная грусть	8	4	1
season	25	«Хеллсинг», таинственная организация правительства Британии, вот уже несколько веков хранит покой людей, защищая их от существ ночи. Нынешняя глава организации, Интегра Фэйрбрук Уингейтс Хеллсинг руководит своей персональной армией, уничтожающей нежить. Но даже её самые умелые бойцы меркнут на фоне главного истребителя вампиров — Алукарда, который на самом деле является могущественным вампиром. Вместе с загадочным дворецким Интегры, Уолтером К. Дорнезом, и новой подчинённой Алукарда, Викторией Серас, организация «Хеллсинг» не только сдерживает натиск вампиров, упырей и некромантов, но и постоянно соперничает с секретным отделением Ватикана, а также противостоит «Милленниуму», таинственной группе бывших военных и учёных нацистской Германии, объединившихся во время войны полвека назад.	777.jpg	Хеллсинг	8	4	10
movie	26	Эта история происходит за шесть тысяч лет до того, как Сора и Сиро появились в истории Дисборда.\nВойна уничтожила землю, разрывая небеса, разрушая звёзды и даже угрожая уничтожить всё человечество. Среди хаоса и разрушения молодой человек по имени Рику ведёт человечество к завтрашнему дню по велению своего сердца. В один прекрасный день, в руинах города эльфов, он встречает Шуви, девушку-изгнанницу экс-машин, которая просит научить её, что значит иметь человеческое сердце.	33674.jpg	Нет игры — нет жизни: Начало	8	4	1
season	22	Вы устали от запоминания суператак и бесконечных доспехов, но душа просит адреналина и драк? Тогда эта новая экшен-комедия от студии Madhouse для вас!\nГлавный герой не размахивает мечом, не выкрикивает боевой клич и вообще не отличается ничем, особенно героическим. Всё в этом молодом человеке по имени Сайтама так и вопит: «заурядный» — и его лысая голова, и его хилое телосложение. Однако у этого среднестатистического по всем параметрам парня совсем не среднестатистические проблемы... Потому что на самом деле он — супергерой, жаждущий битвы с суперкрутыми противниками. Загвоздка в том, что, отыскав наконец перспективного кандидата на роль главного врага, Сайтама выносит его с одного удара. Сможет ли Сайтама заиметь себе могучего злодея, который смог бы достойно противостоять ему? Следите за Ванпанчменом в его уморительных приключениях, пока среди многочисленных плохих парней он, несмотря ни на что, будет пытаться найти «своего»!	30276.jpg	Ванпанчмен	8	4	12
season	24	Изнывающий от скуки Синигами Рюк бросает одну из своих Тетрадей смерти в мир людей. Просто так, потехи ради, посмотреть, что из этого выйдет.\nМежду тем, в Японии на школьной лужайке эту самую тетрадь находит Лайт Ягами — лучший ученик школы, сын полицейского. Заинтригованный инструкцией на обложке, он забирает тетрадь домой и пробует её в деле, вписав туда имя преступника. А вдруг сработает?\nВскоре весь мир замечает странные массовые смерти преступников, а в сети загадочного убийцу окрещают Кирой.\nДля поимки Киры Интерпол привлекает легендарного детектива L, в одиночку раскрывавшего наиболее сложные и запутанные преступления. Кто такой L на самом деле — не знает никто.\nОтныне в противостоянии Киры и L предстоит победить тому, кто первым раскроет истинную личность противника и раньше оппонента нанесёт удар.	1535.jpg	Тетрадь смерти	8	4	37
season	28	Легендарная онлайн-игра «Иггдрасиль» неожиданно закрывается. Желая остаться в любимом мире подольше, игрок, управляющий персонажем по имени Момонга, решает оставаться в игре до полного отключения серверов. Момонга — лич, глава одной из топовых гильдий, представляющих в игре «тёмную» сторону. В момент отключения сервера он собрал всех своих прислужников в главном зале гильдии, сел на трон и стал ждать неизбежного.\nНо произошло невероятное: сервер не прервал подключение, игра продолжилась, а Момонга превратился в скелета, могущественного волшебника. Неигровые персонажи вдруг начали проявлять человеческие эмоции. Не имея родителей, друзей и места в обществе, Момонга решает не пытаться найти выход из игры, а остаться в новом мире, дабы его завоевать.	29803.jpg	Повелитель	7	4	13
season	27	Рокуро Окадзима — типичный японский служащий, работающий на крупную корпорацию и живущий в городе, население которого едва ли не полностью состоит из похожих людей. Как и у многих, его обычный день компонуют многочисленные «пинки» начальства и «деловые встречи», обязывающие Рокуро не столько работать, сколько выпивать вместе с клиентами.\nОдним днём привычный образ жизни «рабочей лошадки» нарушает неожиданная командировка. В качестве посыльного, которому вверили диск с чрезвычайно важной информацией, начальство отправляет Рокуро в тёплые воды Южно-Китайского моря. Казалось бы, нужно всего-то пересечь пару десятков морских миль, сойти у берегов Борнео и вручить ценную посылку менеджеру тамошнего филиала. Но, как известно, не всё творится, что просто говорится. По пути корабль, на котором плывёт Рокуро, захватывают пираты, нанятые русской мафией.\nРасставшись с посылкой, взамен получив пару болезненных ударов, Рокуро решает, что отделался мелкой монетой. Однако ствол блестящего пистолета, в ту же минуту вновь направленный на него, доходчиво объясняет обратное. Так мягкотелый клерк становится заложником на маленьком пиратском судне под названием «Лагуна».\nПока диск с информацией о незаконной деятельности ещё не попал в руки мафии, совет директоров корпорации решает избавиться не только от пиратов, но и от неудавшегося посыльного. Чтобы замести следы, бизнесмены покупают услуги наёмников, которые в ближайшие пару часов становятся серьёзной проблемой для экипажа «Лагуны». Как ни странно, выбраться из передряги им помогает пленный Рокуро, с тех пор «похороненный» в родной стране как безликий служащий и «воскресший» как пират в чужой.	889.jpg	Пираты «Чёрной лагуны»	8	4	12
\.


--
-- TOC entry 3420 (class 0 OID 17223)
-- Dependencies: 220
-- Data for Name: video_to_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_to_genre (video_id, genre_id) FROM stdin;
3	1
3	2
3	4
3	5
4	2
4	4
4	5
4	1
5	1
5	2
5	4
5	5
8	1
8	2
8	3
7	6
7	1
7	7
7	3
7	8
6	9
6	3
6	8
1	10
1	1
1	8
2	1
2	11
2	4
2	5
7	11
14	11
14	6
14	8
14	7
14	9
13	1
13	2
15	13
15	11
15	12
15	5
15	1
16	12
16	1
16	11
16	5
17	12
17	5
17	1
17	11
18	13
18	12
18	1
18	11
18	5
19	13
19	11
19	1
19	5
19	12
20	12
20	1
20	5
20	11
20	13
21	13
21	11
21	12
21	1
21	5
22	13
22	16
22	6
23	14
23	5
23	1
24	10
24	15
24	9
24	4
25	14
25	15
25	16
25	13
26	15
26	2
26	7
26	1
27	16
27	13
28	15
28	13
28	2
\.


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 211
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 16, true);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 214
-- Name: studio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studio_id_seq', 4, true);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 216
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 6, true);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 218
-- Name: video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.video_id_seq', 28, true);


--
-- TOC entry 3243 (class 2606 OID 17174)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (date, user_id, video_id);


--
-- TOC entry 3245 (class 2606 OID 17181)
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (episode, video_id);


--
-- TOC entry 3247 (class 2606 OID 17279)
-- Name: genre genre_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_name_key UNIQUE (name);


--
-- TOC entry 3249 (class 2606 OID 17190)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- TOC entry 3251 (class 2606 OID 17197)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (user_id, video_id);


--
-- TOC entry 3253 (class 2606 OID 17204)
-- Name: studio studio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studio
    ADD CONSTRAINT studio_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 17229)
-- Name: user uk_sb8bbouer5wak8vyiiy4pf2bx; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT uk_sb8bbouer5wak8vyiiy4pf2bx UNIQUE (username);


--
-- TOC entry 3257 (class 2606 OID 17213)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3259 (class 2606 OID 17222)
-- Name: video video_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_pkey PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 17227)
-- Name: video_to_genre video_to_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_to_genre
    ADD CONSTRAINT video_to_genre_pkey PRIMARY KEY (video_id, genre_id);


--
-- TOC entry 3266 (class 2606 OID 17250)
-- Name: status fk14w88hlea33f09du7cnr2506n; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT fk14w88hlea33f09du7cnr2506n FOREIGN KEY (video_id) REFERENCES public.video(id);


--
-- TOC entry 3264 (class 2606 OID 17240)
-- Name: content fk1wxeickr32sl3c9pked4bqw4k; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT fk1wxeickr32sl3c9pked4bqw4k FOREIGN KEY (video_id) REFERENCES public.video(id);


--
-- TOC entry 3267 (class 2606 OID 17255)
-- Name: video fk6b09e81s3flavoguevoqj4ccv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT fk6b09e81s3flavoguevoqj4ccv FOREIGN KEY (studio_id) REFERENCES public.studio(id);


--
-- TOC entry 3268 (class 2606 OID 17260)
-- Name: video_to_genre fkch79fn19c5m06lxvvy2x0qg12; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_to_genre
    ADD CONSTRAINT fkch79fn19c5m06lxvvy2x0qg12 FOREIGN KEY (genre_id) REFERENCES public.genre(id);


--
-- TOC entry 3262 (class 2606 OID 17230)
-- Name: comment fkd3v4haygsy325q1j873y347ge; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT fkd3v4haygsy325q1j873y347ge FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3265 (class 2606 OID 17245)
-- Name: status fkd5a9sqymmsnemb7f3h9bt2i8m; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT fkd5a9sqymmsnemb7f3h9bt2i8m FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3269 (class 2606 OID 17265)
-- Name: video_to_genre fkdhiajoh0vksw6shv1pgd7cx25; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_to_genre
    ADD CONSTRAINT fkdhiajoh0vksw6shv1pgd7cx25 FOREIGN KEY (video_id) REFERENCES public.video(id);


--
-- TOC entry 3263 (class 2606 OID 17235)
-- Name: comment fkw2ynqphfq5csunhfrvxi11r9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT fkw2ynqphfq5csunhfrvxi11r9 FOREIGN KEY (video_id) REFERENCES public.video(id);


-- Completed on 2022-12-10 10:11:51 MSK

--
-- PostgreSQL database dump complete
--

