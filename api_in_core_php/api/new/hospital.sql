-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 17, 2023 at 09:33 AM
-- Server version: 8.0.27
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `NHSNumber` varchar(30) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `status` int DEFAULT '0' COMMENT '0 = Pending Appointment, 1= Appointment done',
  PRIMARY KEY (`id`),
  KEY `NHSNumber` (`NHSNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `NHSNumber`, `date`, `time`, `status`) VALUES
(23, '7935260676', '2023-04-12', '15:30:00', 0),
(25, '9524038736', '2023-04-09', '12:30:00', 0),
(29, '1237493028', '2023-04-09', '12:30:00', 0),
(30, '7935260676', '2023-04-09', '12:30:00', 0),
(31, '1237493028', '2023-04-09', '12:30:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `NHSNumber` varchar(255) NULL,
  `Forename` varchar(255) NULL,
  `Surname` varchar(255) NULL,
  'Password' varchar(255) NOT NULL,
  `PersoneDOB` date NULL,
  `GenderCode` varchar(10) NULL,
  `Bloodgroup` varchar(10) NULL,
  `Postcode` varchar(10) NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NHSNumber` (`NHSNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `NHSNumber`, `Forename`, `Surname`, `PersoneDOB`, `GenderCode`, `Postcode`, `created_at`) VALUES
(17, '8523697412', 'Something', 'Cool', '2019-04-10', 'Male', '85246', '2023-04-10 07:51:27'),
(24, '1700831771', 'Shahzaib', 'Hassan', '2003-06-09', 'Male', '66000', '0000-00-00 00:00:00'),
(25, '7935260676', 'Mark', 'Zinger', '2003-06-09', 'Male', '66000', '0000-00-00 00:00:00'),
(26, '9524038736', 'Test', 'Patient', '2002-06-09', 'Male', '59300', '0000-00-00 00:00:00'),
(44, '1237493028', 'Test  Update2', 'Patient Update', '2002-06-09', 'male', '66000', '0000-00-00 00:00:00'),
(48, '1234567890', 'test patient', 'Patient Update', '2002-06-01', 'male', '123', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

DROP TABLE IF EXISTS `vaccines`;
CREATE TABLE IF NOT EXISTS `vaccines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DoseNo` int NOT NULL,
  `NHSNumber` varchar(30) NOT NULL,
  `VaccinationDate` date NOT NULL,
  `DiseaseTargeted` text NOT NULL,
  `Product` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NHSNumber` (`NHSNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`id`, `DoseNo`, `NHSNumber`, `VaccinationDate`, `DiseaseTargeted`, `Product`) VALUES
(4, 12345, '8523697412', '2020-01-15', 'Disease Targeted', 'Product'),
(6, 12345, '9524038736', '2020-01-15', 'Disease Targeted', 'Product'),
(7, 12345, '1111111111', '2020-01-15', 'Disease Targeted', 'Product'),
(8, 12345, '1237493028', '2020-01-15', 'Disease Targeted', 'Product'),
(9, 123456, '7935260676', '2020-01-15', 'Disease Targeted', 'Product');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
