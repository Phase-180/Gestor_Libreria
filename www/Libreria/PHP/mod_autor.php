<?php

// Incluir un fichero para acceso a la base de datos

include('config.php');


$conexion = obtenerConexion();

$JSON_libro = $_POST['author'];
$autor = json_decode($JSON_libro);



$id = $autor->_authorId;
$nombre = $autor->_authorNname;
$fechaNacimiento = $autor->_authorBirhdate;
$premio = $autor->_authorPremio;
$nacionalidad = $autor->_authorNacionalidad;



if ($premio === false) {
    
    $premio = 0;
}

$sql = "UPDATE `author` SET `authorNname`='$nombre',`authorBirhdate`='$fechaNacimiento',`authorPremio`= $premio,`authorNacionalidad`='$nacionalidad' WHERE `authorId`=$id ";


// var_dump($sql);
// die();


$resultado = mysqli_query($conexion, $sql);

if (!$resultado) { // Si hay error
    if (mysqli_errno($conexion) == 1062)
        // responder($datos, $error, $mensaje, $conexion)
        responder(null, true, "Autor ya está registrado", $conexion);
    else
        responder(null, true, "Error al modificar el autor: " . mysqli_error($conexion) . "--" . mysqli_errno($conexion), $conexion);
} else {
    responder(null, false, "Autor modificado con éxito", $conexion);
}


?>