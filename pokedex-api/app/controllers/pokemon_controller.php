<?php
require_once '../models/model_pokemon.php';
require_once '../config/config.php';

class PokemonController{

  private $alert;

    public function __construct(){
        if(isset($_SESSION['alert'])){
          $this->alert = $_SESSION['alert'];
        }else{
          $this->alert = '';
        }
    }
    
    public function handleRequest() {
      $data = json_decode(file_get_contents("php://input"), true);
      
      $method = $data['method'];
  
      switch ($method) {
        case 'generateList':
          $response = $this->generateList();
          break;
  
        case 'show':
          $id = $data['id'];
          $response = $this->show($id);
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

    // Returns a list with all pokemon data
    public function generateList(){
        $alert = $this->alert;
        $pokemon = new ModelPokemon();
        $data = $pokemon->getAllPokemons();
    $response = array(
      'status' => 'success',
      'message' => 'Petición GET recibida correctamente',
      'data' => $data
    );
    header('Content-Type: application/json');
    return $response;
        $_SESSION['alert'] = '';
    }

    // This function is unused yet. It shows in detail data from a specific pokemon
    public function show($id){
        $alert = $this->alert;
        if(ctype_digit($id)){
            $pokemon = new ModelPokemon();
            $data = $pokemon->getPokemon($id);
    $response = array(
      'status' => 'success',
      'message' => 'Petición GET recibida correctamente',
      'data' => $data
    );
    header('Content-Type: application/json');
    return $response;
        }else{
          throw new Exception('El parámetro no es adecuado');
        }
    }
    }
    $controller = new PokemonController();
    $controller->handleRequest();
    