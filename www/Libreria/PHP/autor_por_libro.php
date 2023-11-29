<?php

// Incluir un fichero para acceso a la base de datos

include('config.php');


$conexion = obtenerConexion();

$JSON_libro = $_GET['books'];


$libro = json_decode($JSON_libro);





$sql = "SELECT authorId,authorNname,authorBirhdate,authorPremio,authorNacionalidad FROM author  WHERE author.authorId IN ( SELECT booksIdAutor FROM books WHERE bookId = $libro )";

// var_dump($sql);
// die();


$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

if (!$resultado) {
    responder(null, true, "Error al recuperar los cursos: " . mysqli_error($conexion), $conexion);
} else {

    $datos = []; // Creamos un array vacío
    //Recorremos los registros que ha devuelto la base de datos
    while ($fila = mysqli_fetch_assoc($resultado)) {
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $datos[] = $fila;
    }

    responder($datos, false, "Datos recuperados" ,$conexion);
}
?>