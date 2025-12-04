-- -----------------------------------------------------

-- 1. CONFIGURATION & NETTOYAGE (D'abord on prépare le terrain)

-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `pizzayolo` ;

CREATE SCHEMA IF NOT EXISTS `pizzayolo` DEFAULT CHARACTER SET utf8mb4 ;

USE `pizzayolo` ;

-- Table Pizzas

DROP TABLE IF EXISTS `pizzas` ;

CREATE TABLE IF NOT EXISTS `pizzas` (

                                        `id` INT NOT NULL AUTO_INCREMENT,

                                        `name` VARCHAR(45) NOT NULL,

    `price` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`),

    UNIQUE INDEX `name_unique` (`name` ASC)

    ) ENGINE = InnoDB;

-- Table Ingredients

DROP TABLE IF EXISTS `ingredients` ;

CREATE TABLE IF NOT EXISTS `ingredients` (

                                             `id` INT NOT NULL AUTO_INCREMENT,

                                             `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`),

    UNIQUE INDEX `name_unique` (`name` ASC)

    ) ENGINE = InnoDB;

-- Table de Liaison (Celle qui manquait dans ton bloc CREATE)

DROP TABLE IF EXISTS `pizza_ingredients` ;

CREATE TABLE IF NOT EXISTS `pizza_ingredients` (

                                                   `pizza_id` INT NOT NULL,

                                                   `ingredient_id` INT NOT NULL,

                                                   PRIMARY KEY (`pizza_id`, `ingredient_id`),

    CONSTRAINT `fk_pizza`

    FOREIGN KEY (`pizza_id`) REFERENCES `pizzas` (`id`)

    ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT `fk_ingredient`

    FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)

    ON DELETE RESTRICT ON UPDATE CASCADE

    ) ENGINE = InnoDB;


DROP TABLE IF EXISTS `pizza_du_jour` ;
CREATE TABLE IF NOT EXISTS `pizza_du_jour` (

                                               `pizza_id_choix` INT NOT NULL,

                                               UNIQUE (`pizza_id_choix`),

    CONSTRAINT `fk_pizza_choix`
    FOREIGN KEY (`pizza_id_choix`)
    REFERENCES `pizzas` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB;


-- Insérer les Ingrédients

INSERT INTO ingredients (name) VALUES

                                   ('Sauce Tomate'),       -- 1

                                   ('Mozzarella'),         -- 2

                                   ('Jambon'),             -- 3

                                   ('Champignons'),        -- 4

                                   ('Ananas'),             -- 5

                                   ('Poivrons'),           -- 6

                                   ('Olives Noires'),      -- 7

                                   ('Origan');             -- 8

-- Insérer les Pizzas

INSERT INTO pizzas (name, price) VALUES

                                     ('Margherita', 9.50),   -- 1

                                     ('Reine', 12.00),       -- 2

                                     ('Hawaiienne', 13.50),  -- 3

                                     ('Végétarienne', 11.00);-- 4

-- Faire les liens (Pizzas <-> Ingrédients)

-- Margherita

INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (1, 1), (1, 2), (1, 8);

-- Reine

INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (2, 1), (2, 2), (2, 3), (2, 4), (2, 8);

-- Hawaiienne

INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (3, 1), (3, 2), (3, 3), (3, 5);

-- Végétarienne

INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES (4, 1), (4, 2), (4, 4), (4, 6), (4, 7);


INSERT INTO `pizza_du_jour` (`pizza_id_choix`) VALUES (4);


SET SQL_MODE=@OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
