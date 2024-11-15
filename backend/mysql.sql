create database aceisa;

use aceisa;

show tables;

CREATE TABLE students (
    SRN VARCHAR(13) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone_num VARCHAR(15),
    Password VARCHAR(100) NOT NULL
    
);

CREATE TABLE staff (
    SID VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    SubjID VARCHAR(20) PRIMARY KEY,
    Course_name VARCHAR(100) NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    created_on DATE NOT NULL,
   CONSTRAINT fk_courses_staff FOREIGN KEY (created_by) REFERENCES staff(SID)
);


CREATE TABLE mcqs (
    QuestionID INT,
    SubjID VARCHAR(20),
    Option1 VARCHAR(255),
    Option2 VARCHAR(255),
    Option3 VARCHAR(255),
    Option4 VARCHAR(255),
    Answer ENUM('A', 'B', 'C', 'D'),
    PRIMARY KEY (SubjID, QuestionID),
    CONSTRAINT fk_mcqs FOREIGN KEY (SubjID) REFERENCES courses(SubjID)
);

CREATE TABLE detailed_answer (
    SubjID VARCHAR(20),
    QuestionID INT,
    Detailed_Answer VARCHAR(255),
    PRIMARY KEY (SubjID, QuestionID),
    CONSTRAINT fk_detailed_answers FOREIGN KEY (SubjID, QuestionID) REFERENCES mcqs(SubjID, QuestionID)
);

CREATE TABLE marks (
    SubjID VARCHAR(20),
    SRN VARCHAR(20),
    Marks INT,
    PRIMARY KEY (SubjID, SRN),
    CONSTRAINT fk_marks FOREIGN KEY (SubjID) REFERENCES courses(SubjID),
    CONSTRAINT fk_marks_2 FOREIGN KEY (SRN) REFERENCES students(SRN)
);


CREATE TABLE student_srns (
    SRN VARCHAR(20) PRIMARY KEY,
    CONSTRAINT fk_student_srn FOREIGN KEY (SRN) REFERENCES students(SRN)
);

select * from students;

select * from staff;

select * from mcqs;

select * from courses;

select * from marks;

select * from detailed_answers;

select * from student_srns;


DELIMITER $$
CREATE TRIGGER	student_SRN
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_srns (SRN)
    VALUES (NEW.SRN);
END $$
DELIMITER ;

DELIMITER $$

CREATE FUNCTION GetAverageMarks(subj_id INT) 
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE avg_marks DECIMAL(10, 2);
    
    SELECT AVG(marks) 
    INTO avg_marks
    FROM marks 
    WHERE SubjID = subj_id;
    
    RETURN avg_marks;
END $$
DELIMITER ;



SHOW CREATE FUNCTION GetAverageMarks;
