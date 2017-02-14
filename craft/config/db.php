<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

    // The database server name or IP address. Usually this is 'localhost' or '127.0.0.1'.
    'server'      => getenv('CRAFTENV_DB_HOST'),

    // The name of the database to select.
    'database'    => getenv('CRAFTENV_DB_NAME'),

    // The database username to connect with.
    'user'        => getenv('CRAFTENV_DB_USER'),

    // The database password to connect with.
    'password'    => getenv('CRAFTENV_DB_PASS'),

    // The prefix to use when naming tables. This can be no more than 5 characters.
    'tablePrefix' => 'craft',

);
