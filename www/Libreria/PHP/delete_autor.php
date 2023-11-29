<?php

// Incluir un fichero para acceso a la base de datos

include('config.php');


$conexion = obtenerConexion();

$JSON_libro = $_POST['author'];

$autor = json_decode($JSON_libro);





$sql = "DELETE FROM `author`  WHERE `authorId` = $autor;";

// var_dump($sql);
// die();

$resultado = mysqli_query($conexion, $sql);

// var_dump($resultado);
// die();


if (!$resultado) { // Si hay error
    if (mysqli_errno($conexion) == 1062)
        // responder($datos, $error, $mensaje, $conexion)
        responder(null, true, "El autor ya estaba eliminado", $conexion);
    else
        responder(null, true, "Error al eliminar el autor: " . mysqli_error($conexion) . "--" . mysqli_errno($conexion), $conexion);
} else {
    responder(null, false, "Autor eliminado con éxito", $conexion);
}

?>