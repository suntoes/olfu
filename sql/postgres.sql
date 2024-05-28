
/* SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; */
START TRANSACTION;
time_zone := "+00:00";


/* SQLINES DEMO *** ARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** ARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** LLATION_CONNECTION=@@COLLATION_CONNECTION */;
/* SQLINES DEMO *** tf8mb4 */;




CREATE TABLE admin_users (
  num SERIAL PRIMARY KEY,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL
) ;

INSERT INTO admin_users (num, username, password) VALUES
(1, 'jsalva', '12345'),
(2, 'jrodriguez', '11111'),
(3, 'dtorres', '22222'),
(4, 'msantos', 'abcde'),
(5, 'lsantos', '00000');




CREATE TABLE classes (
  Class_ID varchar(50) NOT NULL,
  Course varchar(500) DEFAULT NULL,
  Year_Level varchar(255) DEFAULT NULL
) ;



INSERT INTO classes (Class_ID, Course, Year_Level) VALUES
('1styear_cs', 'Bachelor of Science in Computer Science', '1st Year'),
('1styear_emc', 'Bachelor of Science in Entertainment and Multimedia Computing', '1st Year'),
('1styear_it', 'Bachelor of Science in Information Technology', '1st Year'),
('2ndyear_cs', 'Bachelor of Science in Computer Science', '2nd Year'),
('2ndyear_emc', 'Bachelor of Science in Entertainment and Multimedia Computing', '2nd Year'),
('2ndyear_it', 'Bachelor of Science in Information Technology', '2nd Year'),
('3rdyear_cs', 'Bachelor of Science in Computer Science', '3rd Year'),
('3rdyear_emc', 'Bachelor of Science in Entertainment and Multimedia Computing', '3rd Year'),
('3rdyear_it', 'Bachelor of Science in Information Technology', '3rd Year'),
('4thyear_cs', 'Bachelor of Science in Computer Science', '4th Year'),
('4thyear_emc', 'Bachelor of Science in Entertainment and Multimedia Computing', '4th Year'),
('4thyear_it', 'Bachelor of Science in Information Technology', '4th Year');




CREATE TABLE classsubjects (
  Class_ID varchar(50) NOT NULL,
  Subject_Code varchar(10) NOT NULL
) ;



INSERT INTO classsubjects (Class_ID, Subject_Code) VALUES
('1styear_cs', 'CRWT111'),
('1styear_cs', 'DLOG111'),
('1styear_cs', 'INPR111'),
('1styear_cs', 'MATM111'),
('1styear_cs', 'PURC111'),
('1styear_cs', 'RIPH111'),
('1styear_cs', 'VRTS112'),
('1styear_cs', 'WBDV111'),
('1styear_emc', 'CRTW111'),
('1styear_emc', 'FADD111'),
('1styear_emc', 'INPR111'),
('1styear_emc', 'MATM111'),
('1styear_emc', 'PURC111'),
('1styear_emc', 'RIPH111'),
('1styear_emc', 'VRTS112'),
('1styear_emc', 'WBDV111'),
('1styear_it', 'CRWT111'),
('1styear_it', 'DLOG111'),
('1styear_it', 'INPR111'),
('1styear_it', 'MATM111'),
('1styear_it', 'PURC111'),
('1styear_it', 'RIPH111'),
('1styear_it', 'VRTS112'),
('1styear_it', 'WBDV111'),
('2ndyear_cs', 'ALGO211'),
('2ndyear_cs', 'DCAL211'),
('2ndyear_cs', 'DIMM212'),
('2ndyear_cs', 'IMGT211'),
('2ndyear_cs', 'LFAD211'),
('2ndyear_cs', 'OOPR212'),
('2ndyear_cs', 'PHED214'),
('2ndyear_cs', 'PPGC111'),
('2ndyear_cs', 'VRTS114'),
('2ndyear_emc', 'CGPR211'),
('2ndyear_emc', 'DLOG111'),
('2ndyear_emc', 'PHED214'),
('2ndyear_emc', 'PPGC111'),
('2ndyear_emc', 'PTDA211'),
('2ndyear_emc', 'TDAN211'),
('2ndyear_emc', 'UUID211'),
('2ndyear_emc', 'VRTS114'),
('2ndyear_it', 'ADET211'),
('2ndyear_it', 'DBSA211'),
('2ndyear_it', 'LFAD211'),
('2ndyear_it', 'MADS211'),
('2ndyear_it', 'OOPR212'),
('2ndyear_it', 'PHED214'),
('2ndyear_it', 'PPGC111'),
('2ndyear_it', 'QMET211'),
('3rdyear_cs', 'BUSM311'),
('3rdyear_cs', 'COPH311'),
('3rdyear_cs', 'CSEL314'),
('3rdyear_cs', 'CSTH411'),
('3rdyear_cs', 'CTIC311'),
('3rdyear_cs', 'HCIN311'),
('3rdyear_cs', 'IAAS311'),
('3rdyear_cs', 'SOFE312'),
('3rdyear_emc', 'EMCC314'),
('3rdyear_emc', 'EMCC315'),
('3rdyear_emc', 'EMCC316'),
('3rdyear_emc', 'EMCC317'),
('3rdyear_emc', 'EMCC318'),
('3rdyear_emc', 'EMCP311'),
('3rdyear_emc', 'IAAS311'),
('3rdyear_emc', 'PROD311'),
('3rdyear_it', 'BUSM311'),
('3rdyear_it', 'HCIN312'),
('3rdyear_it', 'IAAS312'),
('3rdyear_it', 'IPTC312'),
('3rdyear_it', 'ITEL311'),
('3rdyear_it', 'NETW312'),
('3rdyear_it', 'SIAA312'),
('4thyear_cs', 'CSIM412'),
('4thyear_emc', 'EMIM411'),
('4thyear_it', 'ITEL315'),
('4thyear_it', 'ITEL316'),
('4thyear_it', 'ITIM411');




CREATE TABLE class_sched (
  Class_ID varchar(50) NOT NULL,
  Subject_Code varchar(10) DEFAULT NULL,
  Schedule varchar(255) DEFAULT NULL,
  Room varchar(20) DEFAULT NULL
) ;



INSERT INTO class_sched (Class_ID, Subject_Code, Schedule, Room) VALUES
('1styear_cs', 'CRWT111', 'F 04:50PM-07:50PM', 'OCR'),
('1styear_cs', 'DLOG111', 'T 10:20AM-01:20PM', 'TAM 501'),
('1styear_cs', 'INPR111', 'W 04:50PM-06:50PM / W 01:30PM-04:30PM', 'TAM 502 / TAM CL1'),
('1styear_cs', 'MATM111', 'TH 04:50PM-07:50PM', 'OCR'),
('1styear_cs', 'PURC111', 'TH 01:30PM-04:30PM', 'OCR'),
('1styear_cs', 'RIPH111', 'F 01:30PM-04:30PM', 'OCR'),
('1styear_cs', 'VRTS112', 'S 03:30PM-04:30PM', 'OCR'),
('1styear_cs', 'WBDV111', 'T 04:50PM-07:50PM / T 01:30PM-03:30PM', 'TAM CL1 / TAM 502'),
('1styear_emc', 'CRTW111', 'T 04:50PM-07:50PM', 'OCR'),
('1styear_emc', 'FADD111', 'F 10:20AM-01:20PM', 'TAM 503'),
('1styear_emc', 'INPR111', 'F 04:50PM-06:50PM / F 01:30PM-04:30PM', 'TAM 503 / TAM CL4'),
('1styear_emc', 'MATM111', 'T 01:30PM-04:30PM', 'OCR'),
('1styear_emc', 'PURC111', 'M 04:50PM-07:50PM', 'OCR'),
('1styear_emc', 'RIPH111', 'M 01:30PM-04:30PM', 'OCR'),
('1styear_emc', 'VRTS112', 'S 12:30PM-01:30PM', 'OCR'),
('1styear_emc', 'WBDV111', 'TH 04:50PM-06:50PM / TH 01:30PM-04:30PM', 'TAM 502 / TAM CL1'),
('1styear_it', 'CRWT111', 'W 07:00AM-10:00AM', 'TAM 304B'),
('1styear_it', 'DLOG111', 'T 01:30PM-04:30PM', 'TAM 501'),
('1styear_it', 'INPR111', 'TH 10:20AM-12:20PM / TH 07:00AM-10:00AM', 'TAM 502 / TAM CL1'),
('1styear_it', 'MATM111', 'M 10:20AM-01:20PM', 'TAM 304B'),
('1styear_it', 'PURC111', 'M 07:00AM-10:00AM', 'TAM 304B'),
('1styear_it', 'RIPH111', 'W 10:20AM-01:20PM', 'TAM 304B'),
('1styear_it', 'VRTS112', 'S 08:00AM-09:00AM', 'OCR'),
('1styear_it', 'WBDV111', 'T 10:20AM-12:20PM / T 07:00AM-10:00AM', 'TAM 502 / TAM CL2'),
('2ndyear_cs', 'ALGO211', 'TH 01:30PM-04:30PM', 'TAM 503'),
('2ndyear_cs', 'DCAL211', 'T 04:50PM-07:50PM', 'TAM 505'),
('2ndyear_cs', 'DIMM212', 'TH 04:50PM-07:50PM', 'TAM 501'),
('2ndyear_cs', 'IMGT211', 'F 10:20AM-01:20PM / F 08:00AM-10:00AM', 'TAM CL1 / TAM 505'),
('2ndyear_cs', 'LFAD211', 'F 04:50PM-06:50PM / F 01:30PM-04:30PM', 'TAM 504 / TAM 508'),
('2ndyear_cs', 'OOPR212', 'T 10:20AM-01:20PM / T 08:00AM-10:00AM', 'TAM CL1 / TAM 504'),
('2ndyear_cs', 'PPGC111', 'M 07:00AM-10:00AM', 'OCR'),
('2ndyear_cs', 'PHED214', 'M 01:30PM-03:30PM', 'VJ7 COURT'),
('2ndyear_cs', 'VRTS114', 'S 04:50PM-05:50PM', 'OCR'),
('2ndyear_emc', 'CGPR211', 'W 04:50PM-07:50PM / W 01:30PM-04:30PM', 'TAM 503 / MAC LAB'),
('2ndyear_emc', 'DLOG111', 'W 10:20AM-01:20PM', 'TAM CL1'),
('2ndyear_emc', 'PPGC111', 'T 01:30PM-04:30PM', 'OCR'),
('2ndyear_emc', 'PHED214', 'T 09:00AM-11:00AM', 'VJ7 COURT'),
('2ndyear_emc', 'PTDA211', 'F 04:50PM-06:50PM / F 01:30PM-04:30PM', 'TBA / MAC LAB'),
('2ndyear_emc', 'TDAN211', 'S 04:50PM-06:50PM / S 01:30PM-04:30PM', 'TAM 503 / MAC LAB'),
('2ndyear_emc', 'UUID211', 'TH 04:50PM-06:50PM / TH 01:30PM-04:30PM', 'TAM 503 / MAC LAB'),
('2ndyear_emc', 'VRTS114', 'T 04:50PM-05:50PM', 'OCR'),
('2ndyear_it', 'ADET211', 'M 10:20AM-12:20PM / M 07:00AM-10:00AM', 'RISE 5TH'),
('2ndyear_it', 'DBSA211', 'W 04:50PM-06:50PM / W 01:30PM-04:30PM', 'TAM 505 / TAM CL2'),
('2ndyear_it', 'LFAD211', 'M 04:50PM-06:50PM / M 01:30PM-04:30PM', 'TAM 304B / TAM 508'),
('2ndyear_it', 'MADS211', 'T 04:50PM-07:50PM / T 01:30PM-03:30PM', 'TAM CL2 / TAM 504'),
('2ndyear_it', 'OOPR212', 'F 10:20AM-12:20PM / F 07:00AM-10:00AM', 'TAM 504 / TAM CL1'),
('2ndyear_it', 'PPGC111', 'S 07:00AM-10:00AM', 'OCR'),
('2ndyear_it', 'PHED214', 'F 04:50PM-06:50PM', 'VJ7 COURT'),
('2ndyear_it', 'QMET211', 'W 10:20AM-01:20PM', 'TAM 501'),
('3rdyear_cs', 'COPH311', 'TH 04:50PM-07:50PM / F 04:50PM-06:50PM', 'TAM CL1 / TAM 502'),
('3rdyear_cs', 'CSEL314', 'T 10:20AM-01:20PM / T 08:00AM-10:00AM', 'TAM CL2 / TAM 505'),
('3rdyear_cs', 'CSTH411', 'TH 01:30PM-04:30PM', 'TAM 505'),
('3rdyear_cs', 'CTIC311', 'M 04:50PM-07:50PM', 'TAM 502'),
('3rdyear_cs', 'HCIN311', 'M 01:30PM-04:30PM', 'TAM 502'),
('3rdyear_cs', 'IAAS311', 'F 10:20AM-01:20PM / F 08:00AM-10:00AM', 'TAM CL3 / TAM 502'),
('3rdyear_cs', 'SOFE312', 'TH 10:20AM-12:20PM / TH 07:00AM-10:00AM', 'TAM 503 / TAM CL3'),
('3rdyear_cs', 'BUSM311', 'W 10:20AM-01:20PM', 'TAM CL3'),
('3rdyear_emc', 'DLOG111', 'W 10:20AM-01:20PM', 'TAM CL1'),
('3rdyear_emc', 'EMCC314', 'F 10:20AM-01:20PM / F 08:00AM-10:00AM', 'MAC LAB / TAM 503'),
('3rdyear_emc', 'EMCC316', 'S 10:20AM-01:20PM / S 08:00AM-10:00AM', 'MAC LAB / TAM 503'),
('3rdyear_emc', 'EMCC318', 'T 10:20AM-01:20PM / T 08:00AM-10:00AM', 'MAC LAB / TAM 503'),
('3rdyear_emc', 'PROD311', 'T 01:30PM-04:30PM', 'TAM 503'),
('3rdyear_emc', 'EMCP311', 'M 10:20AM-01:20PM', 'TAM 503'),
('3rdyear_emc', 'IAAS311', 'F 04:50PM-07:50PM TAM / F 01:30PM-03:30PM', 'CL3 / TAM 503'),
('3rdyear_emc', 'EMCC315', 'TH 10:20AM-01:20PM / TH 08:00AM-10:00AM', 'MAC LAB / TAM 503'),
('3rdyear_emc', 'EMCC317', 'M 04:50PM-07:50PM / M 01:30PM-03:30PM', 'MAC LAB'),
('3rdyear_it', 'HCIN312', 'W 10:20AM-01:20PM', 'TAM 503'),
('3rdyear_it', 'IAAS312', 'T 04:50PM-07:50PM / T 01:30PM-03:30PM', 'TAM 508 / TAM 505'),
('3rdyear_it', 'IPTC312', 'F 10:20AM-01:20PM / F 08:00AM-10:00AM', 'TAM CL2 / TAM CL3'),
('3rdyear_it', 'NETW312', 'M 10:20AM-01:20PM / M 08:00AM-10:00AM', 'TAM 508 / TAM CL3'),
('3rdyear_it', 'SIAA312', 'TH 10:20AM-01:20PM / TH 08:00AM-10:00AM', 'TAM CL3 / TAM 502'),
('3rdyear_it', 'ITEL311', 'F 04:50PM-07:50PM / F 01:30PM-03:30PM', 'TAM 508 / TAM CL3'),
('3rdyear_it', 'BUSM311', 'W 01:30PM-04:30PM', 'TAM 505'),
('4thyear_cs', 'CSIM412', 'TH 07:00AM-04:00PM', 'TBA'),
('4thyear_emc', 'EMIM411', 'TH 07:00AM-04:00PM', 'TBA'),
('4thyear_it', 'ITIM411', 'W 07:00AM-04:00PM', 'TBA'),
('4thyear_it', 'ITEL315', 'M 10:20AM-01:20PM / M 08:00AM-10:00AM', 'MAC LAB'),
('4thyear_it', 'ITEL316', 'M 04:50PM-06:50PM / M 01:30PM-04:30PM', 'TAM CL1 / TAM CL2');


CREATE TABLE comments (
  CommentID SERIAL PRIMARY KEY,
  PostID int NOT NULL,
  Username varchar(50) NOT NULL,
  CommentContent text NOT NULL,
  Timestamp timestamp(0) DEFAULT current_timestamp
) ;


CREATE TABLE grades (
  Student_ID varchar(50) NOT NULL,
  Subject_Code varchar(10) NOT NULL,
  Grade varchar(10) DEFAULT NULL
) ;


CREATE TABLE posts (
  PostID SERIAL PRIMARY KEY,
  Username varchar(50) NOT NULL,
  Title varchar(255) NOT NULL,
  Content text NOT NULL,
  Timestamp timestamp(0) NULL DEFAULT current_timestamp
) ;


CREATE TABLE reactions (
  ReactionID SERIAL PRIMARY KEY,
  PostID int DEFAULT NULL,
  CommentID int DEFAULT NULL,
  Username varchar(50) DEFAULT NULL,
  ReactionType varchar(30) check (reactiontype in ('like','dislike')) DEFAULT NULL,
  Timestamp timestamp(0) DEFAULT current_timestamp
) ;


CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  Report_Type varchar(255) DEFAULT NULL,
  Description text DEFAULT NULL,
  Submission_Date timestamp(0) NOT NULL DEFAULT current_timestamp
) ;


CREATE TABLE studentenrollment (
  Student_ID varchar(50) NOT NULL,
  Class_ID varchar(50) NOT NULL
) ;


CREATE OR REPLACE FUNCTION insert_tuition_fee_func() RETURNS TRIGGER AS $$
DECLARE 
    num_subjects INT;
    fee_amount DECIMAL(10,2);
BEGIN
    SELECT COUNT(*) INTO num_subjects FROM classsubjects WHERE Class_ID = NEW.Class_ID;

    fee_amount := num_subjects * 4500;

    INSERT INTO tuition_fees (Student_ID, Class_ID, Fee_Amount) 
    VALUES (NEW.Student_ID, NEW.Class_ID, fee_amount);

    RETURN NEW; -- You need to return the NEW row
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER insert_tuition_fee AFTER INSERT ON studentenrollment FOR EACH ROW
EXECUTE FUNCTION insert_tuition_fee_func();


CREATE TABLE student_profiles (
  id SERIAL PRIMARY KEY,
  Student_ID varchar(50) NOT NULL,
  First_Name varchar(100) DEFAULT NULL,
  Middle_Name varchar(100) DEFAULT NULL,
  Last_Name varchar(100) DEFAULT NULL,
  Username varchar(50) DEFAULT NULL,
  Course varchar(500) DEFAULT NULL,
  Year_Level varchar(255) DEFAULT NULL,
  Gender varchar(50) DEFAULT NULL,
  Date_Of_Birth date DEFAULT NULL,
  Nationality varchar(100) DEFAULT NULL,
  Marital_Status varchar(20) DEFAULT NULL,
  Contact_No varchar(20) DEFAULT NULL,
  Street varchar(255) DEFAULT NULL,
  Brgy varchar(100) DEFAULT NULL,
  City varchar(100) DEFAULT NULL,
  Country varchar(100) DEFAULT NULL,
  Zipcode varchar(20) DEFAULT NULL,
  Profile_Pic varchar(255) DEFAULT NULL
) ;


CREATE OR REPLACE FUNCTION enroll_student_func() RETURNS TRIGGER AS $$
BEGIN
    DECLARE 
        class_id VARCHAR(50);
    BEGIN
        IF NEW.Year_Level = '1st Year' THEN
            IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
                class_id := '1styear_cs';
            ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
                class_id := '1styear_it';
            ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
                class_id := '1styear_emc';
            END IF;
        ELSIF NEW.Year_Level = '2nd Year' THEN
            IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
                class_id := '2ndyear_cs';
            ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
                class_id := '2ndyear_it';
            ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
                class_id := '2ndyear_emc';
            END IF;
        ELSIF NEW.Year_Level = '3rd Year' THEN
            IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
                class_id := '3rdyear_cs';
            ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
                class_id := '3rdyear_it';
            ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
                class_id := '3rdyear_emc';
            END IF;
        ELSIF NEW.Year_Level = '4th Year' THEN
            IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
                class_id := '4thyear_cs';
            ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
                class_id := '4thyear_it';
            ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
                class_id := '4thyear_emc';
            END IF;
        END IF;

        INSERT INTO studentenrollment (Student_ID, Class_ID) VALUES (NEW.Student_ID, class_id);
        RETURN NEW;
    END;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enroll_student AFTER INSERT ON student_profiles FOR EACH ROW
EXECUTE FUNCTION enroll_student_func();

CREATE OR REPLACE FUNCTION insert_grades_on_registration_func() RETURNS TRIGGER AS $$
DECLARE 
    class_id VARCHAR(50);
    subject_code VARCHAR(10);
    done BOOLEAN := FALSE; -- Changed INT to BOOLEAN and set the default value
    cur CURSOR FOR 
        SELECT Subject_Code FROM classsubjects WHERE Class_ID = class_id;
BEGIN
    IF NEW.Year_Level = '1st Year' THEN
        IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
            class_id := '1styear_cs';
        ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
            class_id := '1styear_it';
        ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
            class_id := '1styear_emc';
        END IF;
    ELSIF NEW.Year_Level = '2nd Year' THEN
        IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
            class_id := '2ndyear_cs';
        ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
            class_id := '2ndyear_it';
        ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
            class_id := '2ndyear_emc';
        END IF;
    ELSIF NEW.Year_Level = '3rd Year' THEN
        IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
            class_id := '3rdyear_cs';
        ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
            class_id := '3rdyear_it';
        ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
            class_id := '3rdyear_emc';
        END IF;
    ELSIF NEW.Year_Level = '4th Year' THEN
        IF NEW.Course = 'Bachelor of Science in Computer Science' THEN
            class_id := '4thyear_cs';
        ELSIF NEW.Course = 'Bachelor of Science in Information Technology' THEN
            class_id := '4thyear_it';
        ELSIF NEW.Course = 'Bachelor of Science in Entertainment and Multimedia Computing' THEN
            class_id := '4thyear_emc';
        END IF;
    END IF;

    IF class_id IS NOT NULL THEN
        OPEN cur;
        LOOP
            FETCH cur INTO subject_code;
            EXIT WHEN done;
            IF subject_code IS NOT NULL THEN
                INSERT INTO grades (Student_ID, Subject_Code) VALUES (NEW.Student_ID, subject_code);
            END IF;
        END LOOP;
        CLOSE cur;
    END IF;
    RETURN NEW; -- You need to return the NEW row
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER insert_grades_on_registration AFTER INSERT ON student_profiles FOR EACH ROW
EXECUTE FUNCTION insert_grades_on_registration_func();


CREATE TABLE student_users (
  Student_ID SERIAL PRIMARY KEY,
  Email varchar(50) NOT NULL,
  Password varchar(255) NOT NULL
) ;




CREATE TABLE subjects (
  Subject_Code varchar(10) NOT NULL,
  Subject_Name varchar(100) NOT NULL,
  Professor varchar(100) NOT NULL
) ;

CREATE TABLE jwt (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    expiry TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 day'
);

INSERT INTO subjects (Subject_Code, Subject_Name, Professor) VALUES
('ADET211', 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES', 'Walfredo Garcia Santos'),
('AIIM211', 'ADVANCED INTERNET AND INTRANET MANAGEMENT W/LAB', 'Ihan Marc Ryan M Manota'),
('ALGO211', 'ALGORITHMS AND COMPLEXITY', 'Pepito Prietos Copernicus'),
('BUSM311', 'BUSINESS APPLICATION MANAGEMENT', 'Raymond Sinense Macatangga'),
('CGPR211', 'COMPUTER GRAPHICS PROGRAMMING W/ LAB', 'CELESPARA, ROMMEL PASTRANA'),
('COPH311', 'COMPUTATIONAL PHYSICS 1', 'Allan Dale Jerome Andres Deligero'),
('CRTW111', 'CRITICAL READING, WRITING AND THINKING', 'Kimberly Clyne Dimalanta Tuppil'),
('CRWT111', 'CRITICAL READING, WRITING AND THINKING', 'James Euric Acapuyan Llamado'),
('CSEL314', 'CS PROFESSIONAL ELECTIVE IV W/ LAB *', 'Pepito Prietos Copernicus'),
('CSIM412', 'CS PRACTICUM & INDUSTRY IMMERSION', 'Abegail S. Comandao'),
('CSTH411', 'CS THESIS I', 'Walfredo Garcia Santos'),
('CTIC311', 'CURRENT TRENTS IN COMPUTING', 'Londren Umel Velasco'),
('DBSA211', 'DATABASE SYSTEM ADMIN WITH LAB', 'Bernard Rompe Ambito'),
('DCAL211', 'DIFFERENTIAL CALCULUS', 'Allan Dale Jerome Andres Deligero'),
('DIMM212', 'DISCRETE MATHEMATICS 2', 'Allan Dale Jerome Andres Deligero'),
('DLOG111', 'DIGITAL LOGIC AND DESIGN', 'Ricardo Bagtas San Agustin'),
('EMCC314', 'ADVANCED 2D ANIMATION WITH LAB', 'EBRADO, ANTONIO M.'),
('EMCC315', 'LIGHTNING AND EFFECTS WITH LAB', 'CELESPARA, ROMMEL PASTRANA'),
('EMCC316', 'ADVANCED 3D ANIMATION AND SCRIPTING WITH LAB', 'D''ANGELO, DAVID AMANDY'),
('EMCC317', 'TEXTURE AND MAPPING  WITH LAB', 'CELESPARA, ROMMEL PASTRANA'),
('EMCC318', 'COMPOSITING AND RENDERING  WITH LAB', 'CELESPARA, ROMMEL PASTRANA'),
('EMCP311', 'EMC CAPSTONE PROJECT 1', 'MACATANGGA, RAYMOND SINENSE'),
('EMIM411', 'EMC PRACTICUM AND INDUSTRY IMMERSION', 'MACATANGGA, RAYMOND SINENSE'),
('FADD111', 'FREE HAND AND DIGITAL DRAWING', 'Grace Ann Delos Reyes Hinautan'),
('FLDN111', 'FUNDAMENTALS OF NETWORKING', 'Allan Dale Jerome Andres Deligero'),
('HCIN311', 'HUMAN COMPUTER INTERACTION I', 'Londren Umel Velasco'),
('HCIN312', 'HUMAN COMPUTER INTERACTION II', 'Antonio M. Ebrado'),
('IAAS311', 'INFORMATION ASSURANCE AND SECURITY 1  WITH LAB.', 'Ihan Marc Ryan M Manota'),
('IAAS312', 'INFORMATION ASSURANCE AND SECURITY II  WITH LAB', 'Pepito Prietos Copernicus'),
('IMGT211', 'INFORMATION MANAGEMENT W/LAB', 'Ferdinand Garrido Lucero'),
('IMMN111', 'INTERMEDIATE MICROECONOMICS', 'Dan Clarence Isidro Bacnat'),
('INPO211', 'INTRODUCTION TO OPERATING SYSTEMS AND SECURITY  WITH LAB', 'Londren Umel Velasco'),
('INPR111', 'INTERMEDIATE PROGRAMMING W/LAB', 'Ferdinand Garrido Lucero'),
('IPTC312', 'INTEGRATED PROGRAMMING TECHNOLOGIES  WITH LAB', 'Ricardo Bagtas San Agustin'),
('ITCP211', 'IT CAPSTONE PROJECT I', 'Ricardo Bagtas San Agustin'),
('ITCP212', 'IT CAPSTONE PROJECT II', 'Ricardo Bagtas San Agustin'),
('ITEL311', 'IT PROFESSIONAL ELECTIVE I W/LAB', 'Hans Kristensen Marquez Esguerra'),
('ITEL315', 'IT PROFESSIONAL ELECTIVE V W/LAB', 'Pepito Prietos Copernicus'),
('ITEL316', 'IT PROFESSIONAL ELECTIVE VI W/LAB', 'Walfredo Garcia Santos'),
('ITIM411', 'IT PRACTICUM AND INDUSTRY IMMERSION', 'Abegail S. Comandao'),
('LFAD211', 'LINUX FUNDAMENTALS AND ADMINISTRATION W/ LAB', 'Ferdinand Garrido Lucero'),
('MADS211', 'MULTIMEDIA AND DESIGN  WITH LAB', 'Antonio M. Ebrado'),
('MATM111', 'MATHEMATICS IN THE MODERN WORLD', 'Andres Dela Cruz Ilocto'),
('NETW211', 'NETWORKING I  WITH LAB', 'Allan Dale Jerome Andres Deligero'),
('NETW312', 'NETWORKING II  WITH LAB', 'Ihan Marc Ryan M Manota'),
('NSAD211', 'NETWORK SYSTEMS ADMIN  WITH LAB', 'Narvert Doyle Nuera Del Carmen'),
('OOPR212', 'OBJECT ORIENTED PROGRAMMING II  WITH LAB', 'Narvert Doyle Nuera Del Carmen'),
('PHED214', 'PHYSICAL EDUCATION 4', 'Honest Belon Bien'),
('PPGC111', 'PHILIPPINE POLITICS, GOVERNANCE AND CITIZENSHIP', 'Aira Rabano Elnar'),
('PROD311', 'DESIGN AND PRODUCTION PROCESS', 'CELESPARA, ROMMEL PASTRANA'),
('PTDA211', 'PRINCIPLES OF 2D ANIMATION W/ LAB', 'CELESPARA, ROMMEL PASTRANA'),
('PURC111', 'PURPOSIVE COMMUNICATION', 'Zenaida C Serrano'),
('QMET211', 'QUANTITATIVE METHODS', 'VELASCO, LONDREN UMEL'),
('QTDT211', 'QUALITY AND TESTING DEVELOPMENT W/LAB', 'Pepito Prietos Copernicus'),
('RIPH111', 'READINGS IN PHILIPPINE HISTORY', 'Aira Rabano Elnar'),
('SIAA211', 'SYSTEM INTEGRATION AND ARCHITECTURE I  WITH LAB', 'Narvert Doyle Nuera Del Carmen'),
('SIAA312', 'SYSTEM INTEGRATION AND ARCHITECTURE II  WITH LAB', 'Narvert Doyle Nuera Del Carmen'),
('SOFE312', 'SOFTWARE ENGINEERING II W/ LAB', 'Antonio M. Ebrado'),
('TDAN211', 'PRINCIPLES OF 3D ANIMATION  WITH LAB', 'D''ANGELO, DAVID AMANDY'),
('UUID211', 'USIBILITY, HCI AND USER INTERACTION DESIGN W/ LAB', 'CELESPARA, ROMMEL PASTRANA'),
('VRTS112', 'VERITAS ET MISERICORDIA 2', 'Mailine Fajardo Cambaling'),
('VRTS114', 'VERITAS ET MISERICORDIA 4', 'Mailine Fajardo Cambaling'),
('WBDV111', 'WEB DEVELOPMENT W/ LAB', 'Mary Joyce Rabuya Del Mundo');




CREATE TABLE transactions (
  Transaction_ID int NOT NULL,
  Student_ID varchar(50) DEFAULT NULL,
  Transaction_Date date DEFAULT NULL,
  Payment_Mode varchar(50) DEFAULT NULL,
  Amount decimal(10,2) DEFAULT NULL,
  Description text DEFAULT NULL
) ;




CREATE TABLE tuition_fees (
  Tuition_Fee_ID int NOT NULL,
  Student_ID varchar(50) NOT NULL,
  Class_ID varchar(50) DEFAULT NULL,
  Fee_Amount decimal(10,2) DEFAULT NULL
) ;



ALTER TABLE admin_users
  ADD PRIMARY KEY (num);


ALTER TABLE classes
  ADD PRIMARY KEY (Class_ID),
  ADD KEY fk_Course (Course),
  ADD KEY fk_Year_Level (Year_Level);


ALTER TABLE classsubjects
  ADD PRIMARY KEY (Class_ID,Subject_Code),
  ADD KEY fk_ClassSubjects_subject_code (Subject_Code);


CREATE INDEX idx_Class_ID ON class_sched (Class_ID);


ALTER TABLE comments
  ADD PRIMARY KEY (CommentID),
  ADD KEY PostID (PostID),
  ADD KEY Username (Username);


ALTER TABLE grades
  ADD PRIMARY KEY (Student_ID,Subject_Code),
  ADD KEY fk_Grades_Subject_Code (Subject_Code);


ALTER TABLE posts
  ADD PRIMARY KEY (PostID),
  ADD KEY Username (Username);


ALTER TABLE reactions
  ADD PRIMARY KEY (ReactionID),
  ADD KEY PostID (PostID),
  ADD KEY Username (Username);


ALTER TABLE reports
  ADD PRIMARY KEY (id);


ALTER TABLE studentenrollment
  ADD PRIMARY KEY (Student_ID,Class_ID),
  ADD KEY fk_StudentEnrollment_class_ID (Class_ID);


ALTER TABLE student_profiles
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY username (Username),
  ADD KEY fk_student_profile_user_id (Student_ID);


ALTER TABLE student_users
  ADD PRIMARY KEY (Student_ID),
  ADD UNIQUE KEY email (Email);


ALTER TABLE subjects
  ADD PRIMARY KEY (Subject_Code);


ALTER TABLE transactions
  ADD PRIMARY KEY (Transaction_ID),
  ADD KEY Student_ID (Student_ID);


ALTER TABLE tuition_fees
  ADD PRIMARY KEY (Tuition_Fee_ID),
  ADD KEY Student_ID (Student_ID),
  ADD KEY Class_ID (Class_ID);



ALTER TABLE comments
  MODIFY CommentID cast(11 as int) NOT NULL AUTO_INCREMENT;


ALTER TABLE posts
  MODIFY PostID cast(11 as int) NOT NULL AUTO_INCREMENT;


ALTER TABLE reactions
  MODIFY ReactionID cast(11 as int) NOT NULL AUTO_INCREMENT;


ALTER TABLE reports
  MODIFY id cast(11 as int) NOT NULL AUTO_INCREMENT;


ALTER TABLE student_profiles
  MODIFY id cast(11 as int) NOT NULL AUTO_INCREMENT;


ALTER TABLE transactions
  MODIFY Transaction_ID cast(11 as int) NOT NULL AUTO_INCREMENT;


ALTER TABLE tuition_fees
  MODIFY Tuition_Fee_ID cast(11 as int) NOT NULL AUTO_INCREMENT;



ALTER TABLE classsubjects
  ADD CONSTRAINT fk_ClassSubjects_class_id FOREIGN KEY (Class_ID) REFERENCES classes (Class_ID),
  ADD CONSTRAINT fk_ClassSubjects_subject_code FOREIGN KEY (Subject_Code) REFERENCES subjects (Subject_Code);


ALTER TABLE class_sched
  ADD CONSTRAINT class_sched_ibfk_1 FOREIGN KEY (Class_ID) REFERENCES classes (Class_ID);


ALTER TABLE comments
  ADD CONSTRAINT comments_ibfk_1 FOREIGN KEY (PostID) REFERENCES posts (PostID),
  ADD CONSTRAINT fk_comments_username FOREIGN KEY (Username) REFERENCES student_profiles (Username);


ALTER TABLE grades
  ADD CONSTRAINT fk_Grades_Student_ID FOREIGN KEY (Student_ID) REFERENCES student_users (Student_ID),
  ADD CONSTRAINT fk_Grades_Subject_Code FOREIGN KEY (Subject_Code) REFERENCES subjects (Subject_Code);


ALTER TABLE posts
  ADD CONSTRAINT fk_posts_username FOREIGN KEY (Username) REFERENCES student_profiles (Username);


ALTER TABLE reactions
  ADD CONSTRAINT fk_reactions_username FOREIGN KEY (Username) REFERENCES student_profiles (Username),
  ADD CONSTRAINT reactions_ibfk_1 FOREIGN KEY (PostID) REFERENCES posts (PostID);


ALTER TABLE studentenrollment
  ADD CONSTRAINT fk_StudentEnrollment_class_ID FOREIGN KEY (Class_ID) REFERENCES classes (Class_ID),
  ADD CONSTRAINT fk_StudentEnrollment_student_ID FOREIGN KEY (Student_ID) REFERENCES student_users (Student_ID);


ALTER TABLE student_profiles
  ADD CONSTRAINT fk_student_profile_user_id FOREIGN KEY (Student_ID) REFERENCES student_users (Student_ID),
  ADD CONSTRAINT student_profiles_ibfk_1 FOREIGN KEY (Student_ID) REFERENCES student_users (Student_ID);


ALTER TABLE transactions
  ADD CONSTRAINT transactions_ibfk_1 FOREIGN KEY (Student_ID) REFERENCES student_users (Student_ID);


ALTER TABLE tuition_fees
  ADD CONSTRAINT tuition_fees_ibfk_1 FOREIGN KEY (Student_ID) REFERENCES student_users (Student_ID),
  ADD CONSTRAINT tuition_fees_ibfk_2 FOREIGN KEY (Class_ID) REFERENCES classes (Class_ID);
COMMIT;

/* SQLINES DEMO *** ER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** ER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** ON_CONNECTION=@OLD_COLLATION_CONNECTION */;
