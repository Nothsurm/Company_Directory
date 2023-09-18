<?php

//Executes before the modal is visible

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("connect.php");

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

    $editId = $_REQUEST['updateLocation'];

    $prepared = $conn->prepare("SELECT id, name FROM location WHERE id = ?");

    $prepared->bind_param('i', $editId);

    $prepared->execute();

    $result = $prepared->get_result();

    $data = [];

    while ($row = mysqli_fetch_assoc($result)) {

    array_push($data, $row);

    }

    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;

	echo json_encode($output); 