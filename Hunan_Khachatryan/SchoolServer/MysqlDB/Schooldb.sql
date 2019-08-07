-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: SchoolDB
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

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
-- Temporary table structure for view `ClassSubject`
--

DROP TABLE IF EXISTS `ClassSubject`;
/*!50001 DROP VIEW IF EXISTS `ClassSubject`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ClassSubject` AS SELECT 
 1 AS `subject`,
 1 AS `teachers`,
 1 AS `Class`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ClassTeacher`
--

DROP TABLE IF EXISTS `ClassTeacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClassTeacher` (
  `classID` int(11) NOT NULL,
  `teacherID` int(11) NOT NULL,
  KEY `classID` (`classID`),
  KEY `teacherID` (`teacherID`),
  CONSTRAINT `ClassTeacher_ibfk_1` FOREIGN KEY (`classID`) REFERENCES `Classes` (`id`),
  CONSTRAINT `ClassTeacher_ibfk_2` FOREIGN KEY (`teacherID`) REFERENCES `Teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClassTeacher`
--

LOCK TABLES `ClassTeacher` WRITE;
/*!40000 ALTER TABLE `ClassTeacher` DISABLE KEYS */;
INSERT INTO `ClassTeacher` VALUES (2,7),(1,5),(3,7),(4,4),(5,5),(1,1),(1,7),(1,4);
/*!40000 ALTER TABLE `ClassTeacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `schoolID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `schoolID` (`schoolID`),
  CONSTRAINT `Classes_ibfk_1` FOREIGN KEY (`schoolID`) REFERENCES `School` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classes`
--

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES (1,'1a',1);
/*!40000 ALTER TABLE `Classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parents`
--

DROP TABLE IF EXISTS `Parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Parents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Surename` text NOT NULL,
  `Phone` int(11) NOT NULL,
  `Email` text,
  `studentID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentID` (`studentID`),
  CONSTRAINT `Parents_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `Students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parents`
--

LOCK TABLES `Parents` WRITE;
/*!40000 ALTER TABLE `Parents` DISABLE KEYS */;
INSERT INTO `Parents` VALUES (4,'Artak','Vardanyan',98457896,'art_k@mail.ru',1),(5,'Artak','Vardanyan',98457896,'art_k@mail.ru',4);
/*!40000 ALTER TABLE `Parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `School`
--

DROP TABLE IF EXISTS `School`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `School` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Address` text NOT NULL,
  `Phone` int(11) NOT NULL,
  `Director` text NOT NULL,
  `Email` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `School`
--

LOCK TABLES `School` WRITE;
/*!40000 ALTER TABLE `School` DISABLE KEYS */;
INSERT INTO `School` VALUES (1,'N4','Tigran-Mec 21',32245876,'Ashot Poghosyan','schooln4@mail.ru');
/*!40000 ALTER TABLE `School` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Surename` text NOT NULL,
  `Age` int(11) NOT NULL,
  `Gender` text NOT NULL,
  `classID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classID` (`classID`),
  CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`classID`) REFERENCES `Classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (3,'Armen','Vardanyan',6,'male',1),(4,'Armen','Vardanyan',6,'male',1);
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subject`
--

DROP TABLE IF EXISTS `Subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subject`
--

LOCK TABLES `Subject` WRITE;
/*!40000 ALTER TABLE `Subject` DISABLE KEYS */;
INSERT INTO `Subject` VALUES (1,'matematika'),(2,'fizika'),(3,'kensabanutyun'),(4,'fizkultura'),(5,'Mayreni'),(6,'Hayoc Lezu'),(7,'Patmutyun'),(8,'Ruseren'),(9,'Angleren');
/*!40000 ALTER TABLE `Subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teachers`
--

DROP TABLE IF EXISTS `Teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Surename` text NOT NULL,
  `Age` int(11) NOT NULL,
  `Address` text NOT NULL,
  `Phone` int(11) NOT NULL,
  `Salary` int(11) DEFAULT NULL,
  `subjectID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subjectID` (`subjectID`),
  CONSTRAINT `Teachers_ibfk_1` FOREIGN KEY (`subjectID`) REFERENCES `Subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teachers`
--

LOCK TABLES `Teachers` WRITE;
/*!40000 ALTER TABLE `Teachers` DISABLE KEYS */;
INSERT INTO `Teachers` VALUES (1,'name1','surename1',54,'salasd',78456,121000,4),(2,'name2','surename2',514,'salasede',784576,125000,3),(3,'name3','surename13',543,'salasd',78456,1231000,2),(4,'name4','surename15',54,'sal5asd',784556,1251000,2),(5,'name11','surename11',54,'s1alasd',781456,1211000,1),(6,'Artak','Vardanyan',30,'Vanadzor',98457896,150000,7),(7,'Gayane','Sargsyan',30,'Vanadzor',98457896,150000,5),(8,'Lilit','Sargsyan',25,'Vanadzor',98457896,150000,6),(9,'Lilit','Sargsyan',25,'Vanadzor',98457896,150000,5),(10,'Ani','Arzumanyan',25,'Vanadzor',98457896,150000,8),(11,'Nune','Arzumanyan',25,'Vanadzor',98457896,150000,9);
/*!40000 ALTER TABLE `Teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `ClassSubject`
--

/*!50001 DROP VIEW IF EXISTS `ClassSubject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`hunan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ClassSubject` AS select `teach`.`subject` AS `subject`,`teach`.`teachers` AS `teachers`,`SchoolDB`.`Classes`.`Name` AS `Class` from ((((select `SchoolDB`.`Subject`.`Name` AS `subject`,`SchoolDB`.`Teachers`.`Name` AS `teachers`,`SchoolDB`.`Teachers`.`id` AS `ID` from (`SchoolDB`.`Subject` join `SchoolDB`.`Teachers` on((`SchoolDB`.`Teachers`.`subjectID` = `SchoolDB`.`Subject`.`id`))))) `teach` join `SchoolDB`.`ClassTeacher` on((`SchoolDB`.`ClassTeacher`.`teacherID` = `teach`.`ID`))) join `SchoolDB`.`Classes` on((`SchoolDB`.`Classes`.`id` = `SchoolDB`.`ClassTeacher`.`classID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-22  2:16:44
