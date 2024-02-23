<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'PHPMailer-6.9.1/src/Exception.php';
require 'PHPMailer-6.9.1/src/PHPMailer.php';
require 'PHPMailer-6.9.1/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $date = $_POST['date'];
    $appt = $_POST['appt'];
    $tentacles = $_POST['tentacles'];
    $message = $_POST['message'];

    // Set recipient email address
    $to = "restoran@tolevski.com";
    $subject = "Booking Request from $name";
    $headers = "From: $email" . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

    // Construct email body
    $emailBody = "Name: $name\nEmail: $email\nPhone: $phone\nDate : $date\nAppointment: $appt\nNumber of People: $tentacles\n\nMessage:\n$message";

    // Create a new PHPMailer instance
    $mail = new PHPMailer();

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'tolevski.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'restoran@tolevski.com';
    $mail->Password = 'restoran123';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Sender and recipient details
    $mail->setFrom($to, $name);  // Use user's email and name
    $mail->addAddress('restoran@tolevski.com', 'Your Restaurant');  // Replace with your recipient email and name

    // Email content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $emailBody;

    // Send email
    if ($mail->send()) {
        $response = array('success' => true, 'message' => 'Email sent successfully.');
    } else {
        $response = array('success' => false, 'message' => 'Failed to send email. Error: ' . $mail->ErrorInfo);
    }

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
