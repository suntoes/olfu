<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST['fname'];
    $mname = $_POST['mname'];
    $lname = $_POST['lname'];
    $stdnum = $_POST['stdnum'];
    $username = $_POST['username'];
    $course = $_POST['course'];
    $yearlevel = $_POST['year_level'];
    $gender = $_POST['gender-input'];
    $dob = $_POST['dob'];
    $nationality = $_POST['nationality'];
    $maritalStatus = $_POST['marital-status'];
    $cnumber = $_POST['cnumber'];
    $st = $_POST['st'];
    $brgy = $_POST['brgy'];
    $city = $_POST['city'];
    $country = $_POST['country'];
    $zipcode = $_POST['zipcode'];

    $profpicName = $_FILES['pic']['name'];
    $profpicTmpName = $_FILES['pic']['tmp_name'];
    $profpicSize = $_FILES['pic']['size'];
    $profpicError = $_FILES['pic']['error'];

    if ($profpicError === UPLOAD_ERR_OK) {
        $uploadDirectory = '../uploads/';
        $targetFilePath = $uploadDirectory . basename($profpicName);
        if (move_uploaded_file($profpicTmpName, $targetFilePath)) {
            $conn = new mysqli("localhost", "root", "", "student_portal");
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            $sql = "INSERT INTO student_profiles (First_Name, Middle_Name, Last_Name, Student_ID, Username, Course, Year_Level, Gender, Date_Of_Birth, Nationality, Marital_Status, Contact_No, Street, Brgy, City, Country, Zipcode, Profile_Pic) 
            VALUES ('$fname', '$mname', '$lname', '$stdnum', '$username', '$course', '$yearlevel', '$gender', '$dob', '$nationality', '$maritalStatus', '$cnumber', '$st', '$brgy', '$city', '$country', '$zipcode', '$targetFilePath')";
            if ($conn->query($sql) === TRUE) {
                header("Location: ../log-reg/index.html");
                exit();
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            $conn->close();
        } else {
            echo "Error uploading file";
        }
    } else {
        switch ($profpicError) {
            case UPLOAD_ERR_INI_SIZE:
                echo "The uploaded file exceeds the upload_max_filesize directive in php.ini";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                echo "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
                break;
            case UPLOAD_ERR_PARTIAL:
                echo "The uploaded file was only partially uploaded";
                break;
            case UPLOAD_ERR_NO_FILE:
                echo "No file was uploaded";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                echo "Missing a temporary folder";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                echo "Failed to write file to disk";
                break;
            case UPLOAD_ERR_EXTENSION:
                echo "A PHP extension stopped the file upload";
                break;
            default:
                echo "Unknown upload error";
                break;
    }
}
}
?>