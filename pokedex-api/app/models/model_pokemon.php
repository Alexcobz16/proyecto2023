<?php

class ModelPokemon{
    // This create connection to database
    private $host = DB_HOST;
    private $user = DB_USER;
    private $password = DB_PASSWORD;
    private $db_name = DB_NAME;

    private $conn_handler; // Executes SQL queries

    public function __construct(){
        $dsn = 'mysql:host='.$this->host.';dbname='.$this->db_name;
        $opts = array(
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        );

        $this->conn_handler = new PDO($dsn,$this->user,$this->password,$opts);
        $this->conn_handler->exec('set names utf8');
    }
    // Returns all pokemon data to app
    public function getAllPokemons(){
        $result = $this->conn_handler->query('SELECT pokemon.id, pokemon.nombre, tipos1.tipo AS tipo_1, tipos2.tipo AS tipo_2, pokemon.url_imagen, stats.PS, stats.ATK, stats.DEF, stats.VEL, stats.ATK_ESP, stats.DEF_ESP FROM pokemon INNER JOIN tipos AS tipos1 ON pokemon.tipo_1 = tipos1.id LEFT JOIN tipos AS tipos2 ON pokemon.tipo_2 = tipos2.id INNER JOIN stats ON pokemon.id = stats.id_pokemon ORDER BY pokemon.id')->fetchAll(PDO::FETCH_ASSOC);
        return $result;       
    }

    // Unused yet. It returns more details about one pokemon
    public function getPokemon($id){
        $result = $this->conn_handler->query('SELECT pokemon.id, pokemon.nombre, pokemon.descripcion, tipos1.tipo AS tipo_1, tipos2.tipo AS tipo_2, pokemon.url_imagen, stats.PS, stats.ATK, stats.DEF, stats.VEL, stats.ATK_ESP, stats.DEF_ESP FROM pokemon INNER JOIN tipos AS tipos1 ON pokemon.tipo_1 = tipos1.id LEFT JOIN tipos AS tipos2 ON pokemon.tipo_2 = tipos2.id INNER JOIN stats ON pokemon.id = stats.id_pokemon WHERE pokemon.id = \''.$id.'\' ORDER BY pokemon.id')->fetchAll(PDO::FETCH_ASSOC);
        return reset($result);
    }
}
