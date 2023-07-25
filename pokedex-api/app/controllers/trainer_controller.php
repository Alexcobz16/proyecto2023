<?php 
require_once '../models/model_trainer.php';
require_once '../config/config.php';
class TrainerController {
  private $alert;

  public function __construct() {
    if (isset($_SESSION['alert'])) {
      $this->alert = $_SESSION['alert'];
    } else {
      $this->alert = '';
    }
  }

  public function handleRequest() {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $method = $data['method'];

    switch ($method) {
      case 'register':
        $username = $data['username'];
        $password = $data['password'];
        $response = $this->register($username, $password);
        break;

      case 'login':
        $username = $data['username'];
        $password = $data['password'];
        $response = $this->login($username, $password);
        break;

      default:
        $response = array(
          'status' => 'error',
          'message' => 'Función no válida'
        );
        break;
    }

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');
    echo json_encode($response);
  }

  private function register($username, $password) {
    $alert = $this->alert;
    $trainer = new ModelTrainer();
    $data = $trainer->setTrainer($username, $password);

    if($data === "Usuario creado correctamente"){
      // If user is created correctly enters here
      $response = array(
        'status' => 'success',
      );
    }else{
      // If is there any error shows error in app
      $response = array(
        'status' => 'error',
        'message' => $data
      );
    }

    return $response;
  }

  private function login($username, $password) {
    $alert = $this->alert;
    $trainer = new ModelTrainer();
    $data = $trainer->getTrainer($username, $password);
    // If is there any error enters here
    if($data === "Nombre de usuario o contraseña incorrectos"){
      $response = array(
        'status' => 'error',
        'message' => $data
      );
    }else{
      // Team is unused yet. It returns user´s on-building team
      $response = array(
        'status' => 'success',
        'team' => $data
      );
    }

    return $response;
  }
}

$controller = new TrainerController();
$controller->handleRequest();

?>
