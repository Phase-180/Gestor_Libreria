<?php

// Incluir un fichero para acceso a la base de datos

include('config.php');


$conexion = obtenerConexion();

$JSON_libro = $_POST['books'];

$libro = json_decode($JSON_libro);





$sql = "DELETE FROM `books`  WHERE `bookId` = $libro;";

// var_dump($sql);
// die();


$resultado = mysqli_query($conexion, $sql);



if (!$resultado) { // Si hay error
    if (mysqli_errno($conexion) == 1062)
        // responder($datos, $error, $mensaje, $conexion)
        responder(null, true, "El libro ya estaba eliminado", $conexion);
    else
        responder(null, true, "Error al elimianr el libro: " . mysqli_error($conexion) . "--" . mysqli_errno($conexion), $conexion);
} else {
    responder(null, false, "Libro eliminado con éxito", $conexion);
}

?>