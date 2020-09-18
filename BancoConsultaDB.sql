-- Criação banco de dados ConsultaDB
create database consultadb;

-- Acessar ao banco de dado ConsultaDB
use consultadb;

-- Criação da tabela para Login/Cadastr o
CREATE TABLE `usuarios` (
 `id` int(11) NOT NULL primary key auto_increment,
 `nome` varchar(35) NOT NULL,
 `cpf` varchar(20) NOT NULL,
 `telefone` varchar(20) NOT NULL,
 `cep` varchar(15) NOT NULL,	
 `endereco` varchar(100) NOT NULL,
 `numero` varchar(5) NOT NULL,
 `complemento` varchar(15) NOT NULL,
 `bairro` varchar(50) NOT NULL,   
 `cidade` varchar(50) NOT NULL,
 `usuario` varchar(100) NOT NULL,
 `senha` varchar(50) NOT NULL,
 `nivel` varchar(20) NOT NULL
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 