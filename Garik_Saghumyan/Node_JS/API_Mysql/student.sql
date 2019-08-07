-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: students
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
-- Table structure for table `class_teachers`
--

DROP TABLE IF EXISTS `class_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_teachers` (
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  KEY `class_id` (`class_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `class_teachers_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `class_teachers_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_teachers`
--

LOCK TABLES `class_teachers` WRITE;
/*!40000 ALTER TABLE `class_teachers` DISABLE KEYS */;
INSERT INTO `class_teachers` VALUES (1,1),(1,2),(1,3),(2,1),(2,3),(3,2),(4,4),(5,3),(6,1),(7,2),(8,4),(9,2),(10,3),(11,1),(12,3);
/*!40000 ALTER TABLE `class_teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `school_id` int(11) DEFAULT '1',
  `grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `school_id` (`school_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'a',1,1),(2,'a',1,2),(3,'a',1,3),(4,'a',1,4),(5,'a',1,5),(6,'a',1,6),(7,'a',1,7),(8,'a',1,8),(9,'a',1,9),(10,'a',1,10),(11,'a',1,11),(12,'a',1,12);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `max_age_view`
--

DROP TABLE IF EXISTS `max_age_view`;
/*!50001 DROP VIEW IF EXISTS `max_age_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `max_age_view` AS SELECT 
 1 AS `classname`,
 1 AS `studentsname`,
 1 AS `age`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `one_parent_view`
--

DROP TABLE IF EXISTS `one_parent_view`;
/*!50001 DROP VIEW IF EXISTS `one_parent_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `one_parent_view` AS SELECT 
 1 AS `name`,
 1 AS `parents_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `parents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parents`
--

LOCK TABLES `parents` WRITE;
/*!40000 ALTER TABLE `parents` DISABLE KEYS */;
INSERT INTO `parents` VALUES (1,'name1','surname1',77111111,'addres1',1),(2,'name2','surname2',77111112,'addres2',1),(3,'name3','surname3',77111113,'addres3',2),(4,'name4','surname4',77111114,'addres4',2),(5,'name5','surname5',77111115,'addres5',3),(6,'name6','surname6',77111116,'addres6',4),(7,'name7','surname7',77111117,'addres7',5),(8,'name8','surname8',77111118,'addres8',6),(9,'name9','surname9',77111119,'addres9',6),(10,'name10','surname10',77111110,'addres10',7),(11,'name11','surname11',77111120,'addres11',8),(12,'Vazgenicnox','Vazgenicmoxyan',5555555,'iranc tun',20),(13,'Vazgenicnox','Vazgenicmoxyan',5555555,'iranc tun',21),(14,'Vazgenicnox','Vazgenicmoxyan',5555555,'iranc tun',22),(15,'Mikeicnox','Mikeicnox',5555555,'amerika tex',23),(16,'Mikeicnox','Mikeicnox',5555555,'amerika tex',24),(17,'Mikeicnox','Mikeicnox',5555555,'amerika tex',25),(18,'Mikeicnox','Mikeicnox',5555555,'amerika tex',26),(19,'Mikeicnox','Mikeicnox',5555555,'amerika tex',27),(20,'Mikeicnox','Mikeicnox',5555555,'amerika tex',28),(21,'Mikeicnox','Mikeicnox',5555555,'amerika tex',29);
/*!40000 ALTER TABLE `parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `parents_names_view`
--

DROP TABLE IF EXISTS `parents_names_view`;
/*!50001 DROP VIEW IF EXISTS `parents_names_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `parents_names_view` AS SELECT 
 1 AS `parents_name`,
 1 AS `class_name`,
 1 AS `subject_name`,
 1 AS `school_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `director_name` varchar(255) NOT NULL,
  `director_surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'no_17','baghramyan 1',55171717,'tamara','saghatelyan','17@mail.com'),(2,'no_5','prospect 1',55050505,'armen','sargsyan','5@mail.com'),(3,'no_28','taron 2',55282828,'brut','brutyan','28@mail.com');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'valodik','valodikyan',15,'male',1),(2,'john','smith',14,'male',1),(3,'vlad','putin',16,'male',2),(4,'nikol','pashinyan',18,'male',2),(5,'leo','messi',13,'male',3),(6,'dalay','lama',15,'male',3),(7,'albert','enstein',13,'male',4),(8,'donald','trump',12,'female',4),(9,'vazgen','sargsyan',16,'male',3),(10,'Vazgen','Sargsyan',28,'male',2),(11,'Vazgen','Sargsyan',28,'male',2),(13,'Vazgen','Sargsyan',7,'male',2),(14,'Vazgen','Sargsyan',7,'male',2),(15,'Vazgen','Sargsyan',7,'male',2),(16,'Vazgen','Sargsyan',7,'male',2),(17,'Vazgen','Sargsyan',7,'male',2),(18,'Vazgen','Sargsyan',7,'male',2),(19,'Vazgen','Sargsyan',7,'male',2),(20,'Vazgen','Sargsyan',7,'male',2),(21,'Vazgen','Sargsyan',7,'male',2),(22,'Vazgen','Sargsyan',7,'male',2),(23,'Mike','Tyson',7,'male',2),(24,'Mike','Tyson',7,'male',2),(25,'Mike','Tyson',7,'male',2),(26,'Mike','Tyson',7,'male',2),(27,'Mike','Tyson',6,'male',1),(28,'Mike','Tyson',10,'male',5),(29,'Mike','Tyson',5,'male',5);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'fizika'),(2,'matem'),(3,'qimia');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `teacher_count_view`
--

DROP TABLE IF EXISTS `teacher_count_view`;
/*!50001 DROP VIEW IF EXISTS `teacher_count_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `teacher_count_view` AS SELECT 
 1 AS `name`,
 1 AS `teachers_count`,
 1 AS `students_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `salary` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'tovmasyan',50,'dasatui tun',96474787,80000,1),(2,'grigoryan',65,'dasatui tun2',96505050,180000,2),(3,'babayan',48,'dasatui tun3',96723568,150000,1),(4,'enoqyan',70,'dasatui tun4',96010203,130000,3);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `max_age_view`
--

/*!50001 DROP VIEW IF EXISTS `max_age_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `max_age_view` AS select `students`.`classes`.`name` AS `classname`,`students`.`students`.`name` AS `studentsname`,`max_age`.`age` AS `age` from ((((select max(`students`.`students`.`age`) AS `age`,`students`.`students`.`class_id` AS `class_id` from `students`.`students` group by `students`.`students`.`class_id`)) `max_age` join `students`.`classes`) join `students`.`students` on(((`students`.`classes`.`id` = `max_age`.`class_id`) and (`max_age`.`class_id` = `students`.`students`.`class_id`)))) where (`students`.`students`.`age` = `max_age`.`age`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `one_parent_view`
--

/*!50001 DROP VIEW IF EXISTS `one_parent_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `one_parent_view` AS select `one_parent`.`name` AS `name`,`one_parent`.`parents_count` AS `parents_count` from (select `students`.`students`.`name` AS `name`,count(`students`.`parents`.`id`) AS `parents_count` from (`students`.`students` join `students`.`parents` on((`students`.`students`.`id` = `students`.`parents`.`student_id`))) group by `students`.`students`.`name`) `one_parent` where (`one_parent`.`parents_count` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `parents_names_view`
--

/*!50001 DROP VIEW IF EXISTS `parents_names_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `parents_names_view` AS select `parents`.`name` AS `parents_name`,`classes`.`name` AS `class_name`,`subjects`.`name` AS `subject_name`,`school`.`name` AS `school_name` from ((((((`parents` join `students` on((`parents`.`student_id` = `students`.`id`))) join `classes` on((`students`.`id` = `classes`.`id`))) join `class_teachers` on((`classes`.`id` = `class_teachers`.`class_id`))) join `teachers` on((`class_teachers`.`teacher_id` = `teachers`.`id`))) join `subjects` on((`teachers`.`subject_id` = `subjects`.`id`))) join `school` on((`school`.`id` = `classes`.`school_id`))) where ((`subjects`.`name` = 'fizika') and (`classes`.`name` = '8a')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `teacher_count_view`
--

/*!50001 DROP VIEW IF EXISTS `teacher_count_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `teacher_count_view` AS select `teacher_count`.`name` AS `name`,`teacher_count`.`teachers_count` AS `teachers_count`,`student_count`.`students_count` AS `students_count` from (((select `students`.`classes`.`name` AS `name`,count(`students`.`teachers`.`id`) AS `teachers_count` from ((`students`.`class_teachers` join `students`.`classes` on((`students`.`classes`.`id` = `students`.`class_teachers`.`class_id`))) join `students`.`teachers` on((`students`.`class_teachers`.`teacher_id` = `students`.`teachers`.`id`))) group by `students`.`classes`.`name` order by count(`students`.`classes`.`id`) desc)) `teacher_count` left join (select `students`.`classes`.`name` AS `name`,count(`students`.`students`.`id`) AS `students_count` from (`students`.`classes` join `students`.`students` on((`students`.`classes`.`id` = `students`.`students`.`class_id`))) group by `students`.`classes`.`name` order by count(`students`.`students`.`id`) desc) `student_count` on((`teacher_count`.`name` = `student_count`.`name`))) */;
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

-- Dump completed on 2019-07-22  0:28:42
