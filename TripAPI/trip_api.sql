-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Värd: localhost
-- Skapad: 21 februari 2012 kl 09:06
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

DROP TABLE IF EXISTS `legs`;
CREATE TABLE IF NOT EXISTS `legs` (
  `trips` int(11) NOT NULL,
  `sequence` int(11) NOT NULL,
  `from_lng` varchar(32) COLLATE utf8_bin NOT NULL,
  `from_lat` varchar(32) COLLATE utf8_bin NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `leg_distance` int(11) NOT NULL,
  `user_to_destination` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=21 ;

-- --------------------------------------------------------

--
-- Ersättningsstruktur för visning `legs_view`
--
DROP VIEW IF EXISTS `legs_view`;
CREATE TABLE IF NOT EXISTS `legs_view` (
`trips` int(11)
,`sequence` int(11)
,`from_lng` varchar(32)
,`from_lat` varchar(32)
,`id` int(11)
,`leg_distance` int(11)
,`user_to_destination` int(11)
,`to_lng` varchar(32)
,`to_lat` varchar(32)
,`distance_after_leg` int(11)
,`distance_before_leg` int(11)
,`number_of_members` bigint(21)
,`share_fee` decimal(25,4)
,`pick_up_fee` bigint(23)
);
-- --------------------------------------------------------

--
-- Struktur för tabell `passengers`
--

DROP TABLE IF EXISTS `passengers`;
CREATE TABLE IF NOT EXISTS `passengers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users` int(11) NOT NULL,
  `legs` int(11) NOT NULL,
  `confirmed_by_passenger` tinyint(1) NOT NULL DEFAULT '0',
  `confirmed_by_driver` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- Struktur för tabell `trips`
--

DROP TABLE IF EXISTS `trips`;
CREATE TABLE IF NOT EXISTS `trips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users` int(11) NOT NULL,
  `tag` varchar(32) COLLATE utf8_bin NOT NULL,
  `destination_lng` varchar(32) COLLATE utf8_bin NOT NULL,
  `destination_lat` varchar(32) COLLATE utf8_bin NOT NULL,
  `km_cost` int(11) NOT NULL,
  `eta` datetime NOT NULL,
  `message` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=16 ;

-- --------------------------------------------------------

--
-- Ersättningsstruktur för visning `trips_view`
--
DROP VIEW IF EXISTS `trips_view`;
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
);
-- --------------------------------------------------------

--
-- Struktur för tabell `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `twitterid` varchar(32) COLLATE utf8_bin NOT NULL,
  `name` varchar(32) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=16 ;

-- --------------------------------------------------------

--
-- Struktur för visning `legs_view`
--
DROP TABLE IF EXISTS `legs_view`;

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `legs_view` AS select `this_legs`.`trips` AS `trips`,`this_legs`.`sequence` AS `sequence`,`this_legs`.`from_lng` AS `from_lng`,`this_legs`.`from_lat` AS `from_lat`,`this_legs`.`id` AS `id`,`this_legs`.`leg_distance` AS `leg_distance`,`this_legs`.`user_to_destination` AS `user_to_destination`,if(isnull(`next_legs`.`from_lng`),`trips`.`destination_lng`,`next_legs`.`from_lng`) AS `to_lng`,if(isnull(`next_legs`.`from_lat`),`trips`.`destination_lat`,`next_legs`.`from_lat`) AS `to_lat`,`next_legs`.`user_to_destination` AS `distance_after_leg`,`this_legs`.`user_to_destination` AS `distance_before_leg`,count(distinct `passengers_users`.`id`) AS `number_of_members`,((`trips`.`km_cost` * if(isnull(`next_legs`.`user_to_destination`),`this_legs`.`user_to_destination`,(`this_legs`.`user_to_destination` - `next_legs`.`user_to_destination`))) / count(distinct `passengers_users`.`id`)) AS `share_fee`,(`trips`.`km_cost` * (`this_legs`.`leg_distance` - if(isnull(`next_legs`.`user_to_destination`),`this_legs`.`user_to_destination`,(`this_legs`.`user_to_destination` - `next_legs`.`user_to_destination`)))) AS `pick_up_fee` from ((((`legs` `this_legs` left join `legs` `next_legs` on(((`next_legs`.`sequence` - 1) = `this_legs`.`sequence`))) join `passengers` on((`this_legs`.`id` = `passengers`.`legs`))) join `users` `passengers_users` on((`passengers_users`.`id` = `passengers`.`users`))) join `trips` on((`trips`.`id` = `this_legs`.`trips`))) group by `this_legs`.`id` order by `this_legs`.`sequence`;

-- --------------------------------------------------------

--
-- Struktur för visning `trips_view`
--
DROP TABLE IF EXISTS `trips_view`;

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trips_view` AS select `trips`.`id` AS `id`,`trips`.`tag` AS `tag`,`trips`.`destination_lng` AS `destination_lng`,`trips`.`destination_lat` AS `destination_lat`,`trips`.`eta` AS `eta`,`trips`.`km_cost` AS `km_cost`,`trips`.`message` AS `message`,`trips`.`users` AS `users`,`users`.`name` AS `owner` from (`trips` join `users` on((`users`.`id` = `trips`.`users`)));
