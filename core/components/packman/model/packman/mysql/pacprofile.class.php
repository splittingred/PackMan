<?php
/**
 * @package packman
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/pacprofile.class.php');
class pacProfile_mysql extends pacProfile {}
?>