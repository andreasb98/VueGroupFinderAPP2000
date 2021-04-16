CREATE DATABASE IF NOT EXISTS protest;
CREATE TABLE IF NOT EXISTS `Students` (`id` INTEGER NOT NULL auto_increment , `firstname` VARCHAR(255), `lastname` VARCHAR(255), `email` VARCHAR(255) UNIQUE, `phonenumber` VARCHAR(255), `password` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `Groups` (`id` INTEGER auto_increment , `category` VARCHAR(255) NOT NULL, `organizer` VARCHAR(255), `title` VARCHAR(255) NOT NULL, `description` VARCHAR(255) NOT NULL, `location` VARCHAR(255) NOT NULL, `date` VARCHAR(255), `time` VARCHAR(255), `StudentId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`StudentId`) REFERENCES `Students` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `GroupMemberships` (`id` INTEGER auto_increment , `StudentId` INTEGER, `GroupId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`StudentId`) REFERENCES `Students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`GroupId`) REFERENCES `Groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `RoomTypes` (`id` INTEGER auto_increment , `description` VARCHAR(255), `maxCapacity` INTEGER, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `Rooms` (`id` INTEGER auto_increment , `name` VARCHAR(255), `sted` VARCHAR(255), `RoomTypeId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`RoomTypeId`) REFERENCES `RoomTypes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `RoomReservations` (`id` INTEGER auto_increment , `startDateTime` VARCHAR(255), `endDateTime` VARCHAR(255), `RoomId` INTEGER, `GroupId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`RoomId`) REFERENCES `Rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`GroupId`) REFERENCES `Groups` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `ChatMessages` (`message` VARCHAR(255), `timeStamp` DATETIME, `StudentId` INTEGER , `GroupId` INTEGER , PRIMARY KEY (`StudentId`, `GroupId`), FOREIGN KEY (`StudentId`) REFERENCES `Students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`GroupId`) REFERENCES `Groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `CourseCodes` (`id` INTEGER NOT NULL auto_increment , `courseCode` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `CourseRegisters` (`CourseCodeId` INTEGER , `StudentId` INTEGER , PRIMARY KEY (`CourseCodeId`, `StudentId`), FOREIGN KEY (`CourseCodeId`) REFERENCES `CourseCodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`StudentId`) REFERENCES `Students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Logg(id SMALLINT(6) auto_increment PRIMARY KEY, hendelse VARCHAR(255), Dato DATE, StudentId INTEGER, GroupId INTEGER, FOREIGN KEY (StudentId) REFERENCES Students(id), 
FOREIGN KEY (GroupId) REFERENCES Groups(id) );
CREATE TABLE IF NOT EXISTS brukerEndringsLogg(id SMALLINT(6) auto_increment PRIMARY KEY, Dato DATE, nyVerdi VARCHAR(255), gammelVerdi VARCHAR(255), StudentId INTEGER, 
FOREIGN KEY (StudentId) REFERENCES Students(id) );


DELIMITER $
DROP TRIGGER IF EXISTS tr_student_groupjoin $
CREATE TRIGGER  tr_student_groupjoin
		AFTER INSERT ON GroupMemberships
		FOR EACH ROW
	BEGIN	
		INSERT INTO Logg(hendelse, Dato, StudentId, GroupId)
		VALUES("Ble med i gruppe", CURDATE(), NEW.StudentId, NEW.GroupId);
		
	END	$
DELIMITER ;

--Disse feltene blir oppdatert en om gangen i applikasjonen, derfor else-if struktur. 
DELIMITER $
DROP TRIGGER IF EXISTS tr_student_update_firstname $
CREATE TRIGGER tr_student_update
		AFTER UPDATE ON students
		FOR EACH ROW
	BEGIN		
		DECLARE email_adress VARCHAR(255);
		IF (NEW.firstname <> OLD.firstname) THEN
		  INSERT INTO brukerEndringsLogg(Dato, nyVerdi, gammelVerdi, StudentId)
			VALUES(CURDATE(), NEW.firstname, OLD.firstname, (SELECT id FROM students WHERE email = OLD.email));
		ELSEIF (NEW.lastname <> OLD.lastname) THEN
		  INSERT INTO brukerEndringsLogg(Dato, nyVerdi, gammelVerdi, StudentId)
			VALUES(CURDATE(), NEW.lastname, OLD.lastname, (SELECT id FROM students WHERE email = OLD.email));
		ELSEIF (NEW.phonenumber <> OLD.phonenumber) THEN
		  INSERT INTO brukerEndringsLogg(Dato, nyVerdi, gammelVerdi, StudentId)
			VALUES(CURDATE(), NEW.phonenumber, OLD.phonenumber, (SELECT id FROM students WHERE email = OLD.email));
		END IF;
	END	$
DELIMITER ;




INSERT INTO RoomTypes(description, maxCapacity)
VALUES("Grupperom", 5);
INSERT INTO RoomTypes(description, maxCapacity)
VALUES("Grupperom", 10);
INSERT INTO Rooms(name, RoomTypeId, sted)
VALUES("3-111", 1, "Bø");
INSERT INTO Rooms(name, RoomTypeId, sted)
VALUES("3-112", 1, "Bø");
INSERT INTO Rooms(name, RoomTypeId, sted)
VALUES("3-113", 1, "Bø");
INSERT INTO Rooms(name, RoomTypeId, sted)
VALUES("3-114", 2, "Bø");
INSERT INTO Rooms(name, RoomTypeId, sted)
VALUES("3-115", 2, "Bø");
INSERT INTO Rooms(name, RoomTypeId, sted)
VALUES("3-116", 2, "Bø");
INSERT INTO Students(firstname, lastname, email, phonenumber, password)
VALUES("Kari", "McTestersen", "test@test.com", "99887766", "$2a$10$L.2A1PDM30QpfhXNTl/Z0eFbGuaOXQm3ZDXERLF9QQbVOeJXHybcy");
INSERT INTO Students(firstname, lastname, email, phonenumber, password)
VALUES("Ola", "Nordmann", "test1@test.com", "67675555", "$2a$10$AGSuNq.FkoFr85/Dd0L.gOq0.5BhoWcVqImm7biBmn1/cUC9uK3gW");
INSERT INTO Groups(category, organizer, title, description, location, date, time, StudentId)
VALUES("OAD2000", null, "Datamodellering oblig", "Ønsker flere medlemmer til oblig gruppe", "USN Bø", null, null, 1);
INSERT INTO GroupMemberships(StudentId, GroupId)
VALUES(1, 1);









