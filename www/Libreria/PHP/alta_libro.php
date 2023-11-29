<?php

// Incluir un fichero para acceso a la base de datos

include('config.php');


$conexion = obtenerConexion();

$JSON_libro = $_POST['books'];

$libro = json_decode($JSON_libro);



$nombre = $libro->_bookTitle;
$fechaPublicacion = $libro->_bookPublished;
$idAutor = $libro->_bookIdAutor;





$sql = "INSERT INTO books VALUES (null, '$nombre' ,  '$fechaPublicacion' , $idAutor)";

// var_dump($sql);
// die();


$resultado = mysqli_query($conexion, $sql);

if (!$resultado) { // Si hay error
    if (mysqli_errno($conexion) == 1062)
        // responder($datos, $error, $mensaje, $conexion)
        responder(null, true, "Libro ya está registrado", $conexion);
    else
        responder(null, true, "Error al insertar el libro: " . mysqli_error($conexion) . "--" . mysqli_errno($conexion), $conexion);
} else {
    responder(null, false, "Libro registrado con éxito", $conexion);
}


?>