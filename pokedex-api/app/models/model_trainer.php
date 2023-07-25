<?php

class ModelTrainer{
    
    private $host = DB_HOST;
    private $user = DB_USER;
    private $password = DB_PASSWORD;
    private $db_name = DB_NAME;

    private $conn_handler; 

    public function __construct(){
        $dsn = 'mysql:host='.$this->host.';dbname='.$this->db_name;
        $opts = array(
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        );

        $this->conn_handler = new PDO($dsn,$this->user,$this->password,$opts);
        $this->conn_handler->exec('set names utf8');
    }

    public function getTrainer($username, $password){
        // get trainer info in login form
    $stmt = $this->conn_handler->prepare("SELECT id FROM entrenadores WHERE nombre = :username AND contraseña = :password");
    $stmt->execute(array(
        'username' => $username,
        'password' => $password
    ));
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(!empty($result)){
        $id_trainer = reset($result)['id'];

        $stmt = $this->conn_handler->prepare("SELECT slot1, slot2, slot3, slot4, slot5, slot6 FROM plantillas WHERE id_entrenador = :id_trainer");
        $stmt->execute(array(
            'id_trainer' => $id_trainer
        ));
        $team = $stmt->fetch(PDO::FETCH_ASSOC);

        return $team;
    }else{
        return "Nombre de usuario o contraseña incorrectos";
    }
    }

    public function insertTeam($username) {
        // Get trainer ID
        $stmt = $this->conn_handler->prepare("SELECT id FROM entrenadores WHERE nombre = :username");
        $stmt->execute(array(
            'username' => $username
        ));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($result) {
            $id_trainer = $result['id'];
    
            // Insert into plantillas
            $stmt = $this->conn_handler->prepare("INSERT INTO plantillas (id_entrenador, slot1, slot2, slot3, slot4, slot5, slot6) VALUES (:id_trainer, NULL, NULL, NULL, NULL, NULL, NULL)");
            $stmt->execute(array(
                'id_trainer' => $id_trainer
            ));
        }
    }

    public function setTrainer($username, $password){
        // Check if user exists
        $stmt = $this->conn_handler->prepare("SELECT id FROM entrenadores WHERE nombre = :username");
        $stmt->execute(array(
            'username' => $username,
        ));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if(empty($result)){
            // If user doesn't exist
            $stmt = $this->conn_handler->prepare("INSERT INTO entrenadores (nombre, contraseña) VALUES (:username, :password)");
            $stmt->execute(array(
                'username' => $username,
                'password' => $password
            ));
            $this->insertTeam($username);
            return "Usuario creado correctamente";
        } else {
            // If user exists
            return "El usuario ya existe";
        }
    }
    

}