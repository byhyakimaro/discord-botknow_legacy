-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.14-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para knowadmin
CREATE DATABASE IF NOT EXISTS `knowadmin` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `knowadmin`;

-- Copiando estrutura para tabela knowadmin.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `usuario_id` int(10) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(256) DEFAULT NULL,
  `senha` varchar(256) DEFAULT NULL,
  `conta` varchar(32) DEFAULT NULL,
  `foto` text DEFAULT NULL,
  `data_registro` datetime DEFAULT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela knowadmin.usuario: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT IGNORE INTO `usuario` (`usuario_id`, `usuario`, `senha`, `conta`, `foto`, `data_registro`) VALUES
	(1, '04dae624ba0b9c3eba10355ac3c17895f57c442b5c84ca9f83363eb7201eaf9c', '86f65e28a754e1a71b2df9403615a6c436c32c42a75a10d02813961b86f1e428', 'admin', 'https://pastebin.com/themes/pastebin/img/guest.png', '2020-12-23 19:21:32'),
	(2, '8d4b98458ce4ea2905a11eb811540fccfc5e82b05434bf04752ef4180419d23f', 'ad518e5a1a20a0989d6d15ea16e65fcf3f6cfbda4208b75503daf69f0bc16563', 'admin', 'https://media.discordapp.net/attachments/800044453863751710/800128127186632745/GSNX_Logo_Branca_Sem_Fundo.png', '2021-01-16 20:21:39');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
