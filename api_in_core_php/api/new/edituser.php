<?php

//Headers for Api Content-Type and Access-Control
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

//Database Details
$host = "localhost";
$username = "root";
$password = "";
$dbname = "hospital";
//Connecting to the Database
$conn = new mysqli($host, $username, $password, $dbname);
//Checking if connection is successfull or not
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//Checking if user provided all required fields
if (!isset($_POST['NHSNumber'])) {
    echo json_encode(array('message' => 'Missing NHSNumber!', 'param' => 'NHSNumber'));
    exit();
}

//Saving provided data in variables

$nhsnumber = $_POST['NHSNumber'];

//Validations

if (!is_numeric($nhsnumber)) {
    echo json_encode(array('message' => 'NHSNumber should be in digits !', 'param' => 'NHSNumber'));
    exit();
}

if (!strlen($nhsnumber) == 10) {
    echo json_encode(array('message' => 'NHSNumber should be in digits !', 'param' => 'NHSNumber'));
    exit();
}

if (isset($_POST['Postcode'])) {
    $postalcode = $_POST['Postcode'];
    if (!is_numeric($postalcode)) {
        echo json_encode(array('message' => 'Postal Code should be numeric !', 'param' => 'PostalCode'));
        exit();
    }
}else{
    echo json_encode(array('message' => 'Missing Postcode!', 'param' => 'Postcode'));
    exit;
}

//Query to check if patient exist which user is trying to edit
$checkSql = "SELECT COUNT(*) as count FROM patients WHERE NHSNumber = '$nhsnumber'";
//Executing the check Query
$checkResult = $conn->query($checkSql);

$row = $checkResult->fetch_assoc();
$count = $row['count'];
//Checking if appointment exist
if ($count > 0) {
    //Query to update the appointment
    // Start with the basic UPDATE statement
    $sql = "UPDATE patients SET Postcode = '$postalcode' WHERE NHSNumber = '$nhsnumber'";

    //Executing the query
    $result = $conn->query($sql);
    //Checking if Updated Successfully
    if ($result) {
        echo json_encode(array('message' => 'Patients updated!'));
    } else {
        // There was an error inserting the appointment into the database
        http_response_code(500);
        echo json_encode(array('error' => 'Error adding appointment.'));
    }
} else {
    // The NHSNumber does not exist in the "patients" table
    http_response_code(400);
    echo json_encode(array('error' => 'No data for this id to edit !'));
}
