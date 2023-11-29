<?php

// Incluir un fichero para acceso a la base de datos

include('config.php');


$conexion = obtenerConexion();

$JSON_autor = $_POST['author'];

$autor = json_decode($JSON_autor);

$nombre = $autor->_authorNname;

$authorBirthdate = date('Y-m-d', strtotime($autor->_authorBirhdate));
// $authorBirthdate = $authorObject->_authorBirhdate;

// var_dump($authorBirthdate);
// die();



$premio = $autor->_authorPremio;
$nacionalidad = $autor->_authorNacionalidad;



if ($premio === false) {
    
    $premio = 0;
}else {
    
    $premio = 1;
    
}


$sql = "INSERT INTO author VALUES (null, '$nombre' ,  '$authorBirthdate' , '$premio' , '$nacionalidad' )";




$resultado = mysqli_query($conexion, $sql);


if (!$resultado) { // Si hay error
    if (mysqli_errno($conexion) == 1062)
        // responder($datos, $error, $mensaje, $conexion)
        responder(null, true, "Autor ya está registrado", $conexion);
    else
        responder(null, true, "Error al insertar el autor: " . mysqli_error($conexion) . "--" . mysqli_errno($conexion), $conexion);
} else {
    responder(null, false, "Autor registrado con éxito", $conexion);
}

?>