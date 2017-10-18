<?php

namespace Craft;

class ImageUrl_UrlService extends BaseApplicationComponent {

    public function url(AssetFileModel $img, $params = []) {

        $default_params = ['auto' => 'compress,format'];
        $query_params = array_merge($default_params, $params);

        $aliases = [
            'width'  => 'w',
            'height' => 'h',
        ];

        foreach ($query_params as $key => $param) {
            if (array_key_exists($key, $aliases)) {
                $query_params[$aliases[$key]] = $query_params[$key];
                unset($query_params[$key]);
            }
        }

        ksort($query_params);

        $img_url = $img->getUrl() . '?' . http_build_query($query_params);

        return str_replace('http://s3-us-west-2.amazonaws.com/faithpromise.org', 'https://faithpromise.imgix.net', $img_url);

    }

}