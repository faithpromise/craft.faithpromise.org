<?php
/**
 * Image Url plugin for Craft CMS
 *
 * Image Url Variable
 *
 * --snip--
 * Craft allows plugins to provide their own template variables, accessible from the {{ craft }} global variable
 * (e.g. {{ craft.pluginName }}).
 *
 * https://craftcms.com/docs/plugins/variables
 * --snip--
 *
 * @author    Brad Roberts
 * @copyright Copyright (c) 2017 Faith Promise Church
 * @link      http://faithpromise.org
 * @package   ImageUrl
 * @since     0.0.0
 */

namespace Craft;

class ImageUrlVariable {

    /**
     * Whatever you want to output to a Twig template can go into a Variable method. You can have as many variable
     * functions as you want.  From any Twig template, call it like this:
     *
     *     {{ craft.imageUrl.exampleVariable }}
     *
     * Or, if your variable requires input from Twig:
     *
     *     {{ craft.imageUrl.exampleVariable(twigValue) }}
     * @param $img
     * @param array $params
     * @return string
     */

    function url(AssetFileModel $img, $params = []) {

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

        return str_replace('s3-us-west-2.amazonaws.com/faithpromise.org', 'faithpromise.imgix.net', $img_url);

    }

}