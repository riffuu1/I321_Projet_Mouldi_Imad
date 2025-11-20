-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.43 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage des données de la table pizzayolo.ingredients : ~8 rows (environ)
INSERT INTO `ingredients` (`id`, `name`) VALUES
	(1, 'Sauce Tomate'),
	(2, 'Mozzarella'),
	(3, 'Jambon'),
	(4, 'Champignons'),
	(5, 'Ananas'),
	(6, 'Poivrons'),
	(7, 'Olives Noires'),
	(8, 'Origan');

-- Listage des données de la table pizzayolo.pizzas : ~4 rows (environ)
INSERT INTO `pizzas` (`id`, `name`, `price`) VALUES
	(1, 'Margherita', 9.50),
	(2, 'Reine', 12.00),
	(3, 'Hawaiienne', 13.50),
	(4, 'Végétarienne', 11.00);

-- Listage des données de la table pizzayolo.pizza_ingredients : ~17 rows (environ)
INSERT INTO `pizza_ingredients` (`pizza_id`, `ingredient_id`) VALUES
	(1, 1),
	(1, 2),
	(1, 8),
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 4),
	(2, 8),
	(3, 1),
	(3, 2),
	(3, 3),
	(3, 5),
	(4, 1),
	(4, 2),
	(4, 4),
	(4, 6),
	(4, 7);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
