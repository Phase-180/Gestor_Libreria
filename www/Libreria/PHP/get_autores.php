
<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = obtenerConexion();


$sql = "SELECT authorId,authorNname,authorBirhdate,authorPremio,authorNacionalidad FROM author;";

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

