
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: school-app
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_nome` varchar(100) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL,
  `admin_telemovel` varchar(100) NOT NULL,
  `admin_role` enum('superadmin','admin','operador') DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Carlos Guerra','carlosguerra2001.2@gmail.com','Carlos123.','04147118022','superadmin'),(2,'Antero','bizcenter.city@gmail.com','123456','351963849607','superadmin');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `aluno_id` int NOT NULL AUTO_INCREMENT,
  `aluno_foto` varchar(100) DEFAULT NULL,
  `aluno_nome` varchar(100) NOT NULL,
  `aluno_nacionalidade` varchar(45) DEFAULT NULL,
  `aluno_tipo_doc_ident` varchar(45) DEFAULT NULL,
  `aluno_num_doc_ident` varchar(45) DEFAULT NULL,
  `aluno_data_nascimento` date DEFAULT NULL,
  `aluno_nif` int DEFAULT NULL,
  `aluno_rua` varchar(100) DEFAULT NULL,
  `aluno_codigo_postal` int DEFAULT NULL,
  `aluno_freguesia` varchar(45) DEFAULT NULL,
  `aluno_concelho` varchar(45) DEFAULT NULL,
  `aluno_telemovel` varchar(45) NOT NULL,
  `aluno_escola_publica` varchar(45) DEFAULT NULL,
  `aluno_pai_nome` varchar(100) DEFAULT NULL,
  `aluno_pai_contacto` int DEFAULT NULL,
  `aluno_pai_email` varchar(45) DEFAULT NULL,
  `aluno_mae_nome` varchar(100) DEFAULT NULL,
  `aluno_mae_contacto` int DEFAULT NULL,
  `aluno_mae_email` varchar(45) DEFAULT NULL,
  `aluno_sexo` varchar(45) DEFAULT NULL,
  `aluno_habilitacao` varchar(45) NOT NULL,
  `aluno_formacao` varchar(45) DEFAULT NULL,
  `aluno_profissao` varchar(45) DEFAULT NULL,
  `aluno_pai_habilitacao` varchar(45) DEFAULT NULL,
  `aluno_pai_formacao` varchar(45) DEFAULT NULL,
  `aluno_pai_profissao` varchar(45) DEFAULT NULL,
  `aluno_mae_habilitacao` varchar(45) DEFAULT NULL,
  `aluno_mae_formacao` varchar(45) DEFAULT NULL,
  `aluno_mae_profissao` varchar(45) DEFAULT NULL,
  `aluno_enc_edu_grau_parentesco` varchar(45) DEFAULT NULL,
  `aluno_enc_edu_nome` varchar(45) DEFAULT NULL,
  `aluno_enc_edu_telefone` varchar(45) DEFAULT NULL,
  `aluno_enc_edu_email` varchar(45) DEFAULT NULL,
  `aluno_obs` varchar(45) DEFAULT NULL,
  `aluno_estado` varchar(45) DEFAULT NULL,
  `nacionalidades_nacionalidades_id` int DEFAULT NULL,
  `escolas_publica_Escolas_publicas_id` int DEFAULT NULL,
  `tipo_doc_ident_tipo_doc_ident_id` int DEFAULT NULL,
  `freguesias_freguesias_id` int DEFAULT NULL,
  `codigo _postal_codigo _postal_id` int DEFAULT NULL,
  `concelho_concelho_id` int DEFAULT NULL,
  `sexo_sexo_id` int DEFAULT NULL,
  `habilitacao_habiltacao_id` int DEFAULT NULL,
  `formacao_formacao_id` int DEFAULT NULL,
  `profissao_profissao_id` int DEFAULT NULL,
  `grau_parentesco_grau_parentesco_id` int DEFAULT NULL,
  `estado_dados_estado_dado_id` int DEFAULT NULL,
  `utilizador_fk` int DEFAULT NULL,
  `Diplomas_diplomas_id` int DEFAULT NULL,
  `aluno_email` varchar(120) NOT NULL,
  `aluno_password` varchar(60) NOT NULL,
  `fk_UserID` varchar(45) NOT NULL,
  `aluno_idad` int NOT NULL,
  `aluno_role` enum('aluno') DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`aluno_id`,`username`),
  UNIQUE KEY `aluno_email_UNIQUE` (`aluno_email`),
  UNIQUE KEY `fk_UserID_UNIQUE` (`fk_UserID`),
  UNIQUE KEY `aluno_nif_UNIQUE` (`aluno_nif`),
  KEY `fk_userID_idx` (`fk_UserID`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`fk_UserID`) REFERENCES `valida` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (2,NULL,'Carlos Garcia',NULL,NULL,NULL,'1974-11-08',NULL,NULL,NULL,NULL,NULL,'+351968120270',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Rua do Raio','Eng',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'crodriguez0811@gmail.com','$2b$10$iD7EOZYbVT70fDObHhjaneaNUxM0RBDeBeDebZgx60GRSQ65ObRY.','01ed9c8e-127a-43b0-9a61-f9d02ca2773a',46,'aluno',''),(3,NULL,'Carlos',NULL,NULL,NULL,'2001-02-22',NULL,NULL,NULL,NULL,NULL,'+351464564564',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Urb los Mangos','Arriba',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'carlosguerra2001.2@gmail.com','$2b$10$bKKvuyTGTgTeuybeA0gpPehwnV1rxiPfXP9sTt4WKNNZcWvF1GsIS','0224254e-9bf9-4f70-bbc7-37f7e1dce9dc',20,'aluno',''),(4,NULL,'catarina',NULL,NULL,NULL,'2009-10-20',NULL,NULL,NULL,NULL,NULL,'+351963849607',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'braga','eng',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'anteroesteves@gmail.com','$2b$10$vgQGLR8o4AkO/d4cuVgucuLz78hvGuzAfW2ajMoV6ySyRKyj4HFG2','3ce92e30-313e-47e6-8174-3f52e18d83e7',11,'aluno','');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aulas`
--

DROP TABLE IF EXISTS `aulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aulas` (
  `aulas_id` int NOT NULL AUTO_INCREMENT,
  `aulas_num` int DEFAULT NULL,
  `aulas_data` date DEFAULT NULL,
  `aula_hora_entrada_prevista` time DEFAULT NULL,
  `aula_hora_entrada` datetime DEFAULT NULL,
  `aula_hora_saida_prevista` time DEFAULT NULL,
  `aula_hora_saida` datetime DEFAULT NULL,
  `aula_unidade` varchar(45) DEFAULT NULL,
  `aula_obs` varchar(45) DEFAULT NULL,
  `id_turma` int NOT NULL,
  `id_aluno` int NOT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`aulas_id`,`id_turma`,`id_aluno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aulas`
--

LOCK TABLES `aulas` WRITE;
/*!40000 ALTER TABLE `aulas` DISABLE KEYS */;
INSERT INTO `aulas` VALUES (1,12,'2021-08-03','12:30:00','2021-08-03 11:09:00','12:56:00','2021-08-03 11:10:00','12','tes',3,0,NULL);
/*!40000 ALTER TABLE `aulas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `curso_id` int NOT NULL AUTO_INCREMENT,
  `curso_valor_matricula` varchar(45) DEFAULT NULL,
  `curso_valor` varchar(45) DEFAULT NULL,
  `gr_etario` varchar(45) NOT NULL,
  `lingua` VARCHAR(45) NOT NULL,
  `nivel` int NOT NULL,
  `area` varchar(5) NOT NULL,
  `tipo` varchar(5) NOT NULL,
  `modelo` varchar(5) NOT NULL,
  `modalidade` varchar(5) NOT NULL,
  `programa_fk` int NOT NULL,
  `horario` int DEFAULT NULL,
  `instalacoes_fk` int NOT NULL,
  `tempo_aula` VARCHAR(45) NOT NULL,
  `Frequencia` VARCHAR(45) NOT NULL,
  `Duracao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`curso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duracao`
--

DROP TABLE IF EXISTS `duracao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `duracao` (
  `duracao_id` int NOT NULL,
  `duracao_num` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`duracao_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duracao`
--

LOCK TABLES `duracao` WRITE;
/*!40000 ALTER TABLE `duracao` DISABLE KEYS */;
/*!40000 ALTER TABLE `duracao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `empresa_id` int NOT NULL AUTO_INCREMENT,
  `empresa_logo` varchar(100) DEFAULT NULL,
  `empresa_nome` varchar(100) DEFAULT NULL,
  `empresa_nacionalidade` varchar(45) DEFAULT NULL,
  `empresa_nif` int DEFAULT NULL,
  `empresa_rua` varchar(100) DEFAULT NULL,
  `empresa_codigo_postal` int DEFAULT NULL,
  `empresa_freguesia` varchar(45) DEFAULT NULL,
  `empresa_concelho` varchar(45) DEFAULT NULL,
  `empresa_contacto` int DEFAULT NULL,
  `empresa_gerente_nome` varchar(100) DEFAULT NULL,
  `empresa_gerente_contacto` int DEFAULT NULL,
  `empresa_gerente_email` varchar(45) DEFAULT NULL,
  `empresa_responsavel_fomacao_nome` varchar(100) DEFAULT NULL,
  `empresa_responsavel_fomacao_contacto` int DEFAULT NULL,
  `empresa_responsavel_fomacao_email` varchar(45) DEFAULT NULL,
  `empresa_num_colaboradores` varchar(45) DEFAULT NULL,
  `empresa_area profissional` varchar(45) DEFAULT NULL,
  `empresa_obs` varchar(45) DEFAULT NULL,
  `empresa_estado` varchar(45) DEFAULT NULL,
  `nacionalidades_nacionalidades_id` int NOT NULL,
  `freguesias_freguesias_id` int NOT NULL,
  `codigo _postal_codigo _postal_id` int NOT NULL,
  `concelho_concelho_id` int NOT NULL,
  `estado_dados_estado_dado_id` int NOT NULL,
  `cae_cae_id` int NOT NULL,
  `utilizador_fk` int NOT NULL,
  PRIMARY KEY (`empresa_id`),
  UNIQUE KEY `aluno_nif_UNIQUE` (`empresa_nif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamentos`
--

DROP TABLE IF EXISTS `equipamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamentos` (
  `equipamento_id` int NOT NULL AUTO_INCREMENT,
  `equipamento_nome` varchar(45) DEFAULT NULL,
  `equipamento_quantidade_geral` int DEFAULT NULL,
  `equipamento_quantidade_disponivel` int DEFAULT NULL,
  `salas_fk` int NOT NULL,
  PRIMARY KEY (`equipamento_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escolas`
--

DROP TABLE IF EXISTS `escolas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escolas` (
  `escola_id` int NOT NULL AUTO_INCREMENT,
  `escola_nif` int NOT NULL,
  `escola_nome` varchar(100) DEFAULT NULL,
  `escola_rua` varchar(100) DEFAULT NULL,
  `escola_codigo_postal` int DEFAULT NULL,
  `escola_freguesia` varchar(45) DEFAULT NULL,
  `escola_concelho` varchar(45) DEFAULT NULL,
  `escola_data_nascimento` int DEFAULT NULL,
  `escola_telemovel` int DEFAULT NULL,
  `escola_coordenador_foto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`escola_id`),
  UNIQUE KEY `escola_nome_UNIQUE` (`escola_nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escolas`
--

LOCK TABLES `escolas` WRITE;
/*!40000 ALTER TABLE `escolas` DISABLE KEYS */;
INSERT INTO `escolas` VALUES (2,234234,'demo','demo',3750011,'triste','Águeda',1980,98734,'http://dev.servebbs.net:3200/iPad1024x768@1x.png-1627984851855.png');
/*!40000 ALTER TABLE `escolas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exames`
--

DROP TABLE IF EXISTS `exames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exames` (
  `exame_id` int NOT NULL,
  `exame_data` datetime DEFAULT NULL,
  `exame_nota_speaking` int DEFAULT NULL,
  `exame_nota_reading` int DEFAULT NULL,
  `exame_nota_writing` int DEFAULT NULL,
  `exame_nota_listening` int DEFAULT NULL,
  `exame_nota_compreention` int DEFAULT NULL,
  `exame_nota_grammar` int DEFAULT NULL,
  `exame_média` int DEFAULT NULL,
  `exame_nota_final` int DEFAULT NULL,
  `exame_letra` varchar(2) DEFAULT NULL,
  `gr_etario_fk` int NOT NULL,
  `lingua_fk` int NOT NULL,
  `nivel_fk` int NOT NULL,
  `area_fk` int NOT NULL,
  `diploma_fk` int NOT NULL,
  PRIMARY KEY (`exame_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exames`
--

LOCK TABLES `exames` WRITE;
/*!40000 ALTER TABLE `exames` DISABLE KEYS */;
/*!40000 ALTER TABLE `exames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examinandos`
--

DROP TABLE IF EXISTS `examinandos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examinandos` (
  `examinando_id` int NOT NULL,
  `examinando_nome` varchar(45) DEFAULT NULL,
  `utilizador_fk` int NOT NULL,
  `Diplomas_diplomas_id` int NOT NULL,
  PRIMARY KEY (`examinando_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examinandos`
--

LOCK TABLES `examinandos` WRITE;
/*!40000 ALTER TABLE `examinandos` DISABLE KEYS */;
/*!40000 ALTER TABLE `examinandos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faturação`
--

DROP TABLE IF EXISTS `faturação`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faturação` (
  `faturação_id` int NOT NULL,
  `Faturaçãocol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`faturação_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faturação`
--

LOCK TABLES `faturação` WRITE;
/*!40000 ALTER TABLE `faturação` DISABLE KEYS */;
/*!40000 ALTER TABLE `faturação` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formacao`
--

DROP TABLE IF EXISTS `formacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formacao` (
  `formacao_id` int NOT NULL,
  `formacao_nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`formacao_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formacao`
--

LOCK TABLES `formacao` WRITE;
/*!40000 ALTER TABLE `formacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `formacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedores` (
  `fornecedor_id` int NOT NULL AUTO_INCREMENT,
  `fornecedor_logo` varchar(100) DEFAULT NULL,
  `fornecedor_nome` varchar(100) DEFAULT NULL,
  `fornecedor_nacionalidade` varchar(45) DEFAULT NULL,
  `fornecedor_nif` int DEFAULT NULL,
  `fornecedor_rua` varchar(100) DEFAULT NULL,
  `fornecedor_codigo_postal` int DEFAULT NULL,
  `fornecedor_freguesia` varchar(45) DEFAULT NULL,
  `fornecedor_concelho` varchar(45) DEFAULT NULL,
  `fornecedor_contacto` int DEFAULT NULL,
  `fornecedor_gerente_nome` varchar(100) DEFAULT NULL,
  `fornecedor_gerente_contacto` int DEFAULT NULL,
  `fornecedor_gerente_email` varchar(45) DEFAULT NULL,
  `fornecedor_colaborador_nome` varchar(100) DEFAULT NULL,
  `empresa_comercial_contacto` int DEFAULT NULL,
  `empresa_comercial_email` varchar(45) DEFAULT NULL,
  `empresa_actividade` varchar(45) DEFAULT NULL,
  `empresa_obs` varchar(45) DEFAULT NULL,
  `empresa_estado` varchar(45) DEFAULT NULL,
  `nacionalidades_nacionalidades_id` int NOT NULL,
  `freguesias_freguesias_id` int NOT NULL,
  `codigo _postal_codigo _postal_id` int NOT NULL,
  `concelho_concelho_id` int NOT NULL,
  `estado_dados_estado_dado_id` int NOT NULL,
  PRIMARY KEY (`fornecedor_id`),
  UNIQUE KEY `aluno_nif_UNIQUE` (`fornecedor_nif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `fornecedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frequencia`
--

DROP TABLE IF EXISTS `frequencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frequencia` (
  `frequencia_id` int NOT NULL,
  `frequencia_num` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`frequencia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frequencia`
--

LOCK TABLES `frequencia` WRITE;
/*!40000 ALTER TABLE `frequencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `frequencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gr_etario`
--

DROP TABLE IF EXISTS `gr_etario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gr_etario` (
  `gr_etario_id` int NOT NULL AUTO_INCREMENT,
  `gr_etario_nome` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`gr_etario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gr_etario`
--

LOCK TABLES `gr_etario` WRITE;
/*!40000 ALTER TABLE `gr_etario` DISABLE KEYS */;
/*!40000 ALTER TABLE `gr_etario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilitacao`
--

DROP TABLE IF EXISTS `habilitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilitacao` (
  `habiltacao_id` int NOT NULL,
  `habilitacao_nome` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`habiltacao_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilitacao`
--

LOCK TABLES `habilitacao` WRITE;
/*!40000 ALTER TABLE `habilitacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `habilitacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instalacoes`
--

DROP TABLE IF EXISTS `instalacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instalacoes` (
  `instalacoes_id` int NOT NULL AUTO_INCREMENT,
  `instalacoes_nome` varchar(5) DEFAULT NULL,
  `escolas_fk` int NOT NULL,
  PRIMARY KEY (`instalacoes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instalacoes`
--

LOCK TABLES `instalacoes` WRITE;
/*!40000 ALTER TABLE `instalacoes` DISABLE KEYS */;
INSERT INTO `instalacoes` VALUES (1,'são',1);
/*!40000 ALTER TABLE `instalacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lingua`
--

DROP TABLE IF EXISTS `lingua`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lingua` (
  `lingua_id` int NOT NULL AUTO_INCREMENT,
  `lingua_abreviatura` varchar(1) DEFAULT NULL,
  `lingua_nome` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`lingua_id`),
  UNIQUE KEY `linguas_id_UNIQUE` (`lingua_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lingua`
--

LOCK TABLES `lingua` WRITE;
/*!40000 ALTER TABLE `lingua` DISABLE KEYS */;
/*!40000 ALTER TABLE `lingua` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livros`
--

DROP TABLE IF EXISTS `livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livros` (
  `livro_id` int NOT NULL AUTO_INCREMENT,
  `livro_isbn` varchar(45) NOT NULL,
  `livro_nome` varchar(45) NOT NULL,
  `livro_editora` varchar(45) NOT NULL,
  `livro_ano_edicao` varchar(45) NOT NULL,
  `livro_programa` varchar(45) NOT NULL,
  `livro_gr_etario` varchar(45) NOT NULL,
  `livro_lingua` varchar(45) NOT NULL,
  `livro_nivel` varchar(45) NOT NULL,
  `estado_livro_fk` int NOT NULL,
  `livro_valor_venda` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`livro_id`),
  UNIQUE KEY `livro_isbn_UNIQUE` (`livro_isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros`
--

LOCK TABLES `livros` WRITE;
/*!40000 ALTER TABLE `livros` DISABLE KEYS */;
/*!40000 ALTER TABLE `livros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modalidade`
--

DROP TABLE IF EXISTS `modalidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidade` (
  `modalidade_id` int NOT NULL AUTO_INCREMENT,
  `modalidade_nome` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`modalidade_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidade`
--

LOCK TABLES `modalidade` WRITE;
/*!40000 ALTER TABLE `modalidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `modalidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo`
--

DROP TABLE IF EXISTS `modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelo` (
  `modelo_id` int NOT NULL AUTO_INCREMENT,
  `modelo_nome` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`modelo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
/*!40000 ALTER TABLE `modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turma` (
  `id_turma` int NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(50) DEFAULT NULL,
  `id_sala` int NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `id_professor` int NOT NULL,
  `qt_alunos` int NOT NULL,
  `id_curso` int NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `total_horas` int NOT NULL,
  PRIMARY KEY (`id_turma`,`id_sala`,`id_professor`,`id_curso`,`hora_inicio`,`hora_fin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

--
-- Dumping data for table `turma`
--

LOCK TABLES `turma` WRITE;
/*!40000 ALTER TABLE `new_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `new_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivel`
--

DROP TABLE IF EXISTS `nivel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivel` (
  `nivel_id` int NOT NULL AUTO_INCREMENT,
  `nivel_nome` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`nivel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivel`
--

LOCK TABLES `nivel` WRITE;
/*!40000 ALTER TABLE `nivel` DISABLE KEYS */;
INSERT INTO `nivel` VALUES (1,'1'),(2,'2');
/*!40000 ALTER TABLE `nivel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professores`
--

DROP TABLE IF EXISTS `professores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professores` (
  `professor_id` int NOT NULL AUTO_INCREMENT,
  `professor_nif` int DEFAULT NULL,
  `professor_nome` varchar(100) DEFAULT NULL,
  `professor_rua` varchar(100) DEFAULT NULL,
  `professor_codigo_postal` int DEFAULT NULL,
  `professor_freguesia` varchar(45) DEFAULT NULL,
  `professor_concelho` varchar(45) DEFAULT NULL,
  `professor_telemovel` VARCHAR(45) DEFAULT NULL,
  `professor_contacto` int DEFAULT NULL,
  `professor_lingua_nativa` varchar(45) DEFAULT NULL,
  `professor_foto` varchar(100) DEFAULT NULL,
  `professor_cv` varchar(100) DEFAULT NULL,
  `professor_nacionalidade` varchar(45) DEFAULT NULL,
  `professor_tipo_doc_ident` varchar(45) DEFAULT NULL,
  `professor_num_doc_ident` varchar(45) DEFAULT NULL,
  `professor_sexo` varchar(45) DEFAULT NULL,
  `professor_habilitacao` varchar(45) DEFAULT NULL,
  `professor_formacao` varchar(45) DEFAULT NULL,
  `professor_profissao` varchar(45) DEFAULT NULL,
  `professor_obs` varchar(45) DEFAULT NULL,
  `professor_anexos` varchar(45) DEFAULT NULL,
  `professor_data_validade_ficha_medica` varchar(45) DEFAULT NULL,
  `professores_data_validade_registo_criminal` varchar(45) DEFAULT NULL,
  `professor_estado` varchar(45) DEFAULT NULL,
  `codigo _postal_codigo _postal_id` int DEFAULT NULL,
  `tipo_doc_ident_tipo_doc_ident_id` int DEFAULT NULL,
  `nacionalidades_nacionalidades_id` int DEFAULT NULL,
  `escolas_publica_Escolas_publicas_id` int DEFAULT NULL,
  `freguesias_freguesias_id` int DEFAULT NULL,
  `profissao_profissao_id` int DEFAULT NULL,
  `formacao_formacao_id` int DEFAULT NULL,
  `habilitacao_habiltacao_id` int DEFAULT NULL,
  `sexo_sexo_id` int DEFAULT NULL,
  `concelho_concelho_id` int DEFAULT NULL,
  `estado_terceiros_estado_terceiro_id` int DEFAULT NULL,
  `utilizador_fk` int DEFAULT NULL,
  `aulas_aulas_id` int DEFAULT NULL,
  `professores_email` varchar(60) NOT NULL,
  `professores_password` varchar(100) NOT NULL,
  `professores_role` enum('professore') DEFAULT NULL,
  `fk_UserID` varchar(45) NOT NULL,
  `professore_verificado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`professor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professores`
--

LOCK TABLES `professores` WRITE;
/*!40000 ALTER TABLE `professores` DISABLE KEYS */;
/*!40000 ALTER TABLE `professores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profissao`
--

DROP TABLE IF EXISTS `profissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissao` (
  `profissao_id` int NOT NULL,
  `profissao_nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`profissao_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissao`
--

LOCK TABLES `profissao` WRITE;
/*!40000 ALTER TABLE `profissao` DISABLE KEYS */;
/*!40000 ALTER TABLE `profissao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programa`
--

DROP TABLE IF EXISTS `programa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programa` (
  `programa_id` int NOT NULL AUTO_INCREMENT,
  `programa_nome` varchar(200) DEFAULT NULL,
  `programa_horas` decimal(2,2) DEFAULT NULL,
  `programa_tempo_aula` decimal(2,2) DEFAULT NULL,
  PRIMARY KEY (`programa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programa`
--

LOCK TABLES `programa` WRITE;
/*!40000 ALTER TABLE `programa` DISABLE KEYS */;
/*!40000 ALTER TABLE `programa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salas` (
  `sala_id` int NOT NULL AUTO_INCREMENT,
  `sala_nome` varchar(10) NOT NULL,
  `sala_capacidade_aconselhada` int DEFAULT NULL,
  `sala_capacidade_maxima` int NOT NULL,
  `sala_equipamento_quantidade` varchar(20) DEFAULT NULL,
  `sala_foto` varchar(100) DEFAULT NULL,
  `escolas_fk` int NOT NULL,
  PRIMARY KEY (`sala_id`,`escolas_fk`),
  UNIQUE KEY `salas_nome_UNIQUE` (`sala_nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES (2,'Sala',20,25,'5','http://dev.servebbs.net:3200/avatar.png-1627906794019.png',1),(3,'tes01',20,25,'3','http://dev.servebbs.net:3200/iPhone640x960@2x.png-1627985307898.png',2);
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `staff_nif` int DEFAULT NULL,
  `staff_nome` varchar(100) DEFAULT NULL,
  `staff_rua` varchar(100) DEFAULT NULL,
  `staff_codigo_postal` int DEFAULT NULL,
  `staff_freguesia` varchar(45) DEFAULT NULL,
  `staff_concelho` varchar(45) DEFAULT NULL,
  `staff_telemovel` int DEFAULT NULL,
  `staff_contacto` int DEFAULT NULL,
  `staff_lingua_nativa` varchar(45) DEFAULT NULL,
  `staff_foto` varchar(45) DEFAULT NULL,
  `staff_cv` varchar(45) DEFAULT NULL,
  `staff_nacionalidade` varchar(45) DEFAULT NULL,
  `staff_tipo_doc_ident` varchar(45) DEFAULT NULL,
  `staff_num_doc_ident` varchar(45) DEFAULT NULL,
  `staff_sexo` varchar(45) DEFAULT NULL,
  `staff_habilitacao` varchar(45) DEFAULT NULL,
  `staff_formacao` varchar(45) DEFAULT NULL,
  `staff_profissao` varchar(45) DEFAULT NULL,
  `staff_obs` varchar(45) DEFAULT NULL,
  `staff_anexos` varchar(45) DEFAULT NULL,
  `staff_data_entrada` varchar(45) DEFAULT NULL,
  `staff_data_saida` varchar(45) DEFAULT NULL,
  `staff_data_validade_ficha_medica` date DEFAULT NULL,
  `staff_data_validade_registo_criminal` date DEFAULT NULL,
  `staff_estado` varchar(45) DEFAULT NULL,
  `codigo _postal_codigo _postal_id` int NOT NULL,
  `tipo_doc_ident_tipo_doc_ident_id` int NOT NULL,
  `nacionalidades_nacionalidades_id` int NOT NULL,
  `freguesias_freguesias_id` int NOT NULL,
  `profissao_profissao_id` int NOT NULL,
  `formacao_formacao_id` int NOT NULL,
  `habilitacao_habiltacao_id` int NOT NULL,
  `sexo_sexo_id` int NOT NULL,
  `concelho_concelho_id` int NOT NULL,
  `estado_dados_estado_dado_id` int NOT NULL,
  `utilizador_fk` int NOT NULL,
  `Ponto_ponto_id` int NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tempo_aula`
--

DROP TABLE IF EXISTS `tempo_aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempo_aula` (
  `tempo_aula_id` int NOT NULL,
  `tempo_aula_horas` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tempo_aula_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempo_aula`
--

LOCK TABLES `tempo_aula` WRITE;
/*!40000 ALTER TABLE `tempo_aula` DISABLE KEYS */;
/*!40000 ALTER TABLE `tempo_aula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo` (
  `tipo_id` int NOT NULL AUTO_INCREMENT,
  `tipo_nome` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`tipo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valida`
--

DROP TABLE IF EXISTS `valida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valida` (
  `ID` varchar(45) NOT NULL,
  `EmailCode` int NOT NULL,
  `PhoneCode` int NOT NULL,
  `ValEMail` tinyint DEFAULT '0',
  `ValTelf` tinyint DEFAULT '0',
  `Fecha` varchar(45) DEFAULT NULL,
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valida`
--

LOCK TABLES `valida` WRITE;
/*!40000 ALTER TABLE `valida` DISABLE KEYS */;
INSERT INTO `valida` VALUES ('01ed9c8e-127a-43b0-9a61-f9d02ca2773a',123937,137385,1,1,NULL),('0224254e-9bf9-4f70-bbc7-37f7e1dce9dc',103212,156197,0,0,NULL),('14be6295-2c61-4012-af7e-f3984c00dde7',171403,171403,0,0,NULL),('241f0226-0ef1-4156-951c-bef86b33305d',186343,186343,0,0,NULL),('3ce92e30-313e-47e6-8174-3f52e18d83e7',131008,125406,1,1,NULL),('440b7589-960b-40e2-83aa-a53a2b68925b',157288,157288,0,0,NULL),('4b998963-0a94-424c-ac1b-2cef83c51bb8',109187,109187,0,0,NULL),('5be9b95b-b9df-4704-988c-f99b7311c53a',109760,109760,1,1,NULL),('76ebc412-a55d-4d75-ad9a-6e51d6c1daaa',124497,124497,0,0,NULL),('851f3ed0-3f78-4e53-b081-afd78c332f3a',111382,111382,1,1,NULL),('99562367-10f0-4c8e-9bea-bb1cde867345',182232,182232,0,0,NULL),('b8191af7-853e-4474-97ac-ba9279a5b5cf',118842,118842,0,0,NULL),('c849d9ae-4d62-41d4-a36a-5b3adc191753',145702,145702,0,0,NULL),('c92c03f5-e927-4c18-98ed-b4d17dba5edb',150481,150481,0,0,NULL);
/*!40000 ALTER TABLE `valida` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-13 20:03:44
