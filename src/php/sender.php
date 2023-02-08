<?php
    $client_name = $_POST['name'];
    $client_email = $_POST['email'];
    $client_number = $_POST['phonenumber'];
    $clint_message = $_POST['question'];

?>

<?php 

    $to = '';
    $_message = "New Message From:$client_name, Phone-Numeber $client_number  and the message $client_message";
    $headers = "From: $client_email \r\n";
        "Reply-To: $client_email" . "\r\n" .phpversion();

    mail($to, $message, $headers);

    header('Location: ../../index.php');
?>



//   function IsInjected($str)
// {
//     $injections = array('(\n+)',
//            '(\r+)',
//            '(\t+)',
//            '(%0A+)',
//            '(%0D+)',
//            '(%08+)',
//            '(%09+)'
//            );
               
//     $inject = join('|', $injections);
//     $inject = "/$inject/i";
    
//     if(preg_match($inject,$str))
//     {
//       return true;
//     }
//     else
//     {
//       return false;
//     }
// }

// if(IsInjected($visitor_email))
// {
//     echo "Bad email value!";
//     exit;
// }

 ?>