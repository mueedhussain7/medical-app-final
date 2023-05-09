<?php 

     //Headers for Api Content-Type and Access-Control
     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");

     $rest_json = file_get_contents("php://input");
     $_POST = json_decode($rest_json, true);

    //Checking if user provided NHSNumber 
    if(!isset($_POST['NHSNumber']) ){
        echo json_encode(array('message'=>'NHSNumber is not entered','param'=>'NHSNumber'));
        exit();
    }
    if(!isset($_POST['Password']) ){
        echo json_encode(array('message'=>'Password is not entered','param'=>'Password'));
        exit();
    }
        //Storing NHSNumber in a variable
        $nhsnumber = $_POST['NHSNumber'];
        $password = $_POST['Password'];
   
    
            if(!is_numeric($nhsnumber) ){
                echo json_encode(array('message'=>'NHSNumber should be numeric !','param'=>'NHSNumber'));
                exit();
            }
            if(strlen($nhsnumber) != 10){
                echo json_encode(array('message'=>'NHSNumber should be 10 digits !','param'=>'NHSNumber'));
                exit();
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

        // Get the patient's entered plaintext password from the login form
        $plaintext_password = $_POST['Password'];

        // Retrieve the hashed password from the database for the given NHS number
        $sql1 = "SELECT `Password` FROM patients WHERE NHSNumber = '$nhsnumber'";
        $result1 = mysqli_query($conn, $sql1);

        if (mysqli_num_rows($result1) == 1) {
        // There should only be one row returned, so fetch the result row
        $row = mysqli_fetch_assoc($result1);
        
        // Get the hashed password from the result row
        $hashed_password = $row['Password'];
        
        // Use the password_verify function to check if the entered password matches the stored hash
        if (! password_verify($plaintext_password, $hashed_password)) {
            echo json_encode(array('message'=>'Invalid NHSNumber or Password','param'=>'NHSNumber/Password'));
            exit();
        } 
        } else {
            echo json_encode(array('message'=>'Invalid NHSNumber or Password','param'=>'NHSNumber/Password'));
            exit();
        }



    //SQL Query to Login the patient
    $sql = "SELECT * FROM patients WHERE NHSNumber = '$nhsnumber' ";
    //Executing the Query
    $result = mysqli_query($conn, $sql);
    //Making a data array and storing executed query reasult
    $data = array();
    $data = $result->fetch_assoc();
    

    if ($data != null  ){
     
            //Generating a JWT Token
        $secret_key = 'ahsdjsad9d7a8sd9asda98sdad86asdasd6a78sdaS'; //Secret key will help to authorize the jwt token
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode(['username' => 'username', 'iat' => time(), 'exp' => time() + (60 * 60)]);
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        $jwt_token = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        
        //Sending response if logged in successfully
        echo json_encode(array('message'=>'Logged in successfully !','data'=>$data,'token'=>$jwt_token));
        }
        else{

         //Sending response if NHSNumber does'nt exist in database
            echo json_encode(array('message'=>'NHSNumber or Password is incorrect !','param'=>'NHSNumber/Password'));
        }
       
      
        ?>