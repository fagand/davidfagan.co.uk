<?php
$conn = new mysqli('localhost', 'root', 'root', 'search');
$name=$_POST["name"];
$ctgr=$_POST["ctgr"];
$sql="UPDATE searches set search='$name' where id=1";
if($conn->query($sql)===TRUE){
    echo "DATA updated";
}
?>