<?php
echo "<p> Thank you {$_POST["full_name"]}. </p>";
echo "<p> Your comments were sent from the email: {$_POST["email"]} with a subject of {$_POST["subject"]} </p>";
//print_r($_POST);
?>