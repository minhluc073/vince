<?php
  require_once("lib/mailchimp-api.php");

  // ENTER YOUR MAILCHIMP API KEY IN FIRST BLOCK
  define('MAILCHIMP_API_KEY', 'a54ae95c797777817a560a885b9d2925-us8');
  
  // ENTER LIST ID THO WHICH VISITORS ARE SUBSCRIBING
  define('MAILCHIMP_LIST_NAME', '5871cd3571');

  ob_start();

  function response($responseStatus, $responseMsg) {
    $out = json_encode(array('status' => $responseStatus, 'msg' => $responseMsg));

    ob_end_clean();
    echo $out;
    die();
  }

  // AJAX CALLBACK
  if (!isset($_SERVER['X-Requested-With']) && !isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    response(false, 'ajax');
  }

  $emailAddress = trim(strtolower($_POST['subscribeEmail']));

  // ERROR SYNTAX FOR INVALID EMAIL ADDRESS
  if(!isset($emailAddress) || !trim($emailAddress)) {
    response(false, 'email-required');
  }
  if(!isset($emailAddress) || !preg_match('/^[^@]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/', trim($emailAddress))) {
    response(false, 'email-err');
  }

  // Call mailchimp api
  $MailChimp = new MailChimp(MAILCHIMP_API_KEY);
  $result = $MailChimp->call('lists/subscribe', array(
                  'id'                => MAILCHIMP_LIST_NAME,
                  'email'             => array('email'=>$emailAddress),
                  'merge_vars'        => array('FNAME'=>$firstName, 'LNAME'=>$lastName),
                  'double_optin'      => false,
                  'update_existing'   => true,
                  'replace_interests' => false,
                  'send_welcome'      => true,
              ));

  if ($result){
    response(true, 'subscribed');
  } else {
    response(false, 'api-error');
  }
?>