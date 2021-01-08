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

CREATE TABLE `block` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `blocked_user` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `receiver_id` varchar(255) DEFAULT NULL,
  `chat_id` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `liked_user` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `real_location` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `content` text,
  `sender_id` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `seen` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `picture_1` varchar(255) DEFAULT NULL,
  `picture_2` varchar(255) DEFAULT NULL,
  `picture_3` varchar(255) DEFAULT NULL,
  `picture_4` varchar(255) DEFAULT NULL,
  `picture_5` varchar(255) DEFAULT NULL,
  `defaultPic` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `tag_content` (
  `id` int(11) NOT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `lastConnection` datetime DEFAULT NULL,
  `lastNotification` datetime DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `interessted` varchar(255) DEFAULT NULL,
  `biography` varchar(255) DEFAULT NULL,
  `bornDate` datetime DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `infoCompleted` tinyint(1) DEFAULT NULL,
  `minAge` int(11) DEFAULT NULL,
  `maxAge` int(11) DEFAULT NULL,
  `maxDistance` int(11) DEFAULT NULL,
  `frameRate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
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

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `viewed_user` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `blocked_user` (`blocked_user`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `liked_user` (`liked_user`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `tag_content`
--
ALTER TABLE `tag_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `viewed_user` (`viewed_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tag_content`
--
ALTER TABLE `tag_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `block`
--
ALTER TABLE `block`
  ADD CONSTRAINT `block_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `block_ibfk_2` FOREIGN KEY (`blocked_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`liked_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tags`
--
ALTER TABLE `tags`
  ADD CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag_content` (`id`);

--
-- Constraints for table `views`
--
ALTER TABLE `views`
  ADD CONSTRAINT `views_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `views_ibfk_2` FOREIGN KEY (`viewed_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
