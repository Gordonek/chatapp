<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    require_once("db.php");
    $data = json_decode(file_get_contents("php://input"), true);
    if(!isset($data['user_id']) || !isset($data["content"])){
        echo json_encode(["error" => "brak dancych"]);
        exit;
    }
    $user_id = $data['user_id'];
    $content = $data["content"];
    $stmt = $pdo->prepare("INSERT INTO messages (sender_id, text) VALUES (?, ?)");
    $stmt->execute([$user_id, $content]);
    echo json_encode(["status" => "ok"]);
?>