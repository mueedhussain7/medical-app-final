<?php 

     //Headers for Api Content-Type and Access-Control
     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");

     $rest_json = file_get_contents("php://input");
     $_POST = json_decode($rest_json, true);

    $nhsNumber = $_POST['NHSNumber'];
    $date = $_POST['date'];
    $time = $_POST['time'];

       //Database Details 
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "hospital";
    //Connecting to the Database
    $conn = new mysqli($host, $username, $password, $dbname);
     //Checking if connection is successfull or not 
    if($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //SQL Query to get data of all patient
    $sql = "UPDATE appointments SET NHSNumber = '$nhsNumber' , status = 1 WHERE time = '$time' AND date = '$date'";
    $result = $conn->query($sql);
    //If Successfully Data added
    if ($result) {
        echo json_encode(array('message' => 'Appointment added!'));
    } else {
        // There was an error inserting the appointment into the database
        http_response_code(500);
        echo json_encode(array('error' => 'Error adding appointment.'));
    }