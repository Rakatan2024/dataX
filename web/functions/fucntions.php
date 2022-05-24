<?php
$mysqli = false;
fucntion connectDB () {
 global $mysqli;
 $mysqli = new mysqli ("localhost", "root", "", "royale91_idk" );
 $mysqli->query("SET NAMES 'utf-8'");

 }
function closeDB () {
   global $mysqli;
   $mysqli -> close ();
}

?>