-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Värd: localhost
-- Skapad: 27 februari 2012 kl 14:22
-- Serverversion: 5.5.8
-- PHP-version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databas: `trip_api`
--

-- --------------------------------------------------------

--
-- Struktur för tabell `legs`
--

CREATE TABLE IF NOT EXISTS `legs` (
  `trips` int(11) NOT NULL,
  `sequence` int(11) NOT NULL,
  `from_lng` varchar(32) COLLATE utf8_bin NOT NULL,
  `from_lat` varchar(32) COLLATE utf8_bin NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `leg_distance` int(11) NOT NULL,
  `user_to_destination` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=44 ;

-- --------------------------------------------------------

--
-- Struktur för tabell `legs_view`
--
-- används(#1356 - View 'trip_api.legs_view' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them)

-- --------------------------------------------------------

--
-- Struktur för tabell `passengers`
--

CREATE TABLE IF NOT EXISTS `passengers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users` int(11) NOT NULL,
  `trips` int(11) NOT NULL,
  `confirmed_by_passenger` tinyint(1) NOT NULL DEFAULT '0',
  `confirmed_by_driver` tinyint(1) NOT NULL DEFAULT '0',
  `lng` varchar(32) COLLATE utf8_bin NOT NULL,
  `lat` varchar(32) COLLATE utf8_bin NOT NULL,
  `user_to_destination` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=24 ;

-- --------------------------------------------------------

--
-- Ersättningsstruktur för visning `passengers_view`
--
CREATE TABLE IF NOT EXISTS `passengers_view` (
`id` int(11)
,`users` int(11)
,`trips` int(11)
,`confirmed_by_passenger` tinyint(1)
,`confirmed_by_driver` tinyint(1)
,`lng` varchar(32)
,`lat` varchar(32)
,`user_to_destination` int(11)
,`user_id` int(11)
,`name` varchar(32)
);
-- --------------------------------------------------------

--
-- Struktur för tabell `trips`
--

CREATE TABLE IF NOT EXISTS `trips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users` int(11) NOT NULL,
  `tag` varchar(32) COLLATE utf8_bin NOT NULL,
  `destination_lng` varchar(32) COLLATE utf8_bin NOT NULL,
  `destination_lat` varchar(32) COLLATE utf8_bin NOT NULL,
  `km_cost` int(11) NOT NULL,
  `eta` datetime NOT NULL,
  `message` text COLLATE utf8_bin NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=43 ;

-- --------------------------------------------------------

--
-- Ersättningsstruktur för visning `trips_view`
--
CREATE TABLE IF NOT EXISTS `trips_view` (
`id` int(11)
,`tag` varchar(32)
,`destination_lng` varchar(32)
,`destination_lat` varchar(32)
,`eta` datetime
,`km_cost` int(11)
,`message` text
,`users` int(11)
,`owner` varchar(32)
,`confirmed` tinyint(1)
);
-- --------------------------------------------------------

--
-- Struktur för tabell `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=16 ;

-- --------------------------------------------------------

--
-- Struktur för visning `passengers_view`
--
DROP TABLE IF EXISTS `passengers_view`;

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `passengers_view` AS select `passengers`.`id` AS `id`,`passengers`.`users` AS `users`,`passengers`.`trips` AS `trips`,`passengers`.`confirmed_by_passenger` AS `confirmed_by_passenger`,`passengers`.`confirmed_by_driver` AS `confirmed_by_driver`,`passengers`.`lng` AS `lng`,`passengers`.`lat` AS `lat`,`passengers`.`user_to_destination` AS `user_to_destination`,`users`.`id` AS `user_id`,`users`.`name` AS `name` from (`passengers` join `users` on((`passengers`.`users` = `users`.`id`)));

-- --------------------------------------------------------

--
-- Struktur för visning `trips_view`
--
DROP TABLE IF EXISTS `trips_view`;

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trips_view` AS select `trips`.`id` AS `id`,`trips`.`tag` AS `tag`,`trips`.`destination_lng` AS `destination_lng`,`trips`.`destination_lat` AS `destination_lat`,`trips`.`eta` AS `eta`,`trips`.`km_cost` AS `km_cost`,`trips`.`message` AS `message`,`trips`.`users` AS `users`,`users`.`name` AS `owner`,`trips`.`confirmed` AS `confirmed` from (`trips` join `users` on((`users`.`id` = `trips`.`users`)));
