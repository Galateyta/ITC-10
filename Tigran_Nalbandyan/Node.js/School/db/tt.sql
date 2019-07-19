-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: School
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

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
-- Table structure for table `Class_teacher`
--

DROP TABLE IF EXISTS `Class_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Class_teacher` (
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  KEY `class_id` (`class_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `Class_teacher_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `Classes` (`id`),
  CONSTRAINT `Class_teacher_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Class_teacher`
--

LOCK TABLES `Class_teacher` WRITE;
/*!40000 ALTER TABLE `Class_teacher` DISABLE KEYS */;
INSERT INTO `Class_teacher` VALUES (1,6),(1,5),(2,1),(2,2),(3,3),(3,4),(4,7),(4,8),(4,9),(4,10);
/*!40000 ALTER TABLE `Class_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `school_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `school_id` (`school_id`),
  CONSTRAINT `Classes_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `School` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classes`
--

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES (1,'1A',1),(2,'2A',1),(3,'3A',1),(4,'4A',1),(5,'5A',1);
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
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `Parents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parents`
--

LOCK TABLES `Parents` WRITE;
/*!40000 ALTER TABLE `Parents` DISABLE KEYS */;
INSERT INTO `Parents` VALUES (1,'karenaaa','Big',405589,'Usanoxakan',4),(2,'Anna','Big',456115,'Usanoxakan',4),(3,'Women1','Women1.1',456115,'Usanoxakan1',1),(4,'Men1','Men1.1',45614151,'Us32anoxakan1',1),(5,'Women2','Women2.2',45611521,'Usanoxakan',2),(6,'Men2','Men2.2',6141551,'Usanoxakan',2),(7,'Women3','Women3.1',41144445,'Usanoxakan4',3),(8,'Men3','Men3.1',444444,'Usanoxakan4',3),(9,'Women6','Women6.1',666666115,'Usanoxakan6',5),(10,'Men6','Men6.1',151666,'Usanoxakan666',6),(11,'Women7','Women7.1',51515115,'Usanoxakan7',7),(13,'Women8','Women8.1',1888885,'Usanoxakan88888',8),(15,'Women10','Women10.1',51010101,'Usanoxakan10',10),(16,'Men11','Men11.1',411111151,'Usanoxakan11',11),(17,'Women11','Women11.1',1511111,'Usanoxakan11',11),(18,'Men12','Men12.1',42121212,'Usanoxakan1212',12),(19,'WoMen19','Men19.1',19191919,'Usanoxakan1919',12),(20,'Men13','Men13.1',13131313,'Usanoxakan133',13);
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
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `director_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `School`
--

LOCK TABLES `School` WRITE;
/*!40000 ALTER TABLE `School` DISABLE KEYS */;
INSERT INTO `School` VALUES (1,'N13','Usanoxakan poxoc',91111111,'Ivan','n13sos.@mail.com');
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
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `Classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (1,'John','Smith',15,'male',1),(2,'aaabbb','Dhoe',15,'male',1),(3,'Angela','Mercele',14,'female',1),(4,'Ann','Mdams',15,'female',1),(5,'Angelaina','NemMercele',14,'female',2),(6,'Mark1','Neele',14,'female',3),(7,'Mark125','Nee',17,'female',4),(8,'Art','Naaee',15,'male',2),(9,'Armen','Naassaee',16,'male',2),(10,'tttttt','Nasaee',18,'male',3),(11,'karmen','Nasaee',16,'female',3),(12,'karen','Nasari',16,'female',4),(13,'child1','azgchild1',20,'male',4),(50,'aaabbb','Dhoe',17,'male',4);
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
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subject`
--

LOCK TABLES `Subject` WRITE;
/*!40000 ALTER TABLE `Subject` DISABLE KEYS */;
INSERT INTO `Subject` VALUES (1,'mate'),(2,'matematika'),(3,'fizika'),(4,'ashxarh'),(5,'patmutyun'),(6,'ashxatanq'),(7,'hayoc lezu'),(8,'grakanutyun'),(9,'fizkultura'),(10,'erg');
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
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `salary` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `Teachers_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `Subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teachers`
--

LOCK TABLES `Teachers` WRITE;
/*!40000 ALTER TABLE `Teachers` DISABLE KEYS */;
INSERT INTO `Teachers` VALUES (1,'Anna','Armenovna',40,'Shinararner1',88888888,80000,1),(2,'Teacher1','Teacheryan1',29,'Shinararner',833333333,70000,3),(3,'Teacher2','Teacheryan2',50,'Shinararner',844444444,90000,4),(4,'Teacher3','Teacheryan3',38,'Shinararner',85555555,100000,5),(5,'Teacher7','Teacheryan7',42,'Shinararner',899999999,85000,9),(6,'Teacher8','Teacheryan8',41,'Shinararner10',81010101,120000,10),(7,'Anemn','Armenayan',38,'Shinararner7',8222222,70000,2),(8,'Teacher4','Teacheryan4',28,'Shinararner8',86666666,110000,6),(9,'Teacher5','Teacheryan5',49,'Shinararner9',87777777,90000,7),(10,'Teacher6','Teacheryan6',45,'Shinararner10',8888888,95000,8);
/*!40000 ALTER TABLE `Teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-19 11:02:52
