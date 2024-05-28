<?php
    session_start();

    if (!isset($_SESSION['email'])) {
        header("Location: login.html");
        exit();
    }

    $email = $_SESSION['email'];

    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql_student = "SELECT * FROM student_users WHERE email = '$email'";
    $result_student = $conn->query($sql_student);

    if ($result_student->num_rows > 0) {
        $row_student = $result_student->fetch_assoc();
        $student_id = $row_student['Student_ID'];

        $sql_class_id = "SELECT Class_ID FROM studentenrollment WHERE Student_ID = '$student_id'";
        $result_class_id = $conn->query($sql_class_id);

        if ($result_class_id->num_rows > 0) {
            $row_class_id = $result_class_id->fetch_assoc();
            $class_id = $row_class_id['Class_ID'];

            $sql_subject_code = "SELECT Subject_Code FROM classsubjects WHERE Class_ID = '$class_id'";
            $result_subject_code = $conn->query($sql_subject_code);

            if ($result_subject_code->num_rows > 0) {
                $subject_codes = array();

                while ($row_subject_code = $result_subject_code->fetch_assoc()) {
                    $subject_codes[] = $row_subject_code['Subject_Code'];
                }

                echo "<h2>Your Grades</h2>";
                echo "<table>";
                echo "<thead>";
                echo "<tr>";
                echo "<th>Subject Code</th>";
                echo "<th>Subject Name</th>";
                echo "<th>Professor</th>";
                echo "<th>Grade</th>";
                echo "</tr>";
                echo "</thead>";
                echo "<tbody>";

                foreach ($subject_codes as $subject_code) {
                    $sql_subject_info = "SELECT Subject_Name, Professor FROM subjects WHERE Subject_Code = '$subject_code'";
                    $result_subject_info = $conn->query($sql_subject_info);

                    if ($result_subject_info->num_rows > 0) {
                        $row_subject_info = $result_subject_info->fetch_assoc();
                        $subject_name = $row_subject_info['Subject_Name'];
                        $professor = $row_subject_info['Professor'];
                        $grade = "YourGradeHere"; // Yung admin nalang yung maglalagay ng grades

                        echo "<tr>";
                        echo "<td>" . $subject_code . "</td>";
                        echo "<td>" . $subject_name . "</td>";
                        echo "<td>" . $professor . "</td>";
                        echo "<td>" . $grade . "</td>";
                        echo "</tr>";
                    }
                }

                echo "</tbody>";
                echo "</table>";
            } else {
                echo "No subjects found for this student's class.";
            }
        } else {
            echo "No class found for the student's enrollment.";
        }
    } else {
        echo "Student not found.";
    }

    $conn->close();
?>
