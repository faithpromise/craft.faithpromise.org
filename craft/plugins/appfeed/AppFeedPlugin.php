<?php

namespace Craft;

class AppFeedPlugin extends BasePlugin {

    function getName() {
        return Craft::t('App Feed');
    }

    function getVersion() {
        return '1.0';
    }

    function getDeveloper() {
        return 'Faith Promise';
    }

    function getDeveloperUrl() {
        return 'http://faithpromise.org';
    }

    /**
     * @return array
     */
    public function registerSiteRoutes() {

        $routes = [
            'app-api/series'                                                              => ['action' => 'appFeed/getSeriesList'],
            'app-api/series/(?P<series_slug>[a-zA-Z0-9-]+)'                               => ['action' => 'appFeed/getSeries'],
            'app-api/series/(?P<series_slug>[a-zA-Z0-9-]+)/(?P<media_slug>[a-zA-Z0-9-]+)' => ['action' => 'appFeed/getMedia'],
            'app-api/roku'                                                                => ['action' => 'appFeed/getRoku'],
            'app-api/online'                                                              => ['action' => 'appFeed/getOnline'],
        ];

        return $routes;
    }

}