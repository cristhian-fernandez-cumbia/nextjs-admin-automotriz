DROP TABLE IF EXISTS recordings;
DROP TABLE IF EXISTS meetings;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;

CREATE TABLE role (
    idrole INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name_role VARCHAR(100) NOT NULL,
    active VARCHAR(1) NOT NULL DEFAULT 'S'
);

CREATE TABLE user (
    iduser INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    createAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updateAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo VARCHAR(1) NOT NULL DEFAULT 'S',
    idrole INT(10),
    image VARCHAR(200) NULL,
    FOREIGN KEY (idrole) REFERENCES role(idrole)
);

CREATE TABLE meetings (
    idmeeting INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(50) NOT NULL,
    plate VARCHAR(20) NOT NULL,
    date_meeting DATE NOT NULL,
    active VARCHAR(1) NOT NULL DEFAULT 'S'
);

CREATE TABLE recordings (
    idrecording INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name_recording VARCHAR(100) NOT NULL,
    process VARCHAR(50) NOT NULL,
    url_recording VARCHAR(100) NULL,
    date_recording DATETIME  NOT NULL,
    active CHAR(1) NOT NULL DEFAULT 'S',
    idmeeting INT(10) NOT NULL,
    FOREIGN KEY (idmeeting) REFERENCES meetings(idmeeting)
);

-- Registros Role

INSERT INTO `dbclinicaautomotriz`.`role` (`name_role`) VALUES ('administrador');
INSERT INTO `dbclinicaautomotriz`.`role` (`name_role`) VALUES ('asistente');
INSERT INTO `dbclinicaautomotriz`.`role` (`name_role`) VALUES ('tecnico');

-- Registros User
INSERT INTO `dbclinicaautomotriz`.`user` (`email`, `name`, `lastname`, `password`, `idrole`) VALUES ('anthonydlc@gmail.com', 'Anthony', 'De la Cruz Cuya', '$2a$10$CUd2cMsItGZl91OGB1Xe9u2MAiWDEj7oysjsSZzKmTZ.Ev6JIhT7G', '1');

-- Registros Meetings
INSERT INTO `dbclinicaautomotriz`.`meetings` (`brand`, `model`, `plate`, `date_meeting`) VALUES ('Toyota', 'RAV4', 'XYZ-123', '2024-08-18');
INSERT INTO `dbclinicaautomotriz`.`meetings` (`brand`, `model`, `plate`, `date_meeting`) VALUES ('Suzuki', 'JIMMY', 'ABC-123', '2024-08-18');
INSERT INTO `dbclinicaautomotriz`.`meetings` (`brand`, `model`, `plate`, `date_meeting`) VALUES ('Subaru', 'FORESTER', 'MNO-456', '2024-08-18');
INSERT INTO `dbclinicaautomotriz`.`meetings` (`brand`, `model`, `plate`, `date_meeting`) VALUES ('Subaru', 'CROSSTREK', 'BCD-78910', '2024-08-18');