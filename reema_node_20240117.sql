-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: reema_node
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `pagetitle` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `pagetitle` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `showSubMenu` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `showOnHomepage` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `slug_2` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'cptjGEAHpPt5LbTB5YtksqnD2BeuJsn0','Soccer & Footballs','soccer-footballs','footballs','Our soccer collection includes Hand stitched, Machine stitched, Thermo bounded & Fusion Tec® Hybrid balls.',1,1,'2023-12-01 09:52:46','2023-12-29 12:46:30',1),(2,'fczteZf0wiDzYa10s4VZePJFN5KIRc8e','Handballs','handballs','handballs','Our handball collection includes Hand stitched, Machine stitched & Fusion Tec® Hybrid balls.',1,1,'2023-12-01 09:53:15','2023-12-29 12:46:38',1),(5,'Qwlhg3uZODqIWL7KYg632t4Jox1YFFb2','Volleyballs','volleyballs','volleyballs','Our volleyball collection includes Hand stitched & Machine stitched balls.',1,0,'2023-12-29 11:00:03','2023-12-29 12:46:45',1),(6,'p0SIA1aR9xiqWI2oxuZXdme7IpSHCXqy','Goalkeeper Gloves','goalkeeper-gloves','Goalkeeper Gloves','Our featured goalkeeper gloves include Negative cut, Roll finger, Hybrid & traditional Flat cut.',1,0,'2023-12-29 11:04:21','2023-12-29 12:46:56',1),(7,'P3uuXXcgTJiNTvXbS9XaX8ZPnSNwJpQC','Dodgeballs','dodgeballs','dodgeballs','',1,0,'2023-12-29 11:05:02','2023-12-29 11:37:24',0),(8,'rSLOjhuIyODcGMaKS3Kt2BZzAXOuRGky','Futsal Balls','futsal-balls','futsal balls','',1,0,'2023-12-29 11:05:33','2023-12-29 11:37:22',0),(9,'55uuAJ9KhM3nipkb86Dhja493EgDdc5p','Sportswears','sportwears','Sportswears','',1,1,'2023-12-29 11:06:07','2023-12-29 11:37:17',0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  `altText` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `ext` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'0FIaz6U4gSEbLRdo3nmJf1Wl5WMZQmBy','testing.jpg','testing','testing','testing','testing','2023-12-01 09:56:27','2023-12-16 11:57:53','testing','jpg'),(2,'LzhE82uKEJplPOf2nl9oYR4HU8nL8GUw','1701424584683.jpg',NULL,NULL,NULL,NULL,'2023-12-01 09:56:27','2023-12-16 11:00:58','1701424584683','jpg'),(3,'P6wkjVnXYuvJhprKefGEY328RKtlWYPJ','1701424585534.jpg',NULL,NULL,NULL,NULL,'2023-12-01 09:56:27','2023-12-16 11:02:53','1701424585534','jpg'),(4,'BHfaP4f5s5b55pTp2vqHOUcxaj4f77yn','1701424586308.jpg',NULL,NULL,NULL,NULL,'2023-12-01 09:56:27','2023-12-01 09:56:27','1701424586308','jpg'),(5,'8cOWaLUDShsD3AascAnYPypjnJq7NA7e','1701424856799.jpg',NULL,NULL,NULL,NULL,'2023-12-01 10:01:00','2023-12-01 10:01:00','1701424856799','jpg'),(6,'cpFKFyF0qilGDdqVvYVgglyfand9dzbw','1701424857539.jpg',NULL,NULL,NULL,NULL,'2023-12-01 10:01:00','2023-12-01 10:01:00','1701424857539','jpg'),(7,'nVuUuxezOKWdFoffRMMtSSnsKLyAUMya','1701424858205.jpg',NULL,NULL,NULL,NULL,'2023-12-01 10:01:00','2023-12-01 10:01:00','1701424858205','jpg'),(8,'wQ4vylbaEnEIDbpC9XPcXbvQo0YqAlqS','1701424858849.jpg',NULL,NULL,NULL,NULL,'2023-12-01 10:01:00','2023-12-01 10:01:00','1701424858849','jpg'),(9,'1u5Vj3pYIYe0gSmnaenQR84Zz1cL9k7l','1701424859541.jpg',NULL,NULL,NULL,NULL,'2023-12-01 10:01:00','2023-12-01 10:01:00','1701424859541','jpg'),(10,'NcthRMR6HTjC8rD4aiqgaU6O0AneJW4n','1701492182811.jpg',NULL,NULL,NULL,NULL,'2023-12-02 04:43:04','2023-12-02 04:43:04','1701492182811','jpg'),(11,'tJwShTYLaj9QoGotOevIhmL0dUkkemAx','1701492183310.jpg',NULL,NULL,NULL,NULL,'2023-12-02 04:43:04','2023-12-02 04:43:04','1701492183310','jpg'),(12,'Ihh6QAxx3JEGrn85wUe6on38xspWwYvU','1701492183575.jpg',NULL,NULL,NULL,NULL,'2023-12-02 04:43:04','2023-12-02 04:43:04','1701492183575','jpg'),(13,'0X0mTSwKlJV7HLacUEpKRR3fwZSkkKVK','1701492183825.jpg',NULL,NULL,NULL,NULL,'2023-12-02 04:43:04','2023-12-02 04:43:04','1701492183825','jpg'),(14,'MoMDdnNPv7Vc0ooSJ96zUYPC01myQL2I','1701492184051.jpg',NULL,NULL,NULL,NULL,'2023-12-02 04:43:04','2023-12-02 04:43:04','1701492184051','jpg'),(15,'Pbat9E3ox58jsIqK9iWIZJsSqAmnnMML','1701518083396.jpeg',NULL,NULL,NULL,NULL,'2023-12-02 11:54:44','2023-12-02 11:54:44','1701518083396','jpeg'),(16,'lJyFtWx3foAfCKjZ2Zw1PLTCuKOdWeWU','1701518083644.jpeg',NULL,NULL,NULL,NULL,'2023-12-02 11:54:44','2023-12-02 11:54:44','1701518083644','jpeg'),(17,'Vwh8v5Uxg54EdAgN0D8fZgkexJJ7EJMS','1701518083873.jpeg',NULL,NULL,NULL,NULL,'2023-12-02 11:54:44','2023-12-02 11:54:44','1701518083873','jpeg'),(18,'zK3ACtS5vsjyRA8oZirQ9dwz8rVXDAEz','1701518084059.jpeg',NULL,NULL,NULL,NULL,'2023-12-02 11:54:44','2023-12-02 11:54:44','1701518084059','jpeg'),(19,'3h5nMfJcC9ZUw1LGlu5ejtsNLgs9745O','1701946794965.png',NULL,NULL,NULL,NULL,'2023-12-07 10:59:55','2023-12-07 10:59:55','1701946794965','png'),(20,'gxKVm2ffaAES39dgkYGFDA4n09AokmuQ','1701946814957.png',NULL,NULL,NULL,NULL,'2023-12-07 11:00:15','2023-12-07 11:00:15','1701946814957','png'),(21,'3F5IzbOlZOzQQqhYkaMaxDDNe91fPmrC','1702100585690.JPEG',NULL,NULL,NULL,NULL,'2023-12-09 05:43:09','2023-12-09 05:43:09','1702100585690','JPEG'),(22,'OPOkxRTmDXN2k1362u0ITBiakDx6qArS','1702100586878.JPEG',NULL,NULL,NULL,NULL,'2023-12-09 05:43:09','2023-12-09 05:43:09','1702100586878','JPEG'),(23,'mRo7aUUP1bPsnvB3oXJoadKljYBRECiT','1702100587822.JPEG',NULL,NULL,NULL,NULL,'2023-12-09 05:43:09','2023-12-09 05:43:09','1702100587822','JPEG'),(24,'oR763xL7TYcw4ZfGcEnzbqBiVx2epl4W','1702100588749.JPEG',NULL,NULL,NULL,NULL,'2023-12-09 05:43:09','2023-12-09 05:43:09','1702100588749','JPEG');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `imageId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`imageId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`imageId`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_image_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES ('2023-12-01 09:59:04','2023-12-01 09:59:04',1,2),('2023-12-01 09:59:04','2023-12-01 09:59:04',2,2),('2023-12-11 07:59:40','2023-12-11 07:59:40',2,34),('2023-12-01 09:59:04','2023-12-01 09:59:04',3,2),('2023-12-01 09:59:04','2023-12-01 09:59:04',4,2),('2023-12-01 10:01:44','2023-12-01 10:01:44',5,4),('2023-12-01 10:01:44','2023-12-01 10:01:44',6,4),('2023-12-01 10:01:44','2023-12-01 10:01:44',7,4),('2023-12-01 10:01:44','2023-12-01 10:01:44',8,4),('2023-12-01 10:01:44','2023-12-01 10:01:44',9,4),('2023-12-29 13:20:31','2023-12-29 13:20:31',10,6),('2023-12-29 13:20:31','2023-12-29 13:20:31',11,6),('2023-12-30 05:47:19','2023-12-30 05:47:19',15,30),('2023-12-30 05:47:19','2023-12-30 05:47:19',16,30),('2023-12-30 05:47:19','2023-12-30 05:47:19',17,30),('2023-12-30 05:47:19','2023-12-30 05:47:19',18,30),('2023-12-07 11:04:25','2023-12-07 11:04:25',19,31),('2023-12-07 11:02:43','2023-12-07 11:02:43',20,32),('2023-12-09 05:44:26','2023-12-09 05:44:26',21,33),('2023-12-09 05:44:26','2023-12-09 05:44:26',22,33);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sizeId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`sizeId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_size_ibfk_1` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_size_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES ('2023-12-01 09:59:04','2023-12-01 09:59:04',1,2),('2023-12-01 10:01:44','2023-12-01 10:01:44',1,4),('2023-12-29 13:20:31','2023-12-29 13:20:31',1,6),('2023-12-07 11:04:25','2023-12-07 11:04:25',1,31),('2023-12-07 11:02:43','2023-12-07 11:02:43',1,32),('2023-12-09 05:44:26','2023-12-09 05:44:26',1,33),('2023-12-11 07:59:40','2023-12-11 07:59:40',1,34);
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_tag`
--

DROP TABLE IF EXISTS `product_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_tag` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tagId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`tagId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_tag_ibfk_1` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_tag_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tag`
--

LOCK TABLES `product_tag` WRITE;
/*!40000 ALTER TABLE `product_tag` DISABLE KEYS */;
INSERT INTO `product_tag` VALUES ('2023-12-01 09:59:04','2023-12-01 09:59:04',1,2),('2023-12-01 10:01:44','2023-12-01 10:01:44',1,4),('2023-12-29 13:20:31','2023-12-29 13:20:31',1,6),('2023-12-07 11:04:26','2023-12-07 11:04:26',1,31),('2023-12-07 11:02:43','2023-12-07 11:02:43',1,32),('2023-12-09 05:44:26','2023-12-09 05:44:26',1,33),('2023-12-11 07:59:40','2023-12-11 07:59:40',1,34);
/*!40000 ALTER TABLE `product_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `showcased` tinyint(1) DEFAULT '0',
  `recommended` tinyint(1) DEFAULT '0',
  `active` tinyint(1) DEFAULT '0',
  `price` decimal(10,2) DEFAULT NULL,
  `pagetitle` varchar(255) DEFAULT NULL,
  `shortDescription` varchar(255) DEFAULT NULL,
  `LongDescription` varchar(255) DEFAULT NULL,
  `specifications` varchar(255) DEFAULT NULL,
  `features` varchar(255) DEFAULT NULL,
  `care` varchar(255) DEFAULT NULL,
  `usage` varchar(255) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `subCategoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `year` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `slug_2` (`slug`),
  KEY `categoryId` (`categoryId`),
  KEY `subCategoryId` (`subCategoryId`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'iM2JNa8bUvSCxcBuUk0sQ9rkmVA9bKxq','Spiro Elite','spiro-elite',0,0,1,10.01,'testing','testing','<p>testing</p>','<p>testing</p>','<p>testing</p>','<p>testing</p>','Training',1,1,'2023-12-01 09:59:04','2023-12-29 11:48:40',2019),(4,'XfhZrbR7V0oZvvs6ttU6Ycz0rlWCYNJh','Elite','elite',0,0,1,12.45,'testing','testing','<p>testing</p>','<p>testing</p>','<p>testing</p>','<p>testing</p>','Top Competition',1,1,'2023-12-01 10:01:44','2023-12-29 11:48:06',2020),(6,'jocQNB4ke2E4t2MQRveIusoWy4bHYVu4','testing','testing',1,0,1,12.45,'testing','testing','<p>testing</p>','<p>testing</p>','<p>testing</p>','<p>testing</p>','testing',2,4,'2023-12-02 04:56:48','2023-12-30 05:46:47',2023),(30,'0Voff7Pz5TpKssu6tfOEHHe1s5dBx9dI','Active Sala','active-sala',1,0,1,0.00,'title','short','<p>long</p>','<p>specifications</p>','<p>features</p>','<p>care</p>','Training',6,NULL,'2023-12-02 11:55:12','2023-12-30 05:47:19',2023),(31,'Tlf2ISvFqJD0A4aG8fTOkyqd7VhGRX0h','Climate','climate',1,0,1,1.00,'title','short description','<p>long description</p>','<p>specifications</p>','<p>features</p>','<p>care</p>','Match',1,2,'2023-12-07 11:01:10','2023-12-14 10:49:10',2023),(32,'TYgv6aTUFDNq8D6WxYgwcnf6ytx7dYZs','Striker 3D','striker-3d',1,1,1,2.00,'title','short description','<p>long description</p>','<p>specifications</p>','<p>features</p>','<p>care</p>','Top Competition',1,2,'2023-12-07 11:02:43','2023-12-07 11:02:43',2023),(33,'BBu8gnobWDPp479rCsk8E59MwPepf5w6','Yellow ball','freestyle',1,1,1,0.00,'title','short description','<p>long description</p>','<p>specification</p>','<p>features</p>','<p>care</p>','Match',1,1,'2023-12-09 05:44:26','2023-12-09 05:44:26',2020),(34,'YPgPuJGqxFH3RaARIjzP5N6nJuwHNwzX','Spiro Elite 2.0','spiro-elite-2.0',1,1,1,0.00,'title','short','<p>long</p>','<p>specs</p>','<p>features</p>','<p>care</p>','Training',1,3,'2023-12-11 07:59:40','2023-12-11 08:03:35',2024);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rfqs`
--

DROP TABLE IF EXISTS `rfqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rfqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `rfqs_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rfqs`
--

LOCK TABLES `rfqs` WRITE;
/*!40000 ALTER TABLE `rfqs` DISABLE KEYS */;
INSERT INTO `rfqs` VALUES (1,'fW1XqqTqtipJQxVzqK3dUCUadzQokRJu','Muhammad Amir','reematec@gmail.com','Pakistan',1,2,'2023-12-13 07:24:43','2023-12-13 07:24:43'),(2,'6FiIGm87XNxKRCpjIo58wNC9Mpw6zoqC','ALISHAN IBN AKRAM','alishan_244@gmail.com','Pakistan',3,2,'2023-12-13 12:35:43','2023-12-13 12:35:43'),(3,'H4FCBVcAo5MiM2AuQ6oaAPdKtsb5gzoH','Muhammad Amir','reematec@gmail.com','Pakistan',1,2,'2023-12-18 11:06:34','2023-12-18 11:06:34'),(4,'oUb7ECKRVlgt8HeGEahnsmQJOZtEYAi6','Alishanpyn','alikuju@reema.com','Pakistan',15,2,'2023-12-18 11:11:37','2023-12-18 11:11:37'),(5,'k48aanDQSMA3pn9MW6oS47nQ0ECsY6d4','Muhammad Amir','reematec@gmail.com','Pakistan',1,2,'2023-12-18 11:49:11','2023-12-18 11:49:11'),(6,'iPkSRC7a8XNkmaJWKqYEIagIPGJyIqSh','Muhammad Amir','reematec@gmail.com','Pakistan',1,32,'2023-12-30 10:37:30','2023-12-30 10:37:30'),(7,'ur8wX1nLUAqmWXvFaMdmGgWX2OAbL6TO','Muhammad Amir','reematec@gmail.com','Pakistan',1,32,'2024-01-01 10:52:47','2024-01-01 10:52:47');
/*!40000 ALTER TABLE `rfqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('SNvBc0ZMROrvC6JfPbyvhAw6mECW04YW','2024-01-20 10:32:21','{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2024-01-20T10:32:21.379Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}','2024-01-13 10:32:21','2024-01-13 10:32:21');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `size` (`size`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'Cifl5GCeS56J8XseSytnFY4Yk9uAvU5r','5',1,'2023-12-01 09:58:15','2023-12-01 09:58:15');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `pagetitle` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'QEjkOer7IkUjC38gYDbgYgrTTSr1Wpwh','Hand Stitched','hand-stitched-footballs','testing','&lt;p&gt;testing&lt;&#x2F;p&gt;',1,1,'2023-12-01 09:53:52','2023-12-01 09:53:52'),(2,'szBzxkYmyY11ylg5fwfFmNcDQOWP67uB','Machine Stitched','machine-stitched-footballs','testing','&lt;p&gt;testing&lt;&#x2F;p&gt;',1,1,'2023-12-01 09:54:23','2023-12-01 09:54:23'),(3,'o4lQTRi3gPIAvqdfSZAuNVSDfLfdOzDu','Thermo Bonded','thermo-bonded-footballs','thermo-bonded-footballs','&lt;p&gt;thermo-bonded-footballs&lt;&#x2F;p&gt;',1,1,'2023-12-02 09:11:40','2023-12-13 13:56:53'),(4,'TsrDsnY9ri4LVl1mfWXjE5cGC76ccwBu','Hand Stitched','hand-stitched-handballs','hand stitched handball','&lt;p&gt;testing&lt;&#x2F;p&gt;',1,2,'2023-12-14 10:35:12','2023-12-14 10:35:54');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'1tAEVImZd7uBX721pHXEsVr566mPOmfT','Training','training',1,'2023-12-01 09:58:03','2023-12-01 09:58:03');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) DEFAULT '1',
  `expiresIn` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'0Nm5nwfpeKC3WZTNt4a0BBjuklbJxqSH',NULL,NULL,'Muhammad','Amir','reematec@gmail.com','$2b$10$.NUmqSmxQ.PoGyxAQJX8GuCZWxd9NySop//c3bOavwpQkVurtCvW6',NULL,'Admin',NULL,0,1,NULL,'2023-12-01 09:52:09','2023-12-01 09:52:09'),(2,'K2DOm4s6uDw4ycluz3dec0g1OWvFwzec',NULL,NULL,'Danish','Islam','opd@reemagroup.com','$2b$10$DUJZL9l8EHFTYH.vILrqIuNe2pxG7jpiNnajlMNhDpfX4XizRJB5O',NULL,'Staff',NULL,0,1,NULL,'2023-12-09 12:27:37','2023-12-09 12:27:58'),(8,'GNCqu8VtHIpXx77uk3YLu29MfDJnIwB5',NULL,NULL,'Ali Shan','Akram','alishan_2221@gmail.com','$2b$10$z2bVp851rFye/bHl8L7Dx.5ILOP/K79MdwCKC99cAE5.774YVQkru',NULL,'Visitor',NULL,0,1,NULL,'2023-12-13 12:49:44','2023-12-13 12:53:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-17 17:07:37
