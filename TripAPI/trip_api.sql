-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Värd: localhost
-- Skapad: 17 februari 2012 kl 09:52
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=6 ;

--
-- Data i tabell `legs`
--

INSERT INTO `legs` (`trips`, `sequence`, `from_lng`, `from_lat`, `id`, `leg_distance`, `user_to_destination`) VALUES
(1, 1, '', '', 1, 10, 15),
(1, 2, '', '', 2, 5, 8),
(1, 3, '', '', 3, 5, 5);

-- --------------------------------------------------------

--
-- Struktur för tabell `legs_view`
--
-- används(#1356 - View 'trip_api.legs_view' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them)

--
-- Data i tabell `legs_view`
--
-- används (#1356 - View 'trip_api.legs_view' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them)

-- --------------------------------------------------------

--
-- Struktur för tabell `memberships`
--

DROP TABLE IF EXISTS `memberships`;
CREATE TABLE IF NOT EXISTS `memberships` (
  `legs` int(11) NOT NULL,
  `users` int(11) NOT NULL,
  PRIMARY KEY (`legs`,`users`),
  KEY `users` (`users`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data i tabell `memberships`
--

INSERT INTO `memberships` (`legs`, `users`) VALUES
(1, 1),
(2, 1),
(3, 1),
(2, 2),
(3, 2),
(3, 3);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

--
-- Data i tabell `trips`
--

INSERT INTO `trips` (`id`, `users`, `tag`, `destination_lng`, `destination_lat`, `km_cost`, `eta`, `message`) VALUES
(1, 1, '', '', '', 1, '0000-00-00 00:00:00', 0x546573746d656464616c616e6465),
(2, 5, '#testevent', 'coord1', 'coord2', 10, '2012-04-12 12:30:00', 0x4a61672076696c6c2062617261206861206d6564206d696720616c6c612062616a656e2d66616e7321);

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

--
-- Data i tabell `users`
--

INSERT INTO `users` (`id`, `twitterid`, `name`) VALUES
(1, '3424234', '@oskarwastensson'),
(2, '23434234', 'testpilot1'),
(3, '3413414', 'testpilot2'),
(4, 'test2', ''),
(5, 'test3', ''),
(6, 'test3', ''),
(7, 'test3', 'bungu'),
(8, '6', 'gunter'),
(9, '6', 'gunter'),
(10, '6', 'gunter'),
(11, '6', 'gunter'),
(12, '6', 'gunter'),
(13, '6', 'gunter'),
(14, '6', 'gunter'),
(15, '6', 'gunter');

-- --------------------------------------------------------

--
-- Struktur för visning `trips_view`
--
DROP TABLE IF EXISTS `trips_view`;

CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trips_view` AS select `trips`.`id` AS `id`,`trips`.`tag` AS `tag`,`trips`.`destination_lng` AS `destination_lng`,`trips`.`destination_lat` AS `destination_lat`,`trips`.`eta` AS `eta`,`trips`.`km_cost` AS `km_cost`,`trips`.`message` AS `message`,`trips`.`users` AS `users`,`users`.`name` AS `owner` from (`trips` join `users` on((`users`.`id` = `trips`.`users`)));

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `memberships`
--
ALTER TABLE `memberships`
  ADD CONSTRAINT `memberships_ibfk_1` FOREIGN KEY (`legs`) REFERENCES `legs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `memberships_ibfk_2` FOREIGN KEY (`users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
