<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    require_once "db.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if(!isset($data['username']) || empty(trim($data['username'])) ||
       !isset($data['password']) || empty($data['password']))
    {
        http_response_code(400);
        echo json_encode(["error" => "Wszystkie pola są wymagane"]);
        exit;
    }

    $username = trim($data['username']);
    $password = $data['password'];

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("SELECT user_id FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(["error" => "Nazwa użytkownika jest już zajęta"]);
            exit;
        }
        $stmt = $pdo->prepare("INSERT INTO users (username, password_hash) VALUES (:username, :password_hash)");
        $stmt->execute(['username' => $username, 'password_hash' => $password_hash]);
        http_response_code(201);
        echo json_encode(["message" => "Rejestracja powiodła się"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Błąd serwera: " . $e->getMessage()]);
        exit;
    }
?>