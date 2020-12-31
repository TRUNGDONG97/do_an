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
-- Table structure for table `config_time`
--

DROP TABLE IF EXISTS `config_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time_start_work_morning` int NOT NULL DEFAULT '510',
  `time_start_checkin_morning` int NOT NULL DEFAULT '300',
  `time_end_checkin_morning` int NOT NULL DEFAULT '540',
  `time_start_checkout_morning` int NOT NULL DEFAULT '690',
  `time_end_checkout_morning` int NOT NULL DEFAULT '780',
  `time_start_work_afternoon` int NOT NULL DEFAULT '810',
  `time_start_checkin_afternoon` int NOT NULL DEFAULT '720',
  `time_end_checkin_afternoon` int NOT NULL DEFAULT '840',
  `time_start_checkout_afternoon` int NOT NULL DEFAULT '1020',
  `time_end_checkout_afternoon` int NOT NULL DEFAULT '1410',
  `max_time_late` int NOT NULL DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config_time`
--

LOCK TABLES `config_time` WRITE;
/*!40000 ALTER TABLE `config_time` DISABLE KEYS */;
INSERT INTO `config_time` VALUES (1,510,315,540,690,780,810,780,840,1020,1410,100);
/*!40000 ALTER TABLE `config_time` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-31  8:06:35
