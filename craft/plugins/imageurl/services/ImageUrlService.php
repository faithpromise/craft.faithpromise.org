<?php

namespace Craft;

class ImageUrlService extends BaseApplicationComponent {

    public function url(AssetFileModel $img, $params = []) {

        $aliases = [
            'width'  => 'w',
            'height' => 'h',
        ];

        foreach ($params as $key => $param) {
            if (array_key_exists($key, $aliases)) {
                $params[$aliases[$key]] = $params[$key];
                unset($params[$key]);
            }
        }

        ksort($params);

        $img_url = $img->getUrl() . '?' . http_build_query($params);

        return str_replace('s3-us-west-2.amazonaws.com/faithpromise.org', 'faithpromise.imgix.net', $img_url);

    }

}