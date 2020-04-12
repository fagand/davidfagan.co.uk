<?php
$public_key = "6LflpOgUAAAAANkiX_QNPD7xz8fPmDIUGehCmwtO";
/* Your reCaptcha public key */
$private_key = "6LflpOgUAAAAAFhxizTWcjxKQwkO_2mYLIlXg3yY";
/* Enter your reCaptcha private key */
$url = "https://www.google.com/recaptcha/api/siteverify";
/* Default end-point, please verify this before using it */
$name = $_POST['Name'];
$visitor_email = $_POST['Email'];
$message = $_POST['Message'];
$captcha;
if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }
        if(!$captcha){
        header('Location: captcha.html');
          exit;
        }
if (array_key_exists('submit', $_POST))
{
    /* The response given by the form being submitted */
    $response_key = $_POST['g-recaptcha-response'];
    /* Send the data to the API for a response */
    $response = file_get_contents($url . '?secret=' . $private_key . '&response=' . $response_key);
    /* json decode the response to an object */
    $response = json_decode($response);
    /* if success */
    if ($response->success == 1)
    {
        $email_from = "$visitor_email"; //<== update the email address
        $email_subject = "New website submission";
        $email_body = "You have received a new message from $name.\n" . "Here is the message: $message";

        $to = "admin@davidfagan.co.uk"; //<== update the email address
        $headers = "From: $email_from \r\n";
        $headers .= "Reply-To: $visitor_email \r\n";
        //Send the email!
        mail($to, $email_subject, $email_body, $headers);
        //done. redirect to thank-you page.
        header('Location: thank-you.html');
    }
    else
    {
        sleep(3);
        header('Location: captcha.html');
    }
}
?>