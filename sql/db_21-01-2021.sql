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

-- Dumping structure for table db_resto.access_token
DROP TABLE IF EXISTS `access_token`;
CREATE TABLE IF NOT EXISTS `access_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_user` bigint(20) NOT NULL DEFAULT 0,
  `token` text DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.access_token: ~12 rows (approximately)
DELETE FROM `access_token`;
INSERT INTO `access_token` (`id`, `id_user`, `token`, `ip_address`, `created_at`) VALUES
	(33, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM2Njk4NDksImV4cCI6MTY3MzY5ODY0OX0.MtJieyoniQE9vDk6SlKxF9Gv60xtce6SZ2hUBgZh0u0', '172.20.10.6', '2023-01-14 04:17:29'),
	(34, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM2Njk5MDAsImV4cCI6MTY3MzY5ODcwMH0.f97roQaxa08g4j6_224jX9QbVm28eXhzlSqUWhTYdao', '172.20.10.6', '2023-01-14 04:18:20'),
	(35, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM2NzAyMTYsImV4cCI6MTY3MzY5OTAxNn0.XgtD6v8PH0D6Skno2gl8ZEkHPGa40Fd0x1uySdUFOvE', '172.20.10.6', '2023-01-14 04:23:36'),
	(36, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM2NzAyMTgsImV4cCI6MTY3MzY5OTAxOH0.HX1Lah_aMIc4Z2bajPNLAPOz4-SaRsicTs6GN2B4ttE', '172.20.10.6', '2023-01-14 04:23:38'),
	(37, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM3NTMzMDgsImV4cCI6MTY3Mzc4MjEwOH0.0O5iom70SsA_3RjxLHcOCmvDCo_Dw1BWR_qnHYDd5ZY', '172.20.10.6', '2023-01-15 03:28:28'),
	(38, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM3NTM2NzIsImV4cCI6MTY3Mzc4MjQ3Mn0.8g6d2Z3Io6BA_e1y0WCikW5N7dhNsV-a7JWLB-Li8G0', '172.20.10.6', '2023-01-15 03:34:32'),
	(39, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM3NTgxODcsImV4cCI6MTY3Mzc4Njk4N30.3L5xphbqRUBwPtRr0Ex4SwYU1-GUhkCd5BEF-d1ml9Q', '172.20.10.6', '2023-01-15 04:49:47'),
	(40, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM3NjE1NTQsImV4cCI6MTY3Mzc5MDM1NH0.q50eJYae1g2Omt3DQXBVTE4jPZjOKp_DdeVckg9jYtM', '172.20.10.6', '2023-01-15 05:45:54'),
	(41, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsInVzZXJuYW1lIjoidml2aSIsInBhc3N3b3JkIjoiJDJiJDEwJFNEVmloQWNha1hJcmwuQ3JndWZ3R3VZeFJYR1JhQ1pBMHFIYmhDOW5tWGFGendJd1ppaUY2Iiwicm9sZSI6Imthcnlhd2FuIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTRUMDQ6MDA6MjAuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyMy0wMS0xNFQwNDowMDoyMC4wMDBaIn1dLCJpYXQiOjE2NzM3NjMzMTQsImV4cCI6MTY3Mzc5MjExNH0.yt3aOUW53Mfc6uhQdRnbPYAx_rYZODdvHphsMwRp0Zo', '172.20.10.6', '2023-01-15 06:15:14'),
	(42, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTUsInVzZXJuYW1lIjoidml2IiwicGFzc3dvcmQiOiIkMmIkMTAkWXhuQkJuL1BxUFEwa094MHJWZ05mT1E3ZC5KWUFXZUdYZ1dFSEIwNUsxbXVCRnY5d0hCVTIiLCJyb2xlIjoia2FyeWF3YW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xNVQwNjoxMzo1OS4wMDBaIiwibW9kaWZpZWRfYXQiOiIyMDIzLTAxLTE1VDA2OjEzOjU5LjAwMFoifV0sImlhdCI6MTY3NDI2Njg1NCwiZXhwIjoxNjc0Mjk1NjU0fQ.vv-7rGOD4ksfyggZVohz6CyzGE3rhDLJQMX34JN-ROQ', '172.20.10.6', '2023-01-21 02:07:34'),
	(43, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTUsInVzZXJuYW1lIjoidml2IiwicGFzc3dvcmQiOiIkMmIkMTAkWXhuQkJuL1BxUFEwa094MHJWZ05mT1E3ZC5KWUFXZUdYZ1dFSEIwNUsxbXVCRnY5d0hCVTIiLCJyb2xlIjoia2FyeWF3YW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xNVQwNjoxMzo1OS4wMDBaIiwibW9kaWZpZWRfYXQiOiIyMDIzLTAxLTE1VDA2OjEzOjU5LjAwMFoifV0sImlhdCI6MTY3NDI2ODM5MCwiZXhwIjoxNjc0Mjk3MTkwfQ.bd-VOkj1F0cUstdHlUfKQQpBUGV362bufzc_HEeelz4', '172.20.10.6', '2023-01-21 02:33:10'),
	(44, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTUsInVzZXJuYW1lIjoidml2IiwicGFzc3dvcmQiOiIkMmIkMTAkWXhuQkJuL1BxUFEwa094MHJWZ05mT1E3ZC5KWUFXZUdYZ1dFSEIwNUsxbXVCRnY5d0hCVTIiLCJyb2xlIjoia2FyeWF3YW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xNVQwNjoxMzo1OS4wMDBaIiwibW9kaWZpZWRfYXQiOiIyMDIzLTAxLTE1VDA2OjEzOjU5LjAwMFoifV0sImlhdCI6MTY3NDI2ODU4NCwiZXhwIjoxNjc0Mjk3Mzg0fQ.6ja55iTSwMkjZDvIpCb7263puJXcr5scK288YPW2iYU', '172.20.10.6', '2023-01-21 02:36:24'),
	(45, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTUsInVzZXJuYW1lIjoidml2IiwicGFzc3dvcmQiOiIkMmIkMTAkWXhuQkJuL1BxUFEwa094MHJWZ05mT1E3ZC5KWUFXZUdYZ1dFSEIwNUsxbXVCRnY5d0hCVTIiLCJyb2xlIjoia2FyeWF3YW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xNVQwNjoxMzo1OS4wMDBaIiwibW9kaWZpZWRfYXQiOiIyMDIzLTAxLTE1VDA2OjEzOjU5LjAwMFoiLCJpc19kZWxldGUiOjB9XSwiaWF0IjoxNjc0Mjk5MjU2LCJleHAiOjE2NzQzMjgwNTZ9.80P5P_gqgLoVuq_ixeipTjOzn8YuvQcYXTe0rEJPkF4', '172.20.10.6', '2023-01-21 11:07:36'),
	(46, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTUsInVzZXJuYW1lIjoidml2IiwicGFzc3dvcmQiOiIkMmIkMTAkWXhuQkJuL1BxUFEwa094MHJWZ05mT1E3ZC5KWUFXZUdYZ1dFSEIwNUsxbXVCRnY5d0hCVTIiLCJyb2xlIjoia2FyeWF3YW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xNVQwNjoxMzo1OS4wMDBaIiwibW9kaWZpZWRfYXQiOiIyMDIzLTAxLTE1VDA2OjEzOjU5LjAwMFoiLCJpc19kZWxldGUiOjB9XSwiaWF0IjoxNjc0Mjk5NDg5LCJleHAiOjE2NzQzMjgyODl9.UHsmjp_F_1cEKmtx4D1nx4qTkEopMHMAZMZOtVS4LAc', '172.20.10.6', '2023-01-21 11:11:29');

-- Dumping structure for table db_resto.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_delete` int(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.category: ~2 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`id`, `category_name`, `created_at`, `modified_at`, `is_delete`) VALUES
	(1, 'makanan', '2023-01-09 15:40:53', '2023-01-09 15:40:53', 0),
	(2, 'minuman', '2023-01-09 15:41:06', '2023-01-09 15:41:06', 0);

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
  `is_delete` int(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.product: ~2 rows (approximately)
DELETE FROM `product`;
INSERT INTO `product` (`id`, `product_name`, `product_desc`, `price`, `image`, `available`, `id_category`, `created_at`, `modified_at`, `is_delete`) VALUES
	(1, 'nasi goreng', 'nasi goreng reguler', 12000, 'base64', 1, 1, '2023-01-09 16:02:12', '2023-01-09 16:05:11', 0),
	(2, 'nasi goreng ati ampela', 'nasi goreng dengan tambahan ati ampela', 17000, 'base64', 1, 1, '2023-01-09 16:03:09', '2023-01-09 16:05:14', 0),
	(3, 'es teh manis', 'es teh dengan gula', 4000, 'base64', 1, 2, '2023-01-09 16:06:34', '2023-01-09 16:06:34', 0);

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

-- Dumping data for table db_resto.trx: ~1 rows (approximately)
DELETE FROM `trx`;
INSERT INTO `trx` (`id`, `id_product`, `qty`, `notes`, `customer_name`, `seat`, `trx_number`, `payment`, `paid`, `id_user`, `created_at`, `modified_at`) VALUES
	(1, 1, 2, 'pedas', 'dede', 'A01', '220110001', 24000, 1, 2, '2023-01-10 13:13:18', '2023-01-10 14:23:11');

-- Dumping structure for table db_resto.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_delete` int(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_resto.user: ~0 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `created_at`, `modified_at`, `is_delete`) VALUES
	(12, 'vivi', '$2b$10$SDVihAcakXIrl.CrgufwGuYxRXGRaCZA0qHbhC9nmXaFzwIwZiiF6', 'karyawan', '2023-01-14 04:00:20', '2023-01-14 04:00:20', 0),
	(13, 'vivit', '$2b$10$qFLJunVjnKxBYMnP92qGL./CO/EimX8eFMXMlflOdWUo5/VJPHS7W', 'karyawan', '2023-01-15 03:36:42', '2023-01-15 03:36:42', 0),
	(14, 'vivita', '$2b$10$AU1IUHla9e1Wvd5k56dF4ev1tnhX/rxxcJnbHQwto1JuL7Y695jjK', 'karyawan', '2023-01-15 04:50:48', '2023-01-15 04:50:48', 0),
	(15, 'viv', '$2b$10$YxnBBn/PqPQ0kOx0rVgNfOQ7d.JYAWeGXgWEHB05K1muBFv9wHBU2', 'karyawan', '2023-01-15 06:13:59', '2023-01-15 06:13:59', 0),
	(16, 'vivvv', '$2b$10$39ka6YO8Sx6q/Rx4eN5i3uyyKEPQKSyY9FlEikQCveFnbXYPfi5Ly', 'administrator', '2023-01-21 08:03:49', '2023-01-21 08:03:49', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
