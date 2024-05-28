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

        $sql_profile = "SELECT * FROM student_profiles WHERE Student_ID = '$student_id'";
        $result_profile = $conn->query($sql_profile);

        if ($result_profile->num_rows > 0) {
            $row_profile = $result_profile->fetch_assoc();
            $year_level = $row_profile['Year_Level'];
            $course = $row_profile['Course'];

            $sql_class_id = "SELECT Class_ID FROM classes WHERE Year_Level = '$year_level' AND Course = '$course'";
            $result_class_id = $conn->query($sql_class_id);
            
            if ($result_class_id->num_rows > 0) {
                $row_class_id = $result_class_id->fetch_assoc();
                $class_id = $row_class_id['Class_ID'];

                $sql_subjects = "SELECT cs.Subject_Code, s.Subject_Name, s.Professor
                                FROM class_sched cs 
                                JOIN subjects s ON cs.Subject_Code = s.Subject_Code 
                                WHERE cs.Class_ID = '$class_id'";
                $result_subjects = $conn->query($sql_subjects);

                if ($result_subjects->num_rows > 0) {
                    echo "<table>";
                    echo "<thead>";
                    echo "<tr>";
                    echo "<th>Subject Code</th>";
                    echo "<th>Subject Name</th>";
                    echo "<th>Professor</th>";
                    echo "</tr>";
                    echo "</thead>";
                    echo "<tbody>";

                    while ($row_subject = $result_subjects->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . $row_subject['Subject_Code'] . "</td>";
                        echo "<td>" . $row_subject['Subject_Name'] . "</td>";
                        echo "<td>" . $row_subject['Professor'] . "</td>";
                        echo "</tr>";
                    }

                    echo "</tbody>";
                    echo "</table>";
                } else {
                    echo "No subjects found for this class.";
                }
            } else {
                echo "No class found for the student's year level and course.";
            }
        } else {
            echo "Student's profile information not found.";
        }
    } else {
        echo "Student not found.";
    }

    $conn->close();
?>
