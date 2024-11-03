-- MySQL dump 10.13  Distrib 8.4.2, for Win64 (x86_64)
--
-- Host: localhost    Database: disaster_management
-- ------------------------------------------------------
-- Server version	8.4.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `crises`
--

DROP TABLE IF EXISTS `crises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `severity` enum('low','medium','high') DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `reviewed_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `approved_by` (`reviewed_by`),
  CONSTRAINT `crises_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `crises_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crises`
--

LOCK TABLES `crises` WRITE;
/*!40000 ALTER TABLE `crises` DISABLE KEYS */;
INSERT INTO `crises` VALUES (1,'Cyclone Alert','A severe cyclone is approaching coastal areas.','Coastal Region','high','approved',NULL,12,'2024-09-20 05:12:43','2024-09-20 16:35:19'),(2,'Flooding in Ganges','Heavy rains have caused severe flooding in the region.','Ganges River','high','approved',NULL,12,'2024-09-20 05:12:43','2024-09-20 16:42:33'),(3,'Landslides in Hills','Heavy rainfall has triggered landslides, threatening communities.','Hill Districts','medium','approved',NULL,12,'2024-09-20 05:12:43','2024-09-20 16:39:37'),(4,'Drought in North','Prolonged dry spells have led to drought in northern districts.','Northern Districts','medium','approved',NULL,12,'2024-09-20 05:12:43','2024-09-20 16:41:26'),(5,'Heatwave in Cities','Severe heatwave conditions pose health risks in cities.','Dhaka','medium','rejected',NULL,12,'2024-09-20 05:12:43','2024-09-20 16:42:13'),(6,'Flood in Southern Bangladesh','Feni, Noakhali, Khagrachari, Chattagram affected.','Chattagram','high','rejected',NULL,12,'2024-09-20 09:11:37','2024-09-20 16:45:27'),(7,'Flood in Southern Bangladesh','Feni, Noakhali, Khagrachari, Chattagram affected.','Chattagram',NULL,'rejected',NULL,12,'2024-09-20 09:23:11','2024-09-20 16:47:09');
/*!40000 ALTER TABLE `crises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donor_name` varchar(255) DEFAULT NULL,
  `donor_email` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `donation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,'Alice Smith','alice.smith@example.com',1000.00,'2024-09-20 05:15:14'),(2,'Bob Johnson','bob.johnson@example.com',500.50,'2024-09-20 05:15:14'),(3,'Charlie Brown','charlie.brown@example.com',750.75,'2024-09-20 05:15:14'),(4,'Diana Prince','diana.prince@example.com',1200.00,'2024-09-20 05:15:14'),(5,'Eve Adams','eve.adams@example.com',300.25,'2024-09-20 05:15:14'),(6,'Sakib','sakib@gmail.com',2000.00,'2024-09-20 17:23:17'),(7,'Rakib','rakib@gmail.com',5000.00,'2024-09-21 16:05:45'),(8,'MrX','mrx@gmail.com',20000.00,'2024-09-21 23:45:31'),(9,'Brad','brad@gmail.com',500.00,'2024-09-22 13:20:04'),(10,'Max','max@gmail.com',5000.00,'2024-09-23 02:40:25');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financials`
--

DROP TABLE IF EXISTS `financials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fund` decimal(10,2) DEFAULT '0.00',
  `total_expenses` decimal(10,2) DEFAULT '0.00',
  `total_donation` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financials`
--

LOCK TABLES `financials` WRITE;
/*!40000 ALTER TABLE `financials` DISABLE KEYS */;
INSERT INTO `financials` VALUES (1,15051.50,21200.00,25500.00);
/*!40000 ALTER TABLE `financials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `item_type` enum('relief','expense') NOT NULL,
  `quantity` varchar(30) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `purchased_by` int DEFAULT NULL,
  `purchased_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `purchased_by` (`purchased_by`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`purchased_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'Water Bottles','relief','100',NULL,1,'2024-09-20 04:30:00'),(2,'Blankets','relief','50',NULL,2,'2024-09-21 03:00:00'),(3,'Canned Food','relief','200',NULL,1,'2024-09-22 05:45:00'),(4,'First Aid Kits','relief','30',NULL,3,'2024-09-22 08:15:00'),(5,'Stationery','expense','50',326.00,17,'2024-09-21 02:30:00'),(6,'Transportation Cost','expense','1',232.00,14,'2024-09-22 07:00:00'),(7,'Fuel for Generators','expense','100',174.00,10,'2024-09-22 10:30:00'),(8,'Administrative Supplies','expense','40',162.00,14,'2024-09-23 03:15:00'),(10,'Rice, salt, eggs','expense','20kg',10000.00,12,'2024-09-21 16:20:55'),(12,'Utensils','expense','10 unit',1000.00,12,'2024-09-21 23:44:47'),(13,'Eggs','relief','500',5000.00,19,'2024-09-23 02:21:17'),(14,'Boat','expense','2',20000.00,19,'2024-09-23 02:36:49'),(15,'Medicine','expense','10',200.00,19,'2024-09-23 02:39:06');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `report_type` enum('donation','expense','crisis') NOT NULL,
  `generated_by` int NOT NULL,
  `report_data` json DEFAULT NULL,
  `generated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `generated_by` (`generated_by`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`generated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_description` text NOT NULL,
  `volunteer_id` int NOT NULL,
  `crisis_id` int NOT NULL,
  `status` enum('pending','in-progress','completed') DEFAULT 'pending',
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `crisis_id` (`crisis_id`),
  KEY `fk_volunteer` (`volunteer_id`),
  CONSTRAINT `fk_volunteer` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers` (`user_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers` (`user_id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`crisis_id`) REFERENCES `crises` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (9,'Assist with evacuation procedures',10,1,'pending','2024-09-22 14:07:49',1),(10,'Provide medical support at the shelter',11,1,'in-progress','2024-09-22 14:07:49',1),(11,'Distribute food supplies',12,2,'completed','2024-09-22 14:07:49',2),(12,'Set up a communication center',13,2,'pending','2024-09-22 14:07:49',2),(13,'Conduct damage assessment',14,3,'pending','2024-09-22 14:07:49',1),(14,'Organize donation drives',15,3,'completed','2024-09-22 14:07:49',3),(15,'Coordinate with local authorities',16,4,'in-progress','2024-09-22 14:07:49',3),(16,'Provide psychological support',17,4,'pending','2024-09-22 14:07:49',2);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('admin','volunteer') NOT NULL DEFAULT 'volunteer',
  `age` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','johndoe@example.com','password123','1234567890','2024-09-19 08:17:27','volunteer',38),(2,'Jane Smith','janesmith@example.com','password456','0987654321','2024-09-19 08:17:27','volunteer',18),(3,'Mike Johnson','mikejohnson@example.com','password789','1122334455','2024-09-19 08:17:27','volunteer',45),(10,'Mahmud Hasan Sourov','sourov@gmail.com','$2b$10$gbi9Ye7WbOVqpxJyrk7EiuzmIbrrg10cJLhC3QvCnBxwmMGo2Dqji','01523422243','2024-09-20 04:05:58','volunteer',44),(11,'Sourov','sourov12@gmail.com','$2b$10$idfQELSwQzOfBDWK1A2K8uySBOAYIUe5A9ACO.9f2frUgD3bQVIGy','01523422243','2024-09-20 04:58:56','volunteer',31),(12,'Mahmud Hasan','mahmud@gmail.com','$2b$10$w3AlxPES61IRNyWK6khhEOqhb6r8c6j8MEVhuhJDihk97G58LuqXK','01523422243','2024-09-20 04:59:44','admin',12),(13,'Mahabobur Rahman','mahabub@gmail.com','$2b$10$Z60kFUvWZAxPZTYlqMvjpuH/wEhEh76XzMe/Q.cZD7eYUSZiURAHG','01523423443','2024-09-20 05:27:14','admin',36),(14,'Frodo','frodo@gmail.com','$2b$10$kGZ0HPY5csLV7rEIy9Q9wuWn3KD6OUlxr32cm7lOtBx3Yg5tAg5o2','01523123443','2024-09-20 05:27:45','volunteer',15),(15,'Sam','sam@gmail.com','$2b$10$jcgvG1eV8J4FCqfjvPUBQuXL9YmydKH9aUGXEHx7cR2w.RHS97MQ6','01523123443','2024-09-20 05:27:53','volunteer',33),(16,'Gandalf','gandalf@gmail.com','$2b$10$mDzb5AjfkcfMYaZDkVEbL.bB5ImeuJ/jBipDHBh/hHrFFJ8GFRHCG','01523123443','2024-09-20 05:28:03','volunteer',32),(17,'Aragon','aragon@gmail.com','$2b$10$xO7jkmyGwym8X3bvLJjFcuH2iY.FPKfHlGk05qtikXyF1kNSYW2TK','01942313443','2024-09-20 05:28:15','volunteer',47),(18,'Legolas','legolas@gmail.com','$2b$10$KIE1bmuPc72rIE2rBkiiF.JsGR/9pDf169gYb9QbmUidpf2B.48f.','01434213443','2024-09-20 05:28:35','volunteer',13),(19,'Gimli','gimli@gmail.com','$2b$10$6vDVN8xiDRv3YzGSm1AOSeHJ.dWPDremCi6TXW7ZxNMmZkyjc11i2','012312313123','2024-09-22 05:34:30','volunteer',60),(20,'Pippin','pippin@gmail.com','$2b$10$C471XGgdElnxBgSLbPYYGehbCHFZaOiYxFoJ5iWjxxIIRB6.K2zrG','0123123121','2024-09-22 05:39:25','volunteer',35),(21,'Merry','merry@gmail.com','$2b$10$LkEXjQHNoKSOVQtm3.23ZurO71hFaqVTSBn/NuhFHAX4ZvF9duIqS','12312432321','2024-09-22 05:48:59','volunteer',32);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteers`
--

DROP TABLE IF EXISTS `volunteers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteers` (
  `user_id` int NOT NULL,
  `task_count` int DEFAULT '0',
  `assigned_crisis_id` int DEFAULT NULL,
  `status` enum('active','idle') DEFAULT 'idle',
  PRIMARY KEY (`user_id`),
  KEY `assigned_crisis_id` (`assigned_crisis_id`),
  CONSTRAINT `volunteers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `volunteers_ibfk_2` FOREIGN KEY (`assigned_crisis_id`) REFERENCES `crises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteers`
--

LOCK TABLES `volunteers` WRITE;
/*!40000 ALTER TABLE `volunteers` DISABLE KEYS */;
INSERT INTO `volunteers` VALUES (10,1,1,'active'),(11,1,1,'active'),(12,1,2,'active'),(13,1,2,'active'),(14,1,3,'active'),(15,1,3,'active'),(16,1,4,'active'),(17,1,4,'active'),(19,0,NULL,'idle'),(20,0,NULL,'idle'),(21,0,NULL,'idle');
/*!40000 ALTER TABLE `volunteers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-25 10:49:05
