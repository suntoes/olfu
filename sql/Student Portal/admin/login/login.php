<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        $conn = new mysqli("localhost", "root", "", "student_portal");
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM admin_users WHERE username = '$username' AND password = '$password'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            session_start();
            $_SESSION['email'] = $email;
            header("Location: ../home/home.html");
            exit();
        } else {
            echo "Invalid user";
        }

        $conn->close();
    }
?>