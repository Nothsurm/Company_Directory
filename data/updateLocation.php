<?php

// Executes when the employee form button with type="submit" is clicked

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

include("connect.php");

header('Content-Type: application/json; charset=UTF-8');

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

    $uniqueId = $_POST['hiddenData'];
	$locationName = $_POST['locationName'];

	$sql = $conn->prepare("UPDATE `location` SET `name`=? WHERE `id` = ?");

	$sql->bind_param('si', $locationName, $uniqueId);

	$sql->execute();

	$result = $sql->get_result();

	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}

	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

	echo json_encode($output);

?>