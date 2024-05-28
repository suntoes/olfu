<?php
    session_start();
    $conn = new mysqli("localhost", "root", "", "student_portal");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        $postID = $data['postID'];
        $reactionType = $data['reactionType'];
        $username = $data['username'];

        $sql_check_reaction = "SELECT * FROM reactions WHERE PostID = '$postID' AND Username = '$username'";
        $result_check_reaction = $conn->query($sql_check_reaction);

        if ($result_check_reaction->num_rows > 0) {
            $row = $result_check_reaction->fetch_assoc();
            $existing_reaction = $row['ReactionType'];
            if ($existing_reaction == $reactionType) {
                $sql_remove_reaction = "DELETE FROM reactions WHERE PostID = '$postID' AND Username = '$username'";
                if ($conn->query($sql_remove_reaction) === TRUE) {
                    updateReactionCount($conn, $postID, $reactionType, 'remove');
                    echo json_encode(["success" => true]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
                }
            } else {
                $sql_update_reaction = "UPDATE reactions SET ReactionType = '$reactionType' WHERE PostID = '$postID' AND Username = '$username'";
                if ($conn->query($sql_update_reaction) === TRUE) {
                    updateReactionCount($conn, $postID, $existing_reaction, 'remove');
                    updateReactionCount($conn, $postID, $reactionType, 'add');
                    echo json_encode(["success" => true]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
                }
            }
        } else {
            $sql_insert_reaction = "INSERT INTO reactions (PostID, Username, ReactionType) VALUES ('$postID', '$username', '$reactionType')";
            if ($conn->query($sql_insert_reaction) === TRUE) {
                updateReactionCount($conn, $postID, $reactionType, 'add');
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
            }
        }
        exit();
    }

    function updateReactionCount($conn, $postID, $reactionType, $operation) {
        $column = ($reactionType == 'like') ? 'LikesCount' : 'DislikesCount';
        if ($operation == 'add') {
            $sql = "UPDATE posts SET $column = $column + 1 WHERE PostID = '$postID'";
        } else {
            $sql = "UPDATE posts SET $column = $column - 1 WHERE PostID = '$postID'";
        }
        $conn->query($sql);
    }
?>
