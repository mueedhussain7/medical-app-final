<?php 

     //Headers for Api Content-Type and Access-Control
     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");

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
    $sql = "SELECT * FROM appointments WHERE status = 0";
    $result = $conn->query($sql);
    //Saving all patients data in data array 
    $data = array();
    
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    //Encoding the data in json 
    $json_data = json_encode($data);
    //Sending Response
    echo $json_data; 