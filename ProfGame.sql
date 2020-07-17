-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 01 2018 г., 07:51
-- Версия сервера: 5.7.16
-- Версия PHP: 7.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ProfGame`
--

-- --------------------------------------------------------

--
-- Структура таблицы `spec`
--

CREATE TABLE `spec` (
  `id` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `spec`
--

INSERT INTO `spec` (`id`, `specName`) VALUES
('prog', 'Информационные системы и программирование'),
('ksk', 'Компьютерные системы и комплексы'),
('kip', 'Мастер контрольно-измерительных приборов и автоматики'),
('eo', 'Техническая эксплуатация и обслуживание электрического и электротехнического оборудования'),
('byx', 'Экономика и бухгалтерский учёт'),
('es', 'Электрические станции сети и системы');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(3) NOT NULL,
  `login` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `FI` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `FI`, `password`, `phoneNumber`, `is_admin`) VALUES
(1, 'Admin', 'Василий Иванов', 'Admin', '1234', 1),
(8, 'Vasya', 'Василий Васильевич', '1234', '+7(800) 789-9755', 0),
(9, 'Petya', 'Петр Петрович', '12345', '+7(800) 567-4764', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `usersresult`
--

CREATE TABLE `usersresult` (
  `id` int(10) NOT NULL,
  `id_user` int(3) NOT NULL,
  `date` datetime NOT NULL,
  `testAnswers` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pracTotal` int(2) NOT NULL,
  `testTotal` int(2) NOT NULL,
  `id_spec` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `usersresult`
--

INSERT INTO `usersresult` (`id`, `id_user`, `date`, `testAnswers`, `pracTotal`, `testTotal`, `id_spec`) VALUES
(1, 8, '2018-05-24 19:03:59', '2222', 10, 0, 'es'),
(2, 8, '2018-05-24 19:17:44', '22222', 10, 0, 'es'),
(11, 8, '2018-05-24 19:51:26', '1', 10, 0, 'prog'),
(12, 8, '2018-05-24 19:53:33', '2112313', 10, 0, 'prog'),
(13, 8, '2018-05-24 19:54:40', '1212111', 9, 0, 'prog'),
(14, 9, '2018-05-25 20:16:04', '2111113', 10, 0, 'prog'),
(15, 9, '2018-05-25 20:34:17', '1111113', 10, 12, 'prog'),
(16, 8, '2018-05-27 20:34:14', '2111111', 10, 13, 'kip'),
(17, 8, '2018-05-27 20:36:42', '2111111', 10, 13, 'kip'),
(19, 1, '2018-05-27 20:49:03', '2111111', 10, 13, 'kip'),
(20, 1, '2018-05-27 21:14:19', '2111113', 10, 14, 'es'),
(21, 8, '2018-05-29 17:49:00', '2111111', 9, 13, 'byx'),
(22, 8, '2018-05-31 17:04:55', '1111111', 10, 11, 'kip'),
(23, 8, '2018-05-31 17:08:34', '2111111', 10, 13, 'kip');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `spec`
--
ALTER TABLE `spec`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `specName` (`specName`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Индексы таблицы `usersresult`
--
ALTER TABLE `usersresult`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `date` (`date`),
  ADD KEY `id_user` (`id_user`,`id_spec`),
  ADD KEY `id_spec` (`id_spec`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT для таблицы `usersresult`
--
ALTER TABLE `usersresult`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `usersresult`
--
ALTER TABLE `usersresult`
  ADD CONSTRAINT `usersresult_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usersresult_ibfk_2` FOREIGN KEY (`id_spec`) REFERENCES `spec` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
