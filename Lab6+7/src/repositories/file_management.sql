CREATE TABLE `account` (
	`id` int primary key AUTO_INCREMENT,
    `name` varchar (100) collate utf8_unicode_ci,
    `email` varchar (100),
    `password` varchar (100)
) 