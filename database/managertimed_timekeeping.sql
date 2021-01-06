-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: managertimed
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `timekeeping`
--

DROP TABLE IF EXISTS `timekeeping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timekeeping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_employee` int NOT NULL,
  `time_checkin` int NOT NULL DEFAULT '0',
  `date_timekeeping` date DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `time_late` int NOT NULL DEFAULT '0',
  `time_checkout` int NOT NULL DEFAULT '0',
  `workday` float NOT NULL DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id_mac_address` int DEFAULT NULL,
  `type` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timekeeping`
--

LOCK TABLES `timekeeping` WRITE;
/*!40000 ALTER TABLE `timekeeping` DISABLE KEYS */;
INSERT INTO `timekeeping` VALUES (1,1,520,'2020-12-19',1,10,1060,1,NULL,1,1,1),(2,1,490,'2020-12-20',1,0,1100,1,NULL,1,1,1),(3,1,530,'2020-12-21',1,20,1050,1,NULL,1,1,1),(4,1,525,'2020-12-18',1,15,724,0.5,NULL,1,1,1),(5,1,820,'2020-12-17',1,10,1061,0.5,NULL,1,1,1),(6,1,510,'2021-01-06',1,0,1060,1,NULL,1,1,1),(7,10,510,'2021-01-06',1,0,1066,1,NULL,1,1,1);
/*!40000 ALTER TABLE `timekeeping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-07  0:43:58
