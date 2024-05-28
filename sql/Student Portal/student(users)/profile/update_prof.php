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

            $conn->begin_transaction();

            $sql = "UPDATE student_profiles 
                    SET First_Name='$fname', Middle_Name='$mname', Last_Name='$lname', Course='$course', Year_Level='$yearlevel', 
                        Gender='$gender', Date_Of_Birth='$dob', Nationality='$nationality', Marital_Status='$maritalStatus', 
                        Contact_No='$cnumber', Street='$st', Brgy='$brgy', City='$city', Country='$country', Zipcode='$zipcode', 
                        Profile_Pic='$targetFilePath' 
                    WHERE Student_ID='$stdnum'";

            if ($conn->query($sql) === TRUE) {
                $class_id = null;
                if ($yearlevel == '1st Year') {
                    if ($course == 'Bachelor of Science in Computer Science') {
                        $class_id = '1styear_cs';
                    } elseif ($course == 'Bachelor of Science in Information Technology') {
                        $class_id = '1styear_it';
                    } elseif ($course == 'Bachelor of Science in Entertainment and Multimedia Computing') {
                        $class_id = '1styear_emc';
                    }
                } elseif ($yearlevel == '2nd Year') {
                    if ($course == 'Bachelor of Science in Computer Science') {
                        $class_id = '2ndyear_cs';
                    } elseif ($course == 'Bachelor of Science in Information Technology') {
                        $class_id = '2ndyear_it';
                    } elseif ($course == 'Bachelor of Science in Entertainment and Multimedia Computing') {
                        $class_id = '2ndyear_emc';
                    }
                } elseif ($yearlevel == '3rd Year') {
                    if ($course == 'Bachelor of Science in Computer Science') {
                        $class_id = '3rdyear_cs';
                    } elseif ($course == 'Bachelor of Science in Information Technology') {
                        $class_id = '3rdyear_it';
                    } elseif ($course == 'Bachelor of Science in Entertainment and Multimedia Computing') {
                        $class_id = '3rdyear_emc';
                    }
                } elseif ($yearlevel == '4th Year') {
                    if ($course == 'Bachelor of Science in Computer Science') {
                        $class_id = '4thyear_cs';
                    } elseif ($course == 'Bachelor of Science in Information Technology') {
                        $class_id = '4thyear_it';
                    } elseif ($course == 'Bachelor of Science in Entertainment and Multimedia Computing') {
                        $class_id = '4thyear_emc';
                    }
                }

                if ($class_id !== null) {
                    $sql = "UPDATE studentenrollment SET Class_ID='$class_id' WHERE Student_ID='$stdnum'";
                    if ($conn->query($sql) === TRUE) {
                        $sql = "SELECT COUNT(*) AS num_subjects FROM classsubjects WHERE Class_ID='$class_id'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            $row = $result->fetch_assoc();
                            $num_subjects = $row['num_subjects'];
                            $fee_amount = $num_subjects * 45000;

                            $sql = "UPDATE tuition_fees SET Fee_Amount='$fee_amount' WHERE Student_ID='$stdnum' AND Class_ID='$class_id'";
                            if ($conn->query($sql) === TRUE) {
                                $conn->commit();
                                header("Location: profile.html");
                                exit();
                            } else {
                                $conn->rollback();
                                echo "Error updating tuition fee: " . $conn->error;
                            }
                        } else {
                            $conn->rollback();
                            echo "Error retrieving number of subjects: " . $conn->error;
                        }
                    } else {
                        $conn->rollback();
                        echo "Error updating class assignment: " . $conn->error;
                    }
                } else {
                    $conn->rollback();
                    echo "Error: Invalid class assignment. Year Level: $yearlevel, Course: $course";
                }
            } else {
                $conn->rollback();
                echo "Error updating profile: " . $conn->error;
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
