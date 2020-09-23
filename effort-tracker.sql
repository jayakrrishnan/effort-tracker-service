-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: effort_tracker
-- ------------------------------------------------------
-- Server version	5.6.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `daily_effort`
--

DROP TABLE IF EXISTS `daily_effort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_effort` (
  `user_id` varchar(50) NOT NULL,
  `effort_date` date NOT NULL,
  `project_id` int(11) NOT NULL,
  `project_task_hr` double NOT NULL,
  `project_meeting_hr` double NOT NULL,
  `training_hr` double NOT NULL,
  `vdi_unavail_hr` double NOT NULL,
  `leave_hr` double NOT NULL,
  `other_hr` double NOT NULL,
  `wfo_hr` double NOT NULL,
  `wfh_hr` double NOT NULL,
  `rework_hr` double DEFAULT '0',
  `adhoc_hr` double DEFAULT '0',
  `reason_for_not_working` varchar(50) DEFAULT NULL,
  `comment_for_not_working` longtext,
  `reason_for_wfh` longtext,
  `comments` longtext,
  `last_change_ts` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`effort_date`,`project_id`),
  CONSTRAINT `user_fk1` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_effort`
--

LOCK TABLES `daily_effort` WRITE;
/*!40000 ALTER TABLE `daily_effort` DISABLE KEYS */;
INSERT INTO `daily_effort` VALUES ('U60907','2020-09-22',1,7,1,0,0,0,0,0,8,0,0,'','','BCP','enjoyy','2020-09-22 21:40:00'),('U60907','2020-09-22',2,1,0,0,0,0,0,0,8,0,0,'','','BCP','enjoyy more','2020-09-22 22:17:59'),('U60907','2020-09-23',1,7.5,0.75,0,0,0,0,0,8,0,0,'','','BCP','enjoyy more','2020-09-22 22:16:50'),('U60907','2020-09-23',2,1,0,0,0,0,0,0,8,0,0,'','','BCP','enjoyy more','2020-09-22 22:17:34');
/*!40000 ALTER TABLE `daily_effort` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `user_id` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL,
  `passcode` varchar(512) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `role_fk1_idx` (`role_id`),
  CONSTRAINT `role_fk1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('60907','60907@u-cheat.com','$2b$10$CLJ7mXjm3LrFzAEC5TTdhu6JcMQ8vRXkPlbduf6NQCslt9N96n7iy',1),('U60907','U60907@u-cheat.com','$2b$10$70uFRZOendcAM9CcGJN.pOm2kCt4qm3t3XW5moimWxr1P23hsJvvm',1);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_text` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_text_UNIQUE` (`role_text`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (2,'admin'),(1,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-22 23:51:48
