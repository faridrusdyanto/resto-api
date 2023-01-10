-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_resto.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.category: ~2 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`id`, `category_name`, `created_at`, `modified_at`) VALUES
	(1, 'makanan', '2023-01-09 15:40:53', '2023-01-09 15:40:53'),
	(2, 'minuman', '2023-01-09 15:41:06', '2023-01-09 15:41:06');

-- Dumping structure for table db_resto.product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) DEFAULT NULL,
  `product_desc` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT 0,
  `image` text DEFAULT NULL,
  `available` int(1) DEFAULT 1,
  `id_category` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.product: ~2 rows (approximately)
DELETE FROM `product`;
INSERT INTO `product` (`id`, `product_name`, `product_desc`, `price`, `image`, `available`, `id_category`, `created_at`, `modified_at`) VALUES
	(1, 'nasi goreng', 'nasi goreng reguler', 12000, 'base64', 1, 1, '2023-01-09 16:02:12', '2023-01-09 16:05:11'),
	(2, 'nasi goreng ati ampela', 'nasi goreng dengan tambahan ati ampela', 17000, 'base64', 1, 1, '2023-01-09 16:03:09', '2023-01-09 16:05:14'),
	(3, 'es teh manis', 'es teh dengan gula', 4000, 'base64', 1, 2, '2023-01-09 16:06:34', '2023-01-09 16:06:34');

-- Dumping structure for table db_resto.trx
DROP TABLE IF EXISTS `trx`;
CREATE TABLE IF NOT EXISTS `trx` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_product` bigint(20) DEFAULT NULL,
  `qty` int(11) DEFAULT 0,
  `notes` varchar(255) DEFAULT NULL,
  `customer_name` varchar(50) DEFAULT NULL,
  `seat` varchar(50) DEFAULT NULL,
  `trx_number` varchar(50) DEFAULT NULL,
  `payment` bigint(20) DEFAULT 0,
  `paid` int(1) DEFAULT 0,
  `id_user` bigint(20) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.trx: ~0 rows (approximately)
DELETE FROM `trx`;
INSERT INTO `trx` (`id`, `id_product`, `qty`, `notes`, `customer_name`, `seat`, `trx_number`, `payment`, `paid`, `id_user`, `created_at`, `modified_at`) VALUES
	(1, 1, 2, 'pedas', 'dede', 'A01', '220110001', 24000, 1, 2, '2023-01-10 13:13:18', '2023-01-10 14:23:11');

-- Dumping structure for table db_resto.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.user: ~2 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `created_at`, `modified_at`) VALUES
	(1, 'aan', 'passwordaan', 'administrator', '2023-01-09 15:29:57', '2023-01-09 15:29:57'),
	(2, 'aas', 'passwordaas', 'karyawan', '2023-01-09 15:30:41', '2023-01-09 15:30:41');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
