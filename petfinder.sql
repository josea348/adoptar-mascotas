-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 23-05-2024 a las 18:58:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `petfinder`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `idCategories` int(11) NOT NULL,
  `nameCategories` varchar(50) NOT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`idCategories`, `nameCategories`, `estado`) VALUES
(1, 'Grande', 'Activo'),
(2, 'Mediano', 'Activo'),
(3, 'Pequeño', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genders`
--

CREATE TABLE `genders` (
  `idGender` int(11) NOT NULL,
  `nameGender` varchar(50) NOT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genders`
--

INSERT INTO `genders` (`idGender`, `nameGender`, `estado`) VALUES
(1, 'Macho', 'Inactivo'),
(2, 'Hembra', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

CREATE TABLE `pets` (
  `idPets` int(11) NOT NULL,
  `namePets` varchar(50) NOT NULL,
  `race_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `photo` varchar(60) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pets`
--

INSERT INTO `pets` (`idPets`, `namePets`, `race_id`, `category_id`, `photo`, `gender_id`, `user_id`, `estado`) VALUES
(1, 'Karsten', 5, 2, 'photo-sm-1.svg', 1, 1, 'Activo'),
(2, 'Alban', 6, 2, 'photo-sm-2.svg', 1, 1, 'Activo'),
(10, 'Lucas', 5, 2, 'photo-sm-3.svg', 1, 1, 'Activo'),
(11, 'Luna', 5, 2, 'photo-sm-4.svg', 2, 11, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `races`
--

CREATE TABLE `races` (
  `idRaces` int(11) NOT NULL,
  `nameRaces` varchar(50) NOT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `races`
--

INSERT INTO `races` (`idRaces`, `nameRaces`, `estado`) VALUES
(1, 'Pastor Aleman', 'Activo'),
(2, 'Pibull', 'Activo'),
(3, 'Pinche', 'Activo'),
(4, 'Doberman', 'Activo'),
(5, 'Bulldog', 'Activo'),
(6, 'Corgi', 'Activo'),
(7, 'Siamese', 'Activo'),
(8, 'Graycat', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` char(10) NOT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `estado`) VALUES
(1, 'Jose Velez', 'jv1424937@gmail.com', '$2b$10$wHI', 'Activo'),
(2, 'Pepito Perez', 'pepiperez24937@gmail.com', '$2b$10$.cZ', 'Activo'),
(4, 'Yesica', 'yesica123@gmail.com', '$2b$10$lxm', 'Activo'),
(5, 'Juanito Garcia', 'juan1234@gmail.com', '$2b$10$1dt', 'Activo'),
(6, 'Lucas', 'lucas26@gmail.com', '$2b$10$L1T', 'Activo'),
(7, 'Maria Velez', 'maria2638@gmail.com', '$2b$10$6FC', 'Activo'),
(8, 'Sharit Vargas', 'sharitvargas07@gmail.com', '$2b$10$HuL', 'Activo'),
(9, 'Rosa Muñoz', 'rosaelnamunozvega283@gmail.com', '$2b$10$gAK', 'Activo'),
(10, 'Dario Velez', 'jv142493@gmail.com', '$2b$10$UXv', 'Activo'),
(11, 'Pedro Velez', 'padroarturovelezmunoz@gmail.com', '$2b$10$.b5', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`idCategories`);

--
-- Indices de la tabla `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`idGender`);

--
-- Indices de la tabla `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`idPets`),
  ADD KEY `race_id` (`race_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `gender_id` (`gender_id`),
  ADD KEY `regiftrar` (`user_id`);

--
-- Indices de la tabla `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`idRaces`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `idCategories` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `genders`
--
ALTER TABLE `genders`
  MODIFY `idGender` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pets`
--
ALTER TABLE `pets`
  MODIFY `idPets` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `races`
--
ALTER TABLE `races`
  MODIFY `idRaces` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`race_id`) REFERENCES `races` (`idRaces`),
  ADD CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`idCategories`),
  ADD CONSTRAINT `pets_ibfk_3` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`idGender`),
  ADD CONSTRAINT `regiftrar` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
