<?php
/**
 * Craft-Multi-Environment (CMS)
 * @author    nystudio107
 * @copyright Copyright (c) 2017 nystudio107
 * @link      https://nystudio107.com/
 * @package   craft-multi-environment
 * @since     1.0.4
 * @license   MIT
 *
 * This file should be renamed to '.env.php' and it should reside in your root
 * project directory.  Add '/.env.php' to your .gitignore.  See below for production
 * usage notes.
 */

// The $craftenv_vars are all auto-prefixed with CRAFTENV_ -- you can add whatever you want here
// and access them via getenv() using the prefixed name
$craftenv_vars = array(
    // The Craft environment we're running in ('local', 'staging', 'live', etc.).
    'CRAFT_ENVIRONMENT' => 'local',

    // The database server name or IP address. Usually this is 'localhost' or '127.0.0.1'.
    'DB_HOST'           => 'db',

    // The name of the database to select.
    'DB_NAME'           => 'laravel_ddb',

    // The database username to connect with.
    'DB_USER'           => 'laravel',

    // The database password to connect with.
    'DB_PASS'           => 'laravel',

    // The site url to use; it can be hard-coded as well
    'SITE_URL'          => (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . '/',

    // The base url environmentVariable to use for Assets; it can be hard-coded as well
    'BASE_URL'          => (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . '/',

    // The base path environmentVariable for Assets; it can be hard-coded as well
    'BASE_PATH'         => realpath(dirname(__FILE__)) . '/public/',
);

// Set all of the .env values, auto-prefixed with `CRAFTENV_`
foreach ($craftenv_vars as $key => $value) {
    putenv("CRAFTENV_$key=$value");
}
