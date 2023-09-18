<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

include 'connect.php';

if (mysqli_connect_errno()) {
		
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;

}	

$firstName = $_REQUEST['firstName'];
$lastName = $_REQUEST['lastName'];
$jobTitle = $_REQUEST['jobTitle'];
$email = $_REQUEST['email'];
$department = $_REQUEST['department'];

$prepared = $conn->prepare("INSERT INTO personnel(firstName, lastName, jobTitle, email, departmentID) VALUES(?,?,?,?,?)");

$prepared->bind_param("ssssi", $firstName, $lastName, $jobTitle, $email, $department); //Use "s" for string

$prepared->execute();

$result = $prepared->get_result();

if (!$result) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output); 

    exit;

}

echo $result;

?>