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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gener` tinyint DEFAULT NULL,
  `url_avatar` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `department` int DEFAULT NULL,
  `employee_code` varchar(45) NOT NULL,
  `position` int DEFAULT NULL,
  `device_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Lê Thị','Trang','0123456789','2020-12-23','e10adc3949ba59abbe56e057f20f883e','Thanh Hóa','tranglt@gmail.com',0,NULL,'U2FsdGVkX19K4b0E/2KMIu3JzCogZMfbNLagQeNHMMQ=',1,1,'NS1',1,'9c80df39-180b-44b6-aad8-69654fcf6ab9'),(2,'Lê Trung','Đông','0969696969','2020-11-09','3d69703f45fa2547c16a9be8c5d9b6c7','Bắc Giang','donglt@gmail.com',1,NULL,NULL,1,2,'IT1',1,NULL),(3,'Nguyễn Xuân','Thắng','0987777777','1997-11-05','2a5874f2be9d3c9b59126770ef9b66c4','Bắc Giang','thangtx@gmail.com',1,NULL,NULL,1,3,'KH1',1,NULL),(4,'Phạm Đức','Tuệ','0987654321','1998-11-05','6fb42da0e32e07b61c9f0251fe627a9c','Thái Bình','tuepd@gmail.com',1,NULL,NULL,1,2,'IT2',0,NULL),(7,'Nguyễn Văn','Toản','0889848889','2020-12-15','234d4cc8ecaa4f201c864eb444079f28','Thái bình','toannv1@gmail.com',1,NULL,NULL,1,2,'IT3',0,NULL),(8,'Dương Văn','Công','0933434434','2020-12-15','dcbff98f1efac06bf9a0f0de1c754c00','Thái Nguyên','congdv@gmail.com',1,NULL,NULL,1,2,'IT4',0,NULL),(10,'Dương Văn','Chính','0312323223','2020-12-15','55f5a49938564be9144a5ee26cfdbd28','Thái Nguyên','chinhdv@gmail.com',1,NULL,NULL,1,1,'NS2',0,NULL),(11,'Lê Văn','Quân','0889599889','2020-12-15','ca190b333f7e7b4290b2266c6b6bd638','Thái bình','quanlv@gmail.com',1,NULL,NULL,1,2,'IT5',0,NULL),(12,'Đào Văn ','Tiến','0312323623','1997-11-11','a10b7e58bfc25c4b138f98dc570a6062','Thái Nguyên','tiendv@gmail.com',0,NULL,NULL,1,2,'IT6',0,NULL),(13,'Lê Thị','Vân','0987678998','1998-12-02','3d8b9ce203e109cb30085f03f0f6c105','Thanh Hóa','vavanlt@gmail.com',0,NULL,NULL,1,3,'KH2',0,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
