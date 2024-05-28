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
    $sql_student = "SELECT student_id, first_name, middle_name, last_name FROM student_profiles WHERE Student_ID = (SELECT Student_ID FROM student_users WHERE email = '$email')";
    $result_student = $conn->query($sql_student);

    $row_student = $result_student->fetch_assoc();
    $student_id = $row_student['student_id'];
    $student_name = $row_student['first_name'] . " " . $row_student['middle_name'] . " " . $row_student['last_name'];
    
    $sql_transactions = "SELECT * FROM transactions WHERE Student_ID = '$student_id'";
    $result_transactions = $conn->query($sql_transactions);
    $sql_tuition_fees = "SELECT tf.Student_ID, tf.Class_ID, tf.Fee_Amount FROM tuition_fees tf INNER JOIN studentenrollment se ON tf.Student_ID = se.Student_ID WHERE tf.Student_ID = '$student_id'";
    $result_tuition_fees = $conn->query($sql_tuition_fees);

    echo "<div class='container'>";
    echo "<table>";
    echo "<th>Name</th><th>Transaction Date</th><th>Payment Mode</th><th>Amount</th><th>Description</th></tr>";
    
    while($row_transactions = $result_transactions->fetch_assoc()) {
        echo "<tr>";
        echo "<td>".$student_name."</td>";
        echo "<td>".$row_transactions['Transaction_Date']."</td>";
        echo "<td>".$row_transactions['Payment_Mode']."</td>";
        echo "<td>".$row_transactions['Amount']."</td>";
        echo "<td>".$row_transactions['Description']."</td>";
        echo "</tr>";
    }

    echo "</table>";
    echo "<h2>Tuition Fees</h2>";
    echo "<table>";
    echo "<tr><th>Name</th><th>Fee Amount</th></tr>";
    while($row_tuition_fees = $result_tuition_fees->fetch_assoc()) {
        echo "<tr>";
        echo "<td>".$student_name."</td>";
        echo "<td>".$row_tuition_fees['Fee_Amount']."</td>";
        echo "</tr>";
    }
    echo "</table>";

$conn->close();
?>
