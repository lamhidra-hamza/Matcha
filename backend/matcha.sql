-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 07, 2021 at 10:51 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matcha`
--

-- --------------------------------------------------------

--
-- Table structure for table `block`
--


-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `longitude`, `latitude`, `user_id`, `location_name`, `real_location`) VALUES
(1, -6.79, 32.79, '0001ec4f-78d4-4b52-84d1-c4b9a59eb8a0', NULL, NULL),
(2, -6.81, 32.88, '8f4e00f7-103e-41c1-a327-ea6d77288275', NULL, NULL),
(3, -6.9, 32.8111, '1496407b-9e87-470e-8bfc-f92d6c445292', NULL, NULL),
(4, -6.9063, 32.8811, 'c6efb2ec-0c7d-4881-a4aa-24099f1cf154', 'Khouribga, Morocco', 1),
(5, -6.79, 32.79, '1', NULL, NULL),
(6, -6.81, 32.88, '2', NULL, NULL),
(7, -6.9, 32.8111, '3', NULL, NULL),
(8, -6.9063, 32.8811, '4', 'Khouribga, Morocco', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--


--
-- Dumping data for table `pictures`
--

INSERT INTO `pictures` (`id`, `user_id`, `picture_1`, `picture_2`, `picture_3`, `picture_4`, `picture_5`, `defaultPic`) VALUES
(1, 'c6efb2ec-0c7d-4881-a4aa-24099f1cf154', '1609407253590.png', NULL, NULL, NULL, NULL, NULL),
(2, '8f4e00f7-103e-41c1-a327-ea6d77288275', '1609407253590.png', NULL, NULL, NULL, NULL, NULL),
(3, '1496407b-9e87-470e-8bfc-f92d6c445292', '1609407253590.png', NULL, NULL, NULL, NULL, NULL),
(4, '0001ec4f-78d4-4b52-84d1-c4b9a59eb8a0', '1609407253590.png', NULL, NULL, NULL, NULL, NULL),
(5, '1', '1609407253590.png', NULL, NULL, NULL, NULL, NULL),
(6, '2', '1609407253590.png', NULL, NULL, NULL, NULL, NULL),
(7, '3', '1609407253590.png', NULL, NULL, NULL, NULL, NULL),
(8, '4', '1609407253590.png', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `user_id`, `tag_id`) VALUES
(1, 'c6efb2ec-0c7d-4881-a4aa-24099f1cf154', 1),
(2, 'c6efb2ec-0c7d-4881-a4aa-24099f1cf154', 3),
(3, 'c6efb2ec-0c7d-4881-a4aa-24099f1cf154', 4),
(4, 'c6efb2ec-0c7d-4881-a4aa-24099f1cf154', 2),
(5, '1', 1),
(6, '0001ec4f-78d4-4b52-84d1-c4b9a59eb8a0', 3),
(7, '2', 4),
(8, '3', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tag_content`
--
--
-- Dumping data for table `tag_content`
--

INSERT INTO `tag_content` (`id`, `tag`) VALUES
(1, 'traveling'),
(2, 'swiming'),
(3, 'dancing'),
(4, 'music');

-- --------------------------------------------------------

--
-- Table structure for table `users`
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstName`, `lastName`, `email`, `password`, `job`, `refreshToken`, `lastConnection`, `lastNotification`, `gender`, `interessted`, `biography`, `bornDate`, `verified`, `infoCompleted`, `minAge`, `maxAge`, `maxDistance`, `frameRate`) VALUES
('0001ec4f-78d4-4b52-84d1-c4b9a59eb8a0', 'nada', 'nada', 'nada', 'maybe@email.com', '$2b$11$9Qe9E.muV9DeF9V6Ru/yI.LkbS8IGKns.KvIl94Y3q5A0t/BBdVrK', '', NULL, '2021-01-05 07:39:39', '2021-01-05 07:39:39', 'men', 'both', '', '1996-05-16 08:39:27', 0, 0, 18, 30, 150, 1),
('1', 'nada', 'nada', 'nada', 'maybe@email.com', '$2b$11$9Qe9E.muV9DeF9V6Ru/yI.LkbS8IGKns.KvIl94Y3q5A0t/BBdVrK', '', NULL, '2021-01-05 07:39:39', '2021-01-05 07:39:39', 'men', 'both', '', '1996-05-16 08:39:27', 0, 0, 18, 30, 150, 1),
('1496407b-9e87-470e-8bfc-f92d6c445292', 'ziko', 'ziko', 'ziko', 'hello@email.com', '$2b$11$y.QsRnXHAnpqzobInUPYU.iiCAO3hu02OU2Wynfx6zIGkB7ZeVQsa', '', NULL, '2021-01-05 07:38:57', '2021-01-05 07:38:57', 'men', 'both', '', '2000-08-24 08:38:30', 0, 0, 18, 30, 150, 1),
('2', 'ziko', 'ziko', 'ziko', 'hello@email.com', '$2b$11$y.QsRnXHAnpqzobInUPYU.iiCAO3hu02OU2Wynfx6zIGkB7ZeVQsa', '', NULL, '2021-01-05 07:38:57', '2021-01-05 07:38:57', 'men', 'both', '', '2000-08-24 08:38:30', 0, 0, 18, 30, 150, 1),
('3', 'hamza', 'hamza', 'hamza', 'hey@email.com', '$2b$11$NG4gZEAWMKl5RYMo5Rzpt.vD93IU168XZ9a27lz1Bt02gnxtKwB2K', '', NULL, '2021-01-05 07:38:00', '2021-01-05 07:38:00', 'men', 'both', '', '1983-02-16 08:37:39', 0, 0, 18, 30, 150, 1),
('4', 'hatim', 'hatim', 'hatim', '6103787985@firemailbox.club', '$2b$11$qI/et.Qt7KDPPeQ3ScyU9O0IeIfPxa9xfbXe5mEj6.LUDbvTNK2r2', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2ZWZiMmVjLTBjN2QtNDg4MS1hNGFhLTI0MDk5ZjFjZjE1NCIsInR5cGUiOiJyZWZyZXNoLXRva2VuIiwiaWF0IjoxNjA5ODMyMzg4LCJleHAiOjE2MTA2OTYzODh9.9MIF2xDUUifmkEPmu-3Nyn_mBT2etYUBg8rpaKZSLUk', '2021-01-05 07:36:54', '2021-01-05 07:36:54', 'men', 'both', '', '1993-05-05 08:36:43', 1, 0, 18, 30, 150, 1),
('8f4e00f7-103e-41c1-a327-ea6d77288275', 'hamza', 'hamza', 'hamza', 'hey@email.com', '$2b$11$NG4gZEAWMKl5RYMo5Rzpt.vD93IU168XZ9a27lz1Bt02gnxtKwB2K', '', NULL, '2021-01-05 07:38:00', '2021-01-05 07:38:00', 'men', 'both', '', '1983-02-16 08:37:39', 0, 0, 18, 30, 150, 1),
('c6efb2ec-0c7d-4881-a4aa-24099f1cf154', 'hatim', 'hatim', 'hatim', '6103787985@firemailbox.club', '$2b$11$qI/et.Qt7KDPPeQ3ScyU9O0IeIfPxa9xfbXe5mEj6.LUDbvTNK2r2', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2ZWZiMmVjLTBjN2QtNDg4MS1hNGFhLTI0MDk5ZjFjZjE1NCIsInR5cGUiOiJyZWZyZXNoLXRva2VuIiwiaWF0IjoxNjA5ODMyMzg4LCJleHAiOjE2MTA2OTYzODh9.9MIF2xDUUifmkEPmu-3Nyn_mBT2etYUBg8rpaKZSLUk', '2021-01-05 07:36:54', '2021-01-05 07:36:54', 'men', 'both', '', '1993-05-05 08:36:43', 1, 0, 18, 30, 150, 1);

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `user_id`, `viewed_user`) VALUES
(1, 'c6efb2ec-0c7d-4881-a4aa-24099f1cf154', '0001ec4f-78d4-4b52-84d1-c4b9a59eb8a0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block`
