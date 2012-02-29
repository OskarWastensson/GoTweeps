-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Värd: localhost
-- Skapad: 29 februari 2012 kl 14:46
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
-- Struktur för tabell `legs_view`
--

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trip_api`.`legs_view` AS select `this_legs`.`trips` AS `trips`,`this_legs`.`sequence` AS `sequence`,`this_legs`.`from_lng` AS `from_lng`,`this_legs`.`from_lat` AS `from_lat`,`this_legs`.`id` AS `id`,`this_legs`.`leg_distance` AS `leg_distance`,`this_legs`.`user_to_destination` AS `user_to_destination`,if(isnull(`next_legs`.`from_lng`),`trip_api`.`trips`.`destination_lng`,`next_legs`.`from_lng`) AS `to_lng`,if(isnull(`next_legs`.`from_lat`),`trip_api`.`trips`.`destination_lat`,`next_legs`.`from_lat`) AS `to_lat`,`next_legs`.`user_to_destination` AS `distance_after_leg`,`this_legs`.`user_to_destination` AS `distance_before_leg`,count(distinct `passengers_users`.`id`) AS `number_of_members`,(((`trip_api`.`trips`.`km_cost` * 0.001) * if(isnull(`next_legs`.`user_to_destination`),`this_legs`.`user_to_destination`,(`this_legs`.`user_to_destination` - `next_legs`.`user_to_destination`))) / count(distinct `passengers_users`.`id`)) AS `share_fee`,((`trip_api`.`trips`.`km_cost` * 0.001) * (`this_legs`.`leg_distance` - if(isnull(`next_legs`.`user_to_destination`),`this_legs`.`user_to_destination`,(`this_legs`.`user_to_destination` - `next_legs`.`user_to_destination`)))) AS `pick_up_fee` from ((((`trip_api`.`legs` `this_legs` left join `trip_api`.`legs` `next_legs` on(((`next_legs`.`sequence` - 1) = `this_legs`.`sequence`))) join `trip_api`.`passengers` on((`this_legs`.`id` = `trip_api`.`passengers`.`legs`))) join `trip_api`.`users` `passengers_users` on((`passengers_users`.`id` = `trip_api`.`passengers`.`users`))) join `trip_api`.`trips` on((`trip_api`.`trips`.`id` = `this_legs`.`trips`))) group by `this_legs`.`id` order by `this_legs`.`sequence`;

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
  `word` varchar(32) COLLATE utf8_bin NOT NULL,
  `user_to_destination` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=62 ;

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
,`word` varchar(32)
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
  `destination_word` varchar(32) COLLATE utf8_bin NOT NULL,
  `km_cost` int(11) NOT NULL,
  `eta` datetime NOT NULL,
  `message` text COLLATE utf8_bin NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `max_passengers` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=79 ;

-- --------------------------------------------------------

--
-- Ersättningsstruktur för visning `trips_view`
--
CREATE TABLE IF NOT EXISTS `trips_view` (
`id` int(11)
,`tag` varchar(32)
,`destination_lng` varchar(32)
,`destination_lat` varchar(32)
,`destination_word` varchar(32)
,`eta` datetime
,`km_cost` int(11)
,`message` text
,`max_passengers` int(11)
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=48724516 ;

-- --------------------------------------------------------

--
-- Struktur för visning `passengers_view`
--
DROP TABLE IF EXISTS `passengers_view`;

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `passengers_view` AS select `passengers`.`id` AS `id`,`passengers`.`users` AS `users`,`passengers`.`trips` AS `trips`,`passengers`.`confirmed_by_passenger` AS `confirmed_by_passenger`,`passengers`.`confirmed_by_driver` AS `confirmed_by_driver`,`passengers`.`lng` AS `lng`,`passengers`.`lat` AS `lat`,`passengers`.`word` AS `word`,`passengers`.`user_to_destination` AS `user_to_destination`,`users`.`id` AS `user_id`,`users`.`name` AS `name` from (`passengers` join `users` on((`passengers`.`users` = `users`.`id`)));

-- --------------------------------------------------------

--
-- Struktur för visning `trips_view`
--
DROP TABLE IF EXISTS `trips_view`;

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trips_view` AS select `trips`.`id` AS `id`,`trips`.`tag` AS `tag`,`trips`.`destination_lng` AS `destination_lng`,`trips`.`destination_lat` AS `destination_lat`,`trips`.`destination_word` AS `destination_word`,`trips`.`eta` AS `eta`,`trips`.`km_cost` AS `km_cost`,`trips`.`message` AS `message`,`trips`.`max_passengers` AS `max_passengers`,`trips`.`users` AS `users`,`users`.`name` AS `owner`,`trips`.`confirmed` AS `confirmed` from (`trips` join `users` on((`users`.`id` = `trips`.`users`)));
