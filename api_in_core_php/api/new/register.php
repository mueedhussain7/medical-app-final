<?php 

     //Headers for Api Content-Type and Access-Control
     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");

     $rest_json = file_get_contents("php://input");
     $_POST = json_decode($rest_json, true);

    //Checking if all the fields are filled by user 

    if (!isset($_POST['NHSNumber'])) {
        if (!isset($_POST['Forename'])) {
            echo json_encode(array('message'=>'Forename is not entered!', 'param'=>'Forename'));
            exit();
        }
    
        if (!isset($_POST['Surname'])) {
            echo json_encode(array('message'=>'Surname is not entered!', 'param'=>'Surname'));
            exit();
        }
    
        if (!isset($_POST['PostCode'])) {
            echo json_encode(array('message'=>'PostCode is not entered!', 'param'=>'PostCode'));
            exit();
        }
    } 
    
    if(!isset($_POST['Password'])){
        echo json_encode(array('message'=>'Password is not entered !', 'param'=>'Password'));
        exit();
    }
    
    
        
        //Saving user inputs to variables

        $forename = isset($_POST['Forename']) ? $_POST['Forename'] : "";
        $surname = isset($_POST['Surname']) ? $_POST['Surname'] : "";
        $postCode = isset($_POST['PostCode']) ? $_POST['PostCode'] : "";
        $nhsNumber = isset($_POST['NHSNumber']) ? $_POST['NHSNumber'] : rand(1000000000,9999999999);
        $password = $_POST['Password'];
        $hashedPassword = password_hash($password,PASSWORD_DEFAULT);
        $created_at = time();

        //Validations
        if (!empty($forename)) {
            if (!is_string($forename)) {
                echo json_encode(array('message'=>'Forename must be a string!', 'param'=>'Forename'));
                exit();
            }
            
            if (is_numeric($forename)) {
                echo json_encode(array('message'=>'Forename cannot be numeric!', 'param'=>'Forename'));
                exit();
            }
        }
        
        if (!empty($surname)) {
            if (!is_string($surname)) {
                echo json_encode(array('message'=>'Surname must be a string!', 'param'=>'Surname'));
                exit();
            }
            
            if (is_numeric($surname)) {
                echo json_encode(array('message'=>'Surname cannot be numeric!', 'param'=>'Surname'));
                exit();
            }
        }
        
        if (!empty($postCode)) {
            if (!is_numeric($postCode)) {
                echo json_encode(array('message'=>'PostCode must be numeric!', 'param'=>'PostCode'));
                exit();
            }
        }
        
        if (!empty($nhsNumber)) {
            if (!is_numeric($nhsNumber)) {
            echo json_encode(array('message'=>'NHSNumber must be a number!', 'param'=>'NHSNumber'));
            exit();
        }
        
        if (strlen($nhsNumber) !== 10) {
            echo json_encode(array('message'=>'NHSNumber must be a 10-digit number!', 'param'=>'NHSNumber'));
            exit();
        }
        }

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
                //SQL Query to register the patient
                $sql = "INSERT INTO `patients`( `NHSNumber`,`Password`, `Forename`, `Surname`, `PersoneDOB`, `GenderCode`, `Postcode`, `created_at`) VALUES ('$nhsNumber','$hashedPassword','$forename','$surname',NULL,NULL,'$postCode','$created_at')";
                //Executing the Query
                $result = $conn->query($sql);
               
                //Returning Message Response
                echo json_encode(array('message'=>'Registered Successfully !'));
      
?>