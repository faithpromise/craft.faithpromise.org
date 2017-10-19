<?php

namespace Craft;

class MailTrapPlugin extends BasePlugin {

    public function init() {

//        require_once __DIR__ . '/vendor/autoload.php';

//        vardump('test');die;

        craft()->on('email.onBeforeSendEmail', function(Event $event) {
            var_dump('email.onBeforeSendEmail test mailtrap'); die;
        });

    }

    public function getName() {
        return Craft::t('MailTrap');
    }

    public function getVersion() {
        return '1.0';
    }

    public function getDeveloper() {
        return 'Faith Promise';
    }

    public function getDeveloperUrl() {
        return 'http://faithpromise.org';
    }

}