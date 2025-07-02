<?php
    session_start();    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    require_once "db.php";
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['username']) || empty(trim($data['username'])) ||
        !isset($data['password']) || empty($data['password'])
    ){
        http_response_code(400);
        echo json_encode(["error" => "Nazwa użytkownika i hasło są wymagane"]);
        exit;
    }
    $username = trim($data['username']);
    $password = $data['password'];
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(["error" => "Nieprawidłowa nazwa użytkownika lub hasło"]);
        exit;
    }
    echo json_encode([
        "message" => "Zalogowano pomyślnie",
        "user" => [
            "user_id" => $user['user_id'],
            "username" => $user['username']
        ]
    ]);
    $_SESSION['user_id'] = $user['user_id'];
    $_SESSION['username'] = $user['username'];
?>