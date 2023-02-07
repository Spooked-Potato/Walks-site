<?php
    $client_name = $_POST['name'];
    $client_email = $_POST['email'];
    $client_number = $_POST['phonenumber'];
    $clint_message = $_POST['question'];


	$email_from = 'arturjddias@hotmail.com';
	$email_subject = "New Form submission";
	$email_body = "You have received a new message from the user $cilent_name.\n".
                            "Here is the message:\n $client_message";


  $to = "arturjddias@hotmail.com";
  $headers = "From: $email_from \r\n";
  $headers .= "Reply-To: $visitor_email \r\n";

  mail(
    $to,
  $email_subject,
  $email_body,
  $headers
);


header('Location: src/html/');


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