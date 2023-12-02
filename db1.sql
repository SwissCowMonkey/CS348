USE db1;
DELIMITER //
SET SQL_SAFE_UPDATES = 0;
DROP PROCEDURE IF EXISTS getUser;
CREATE PROCEDURE getUser(IN uID integer)
       BEGIN
         SELECT *
         FROM Users
         WHERE Users.UserID = uID;
       END //
DROP PROCEDURE IF EXISTS addRoom;
CREATE PROCEDURE addRoom(IN rID integer, IN uID integer)
       BEGIN
         UPDATE Users
         SET RoomID = rID
         WHERE UserID = uID;
       END //
DROP PROCEDURE IF EXISTS deleteRoom;
CREATE PROCEDURE deleteRoom(IN uID integer)
       BEGIN
         UPDATE Users
         SET RoomID = NULL
         WHERE UserID = uID;
       END //
DROP PROCEDURE IF EXISTS getAllRooms;
CREATE PROCEDURE getAllRooms(IN bID integer)
       BEGIN
         SELECT *
         FROM Rooms
         WHERE BuildingID = bID;
       END //
       
CREATE INDEX buildingIndex ON Rooms(BuildingID);

DELIMITER ;
-- CALL addRoom(1121, 1);
CALL getUser(1);
-- CALL getAllRooms(1);