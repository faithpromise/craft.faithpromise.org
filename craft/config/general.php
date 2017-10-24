<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return [

    '*'       => [
        'craftEnv'                         => CRAFT_ENVIRONMENT,
        'usePathInfo'                      => true,
        'cacheDuration'                    => false,
        'useEmailAsUsername'               => true,
        'generateTransformsBeforePageLoad' => true,

        // Base site URL
        'siteUrl'                          => getenv('CRAFTENV_SITE_URL'),

        // Environment-specific variables (see https://craftcms.com/docs/multi-environment-configs#environment-specific-variables)
        'environmentVariables'             => [
            'baseUrl'  => getenv('CRAFTENV_BASE_URL'),
            'basePath' => getenv('CRAFTENV_BASE_PATH'),
        ],

        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay'              => 0,

        // Enable CSRF Protection (recommended, will be enabled by default in Craft 3)
        'enableCsrfProtection'             => false, // Causing issues where token does not match. Turning off for now until it can be fixed and tested.

        // Whether "index.php" should be visible in URLs (true, false, "auto")
        'omitScriptNameInUrls'             => true,

        // Control Panel trigger word
        'cpTrigger'                        => 'admin',

        // Dev Mode (see https://craftcms.com/support/dev-mode)
        'devMode'                          => false,

        'cdnUrl'                           => getenv('CRAFTENV_CDN_URL'),
        'cmsCdnUrl'                        => getenv('CRAFTENV_CMS_CDN_URL'),
    ],

    // Live (production) environment
    'live'    => [
        'devMode'               => false,
        'enableTemplateCaching' => true,
        'allowAutoUpdates'      => false,
    ],

    // Staging (pre-production) environment
    'staging' => [
        'devMode'               => false,
        'enableTemplateCaching' => true,
        'allowAutoUpdates'      => false,
    ],

    // Local (development) environment
    'local'   => [
        'devMode'               => true,
        'enableTemplateCaching' => false,
        'allowAutoUpdates'      => true,
    ],

];
