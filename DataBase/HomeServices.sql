-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: homework
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `ud0x`
--

DROP TABLE IF EXISTS `ud0x`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ud0x` (
  `uuid0x0` varchar(255) NOT NULL,
  `power0x1` varchar(12) NOT NULL,
  `email0x2` blob NOT NULL,
  `pass0x3` blob NOT NULL,
  `fullname0x4` blob NOT NULL,
  `verify0x5` int DEFAULT NULL,
  `pp0x6` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ud0x`
--

LOCK TABLES `ud0x` WRITE;
/*!40000 ALTER TABLE `ud0x` DISABLE KEYS */;
INSERT INTO `ud0x` VALUES ('efe2591f-3ced-42fd-ad35-2fef98fab7af','aurora',_binary '$2b$12$FNP8hTZ7gUDtK.TX6YILfOXEbzJyuJQmnO829O9Rbfg6xjkTvltFm',_binary '$2b$12$FK5QIcA4ZLy5KG1KxMzEAe3sG0nkWMjgOWkTPptt7fWdcBPEk860C',_binary 'ZairDeLuque',0,_binary 'notassign');
/*!40000 ALTER TABLE `ud0x` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v0x`
--

DROP TABLE IF EXISTS `v0x`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `v0x` (
  `code0x0` varchar(6) NOT NULL,
  `email0x1` varchar(45) NOT NULL,
  `date0x2` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v0x`
--

LOCK TABLES `v0x` WRITE;
/*!40000 ALTER TABLE `v0x` DISABLE KEYS */;
/*!40000 ALTER TABLE `v0x` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-19 21:56:21
