DROP DATABASE IF EXISTS `project`;
CREATE DATABASE `project`;
USE `project`
DROP TABLE IF EXISTS `houses`;
CREATE TABLE `houses`
(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `link` VARCHAR
(255) NOT NULL UNIQUE KEY,
  `market_date`DATETIME  NOT NULL,
  `location_country` VARCHAR
(200) NOT NULL,
  `location_city` VARCHAR
(200)NOT NULL,
  `location_address` VARCHAR
(200)NOT NULL,
`size_living_area`INT NOT NULL,
  `size_rooms` INT NOT NULL,
  `price_value` FLOAT NOT NULL,
  `price_currency` CHAR
(3) NOT NULL,
  `location_coordinates_lat` FLOAT
(10,6) NOT NULL,
  `location_coordinates_lng` FLOAT
(11,6) NOT NULL,
  
  `description` TEXT  ,
  `title` TEXT ,
  `images` VARCHAR
(255) DEFAULT '',
  `sold` INT DEFAULT '0');

  LOCK TABLES `houses` WRITE;
INSERT INTO 
houses
VALUES
  (1, "http://new1.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 3, 10000, "USD", 92, 120, "word word word", "more words", "https://media.rightmove.co.uk/dir/211k/210644/82725887/210644_Borrowdale_3_IMG_00_0000_max_656x437.jpg", 1 ),
  (2, "http://new2.nl/url", "2018-10-10", "germany", "berlin", "some street", 120, 4, 20000, "USD", 92, 120, "word word word", "more words", "https://lid.zoocdn.com/354/255/4246e852aa4b7af9226396bfc8b25b9ce6aaf38a.jpg", 0 ),
  (3, "http://new3.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 1, 30000, "USD", 92, 120, "word word word", "more words", "https://s.hdnux.com/photos/55/00/11/11797069/3/gallery_medium.jpg", 1 ),
  (4, "http://new4.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 6, 40000, "USD", 92, 120, "word word word", "more words", "https://propertyfox.co.za/wp-content/uploads/2018/03/glass-houses.jpg", 0 ),
  (5, "http://new5.nl/url", "2018-10-10", "belgium", "brussels", "some street", 120, 2, 50000, "USD", 92, 120, "word word word", "more words", "https://i.pinimg.com/originals/47/b9/7e/47b97e62ef6f28ea4ae2861e01def86c.jpg", 1 ),
  (6, "http://new6.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 5, 60000, "USD", 92, 120, "word word word", "more words", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCnvV8vzGG8q3Op9O-qCZ-9qspPi2OfCatob8GSn1c0HYWaj_1zQ", 0 ),
  (7, "http://new7.nl/url", "2018-10-10", "belgium", "brussels", "some street", 120, 4, 70000, "USD", 92, 120, "word word word", "more words", "https://cdn.torontolife.com/wp-content/uploads/2018/02/toronto-house-sold-30-queen-marys-drive-1-803x603.jpg", 0 ),
  (8, "http://new8.nl/url", "2018-10-10", "germany", "berlin", "some street", 120, 1, 80000, "USD", 92, 120, "word word word", "more words", "https://mediavault.point2.com/p2h/listing/a6ce/91d0/e097/639e7938954de92cdf19/nwm_medium.jpg", 1 ),
  (9, "http://new9.nl/url", "2018-10-10", "germany", "berlin", "some street", 120, 2, 90000, "USD", 92, 120, "word word word", "more words", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx6Fn5tuaI-CMULnQpn-jMxU4TxCwtM46OnHUjSaBGPK3aKWioQ", 1 ),
  (10, "http://new10.nl/url", "2018-10-10", "belgium", "brussels", "some street", 120, 3, 100000, "USD", 92, 120, "word word word", "more words", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3and5RZmkH7Ob6iUfqq6a6-672TXknCF_7lxSVMLaunqYVS-j", 1 ),
  (11, "http://new11.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 3, 10000, "USD", 92, 120, "word word word", "more words", "https://media.rightmove.co.uk/dir/211k/210644/82725887/210644_Borrowdale_3_IMG_00_0000_max_656x437.jpg", 1 ),
  (12, "http://new12.nl/url", "2018-10-10", "germany", "berlin", "some street", 120, 4, 20000, "USD", 92, 120, "word word word", "more words", "https://lid.zoocdn.com/354/255/4246e852aa4b7af9226396bfc8b25b9ce6aaf38a.jpg", 0 ),
  (13, "http://new13.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 1, 30000, "USD", 92, 120, "word word word", "more words", "https://s.hdnux.com/photos/55/00/11/11797069/3/gallery_medium.jpg", 1 ),
  (14, "http://new14.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 6, 40000, "USD", 92, 120, "word word word", "more words", "https://propertyfox.co.za/wp-content/uploads/2018/03/glass-houses.jpg", 0 ),
  (15, "http://new15.nl/url", "2018-10-10", "belgium", "brussels", "some street", 120, 2, 50000, "USD", 92, 120, "word word word", "more words", "https://i.pinimg.com/originals/47/b9/7e/47b97e62ef6f28ea4ae2861e01def86c.jpg", 1 ),
  (16, "http://new16.nl/url", "2018-10-10", "netherlands", "Amsterdam", "some street", 120, 5, 60000, "USD", 92, 120, "word word word", "more words", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCnvV8vzGG8q3Op9O-qCZ-9qspPi2OfCatob8GSn1c0HYWaj_1zQ", 0 ),
  (17, "http://new17.nl/url", "2018-10-10", "belgium", "brussels", "some street", 120, 4, 70000, "USD", 92, 120, "word word word", "more words", "https://cdn.torontolife.com/wp-content/uploads/2018/02/toronto-house-sold-30-queen-marys-drive-1-803x603.jpg", 0 ),
  (18, "http://new18.nl/url", "2018-10-10", "germany", "berlin", "some street", 120, 1, 80000, "USD", 92, 120, "word word word", "more words", "https://mediavault.point2.com/p2h/listing/a6ce/91d0/e097/639e7938954de92cdf19/nwm_medium.jpg", 1 ),
  (19, "http://new19.nl/url", "2018-10-10", "germany", "berlin", "some street", 120, 2, 90000, "USD", 92, 120, "word word word", "more words", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx6Fn5tuaI-CMULnQpn-jMxU4TxCwtM46OnHUjSaBGPK3aKWioQ", 1 ),
  (20, "http://new20.nl/url", "2018-10-10", "belgium", "brussels", "some street", 120, 3, 100000, "USD", 92, 120, "word word word", "more words", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3and5RZmkH7Ob6iUfqq6a6-672TXknCF_7lxSVMLaunqYVS-j", 1 );
UNLOCK TABLES;




