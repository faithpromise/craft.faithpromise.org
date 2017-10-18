<?php

namespace Craft;

/**
 * App Feed controller
 */
class AppFeedController extends BaseController {
    /**
     * @var bool Allows anonymous access to this controller's actions.
     */
    protected $allowAnonymous = true;

    public function actionGetMedia() {

        $series_slug = craft()->urlManager->getRouteParams()['variables']['matches']['series_slug'];
        $media_slug = craft()->urlManager->getRouteParams()['variables']['matches']['media_slug'];

        $series = craft()->elements->getCriteria(ElementType::Entry)->type('series')->slug($series_slug)->with('seriesImageTall')->first();
        $media = craft()->elements->getCriteria(ElementType::Entry)->section('seriesMedia')->slug($media_slug)->with('speaker')->first();

        $speaker = $media->speaker ? $media->speaker[0]->title : $media->guestSpeaker;
        $speaker_title = $media->speaker ? (', ' . $media->speaker[0]->jobTitle) : null;
        $speaker_prefix = $media->guestSpeaker ? 'Guest speaker, ' : null;

        $data = [
            'header'         => [
                'title' => 'Sermons',
            ],
            'images'         => [
                ['width' => 320, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 320])],
                ['width' => 640, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 640])],
                ['width' => 768, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 768])],
                ['width' => 1536, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 1536])],
            ],
            'title'          => $media->title,
            'subtitle'       => $speaker_prefix . $speaker . $speaker_title,
            'extraSubtitles' => [($media->sermonDate ? $media->sermonDate->format('M d, Y') : '')],
            'media'          => [],
        ];

        if ($media->audioUrl && $media->soundcloudId) {

            // Get last section in audio url
            $soundcloud_slug = array_slice(explode('/', rtrim($media->audioUrl, '/')), -1)[0];
            $mp3_url = 'http://feeds.soundcloud.com/stream/' . $media->soundcloudId . '-faithpromise-' . $soundcloud_slug . '.mp3';

            $data['media'][] = [

                'url'          => $mp3_url,
                'format'       => 'mp3',
                'downloadable' => 'true',
                'images'       => [
                    ['width' => 320, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 320])],
                    ['width' => 640, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 640])],
                    ['width' => 768, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 768])],
                    ['width' => 1536, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 1536])],
                ],

            ];
        }

        if ($media->videoHdUrl) {
            $data['media'][] = [
                'url'          => $media->videoHdUrl,
                'format'       => 'mp4',
                'downloadable' => 'false',
            ];
        }

        if ($media->videoStreamUrl) {
            $data['media'][] = [
                'url'          => $media->videoStreamUrl,
                'format'       => 'm3u8',
                'downloadable' => 'false',
            ];
        }

        // Serialize and JSON-encode the data
        JsonHelper::sendJsonHeaders();
        $output = json_encode($data);

        // Output and the request
        echo $output;
        craft()->end();

    }

    public function actionGetSeries() {

        $series_slug = craft()->urlManager->getRouteParams()['variables']['matches']['series_slug'];

        $series = craft()->elements->getCriteria(ElementType::Entry)->type('series')->slug($series_slug)->with('seriesImageTall')->first();
        $seriesMedia = craft()->elements->getCriteria(ElementType::Entry)->section('seriesMedia')->relatedTo($series)->find();

        $data = [
            'header' => [
                'title' => $series->title,
                'style' => 'featured',
                'items' => [
                    [
                        'images' => [
                            ['width' => 320, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 320])],
                            ['width' => 640, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 640])],
                            ['width' => 768, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 768])],
                            ['width' => 1536, 'url' => craft()->imageUrl_url->url($series->seriesImageTall[0], ['width' => 1536])],
                        ],
                    ],
                ],
            ],
            'items'  => [],
        ];

        foreach ($seriesMedia as $media) {
            $data['items'][] = [
                'title'   => $media->title,
                'actions' => [
                    [
                        'handler' => 'mediaDetail',
                        'url'     => 'http://faithpromise.org/app-api/series/' . $series->slug . '/' . $media->slug . '.json',
                    ],
                ],
            ];
        }

        // Serialize and JSON-encode the data
        JsonHelper::sendJsonHeaders();
        $output = json_encode($data);

        // Output and the request
        echo $output;
        craft()->end();

    }

    public function actionGetSeriesList() {

        $series_entries = craft()->elements->getCriteria(ElementType::Entry)->type('series')->seriesIsOfficial(1)->with('seriesImageWide')->limit(null)->order('postDate desc')->find();
        $current_series = craft()->elements->getCriteria(ElementType::Entry)->type('series')->order('postDate desc')->with('seriesImageSquare')->first();

        $data = [
            'header' => [
                'title' => 'Sermons',
                'style' => 'banner',
                'items' => [
                    [
                        'actions' => [
                            'handler' => 'list',
                            'url'     => 'http://faithpromise.org/app-api/series/' . $current_series->slug . '.json',
                        ],
                        'images'  => [
                            ['width' => 320, 'url' => craft()->imageUrl_url->url($current_series->seriesImageWide[0], ['width' => 320])],
                            ['width' => 640, 'url' => craft()->imageUrl_url->url($current_series->seriesImageWide[0], ['width' => 640])],
                            ['width' => 768, 'url' => craft()->imageUrl_url->url($current_series->seriesImageWide[0], ['width' => 768])],
                            ['width' => 1536, 'url' => craft()->imageUrl_url->url($current_series->seriesImageWide[0], ['width' => 1536])],
                        ],
                    ],
                ],
            ],
            'items'  => [],
        ];

        foreach ($series_entries as $series) {

            $data['items'][] = [
                'title'   => $series->title,
                'actions' => [
                    [
                        'handler' => 'list',
                        'url'     => 'http://faithpromise.org/app-api/series/' . $series->slug . '.json',
                    ],
                ],
                'images'  => [
                    ['width' => 320, 'url' => craft()->imageUrl_url->url($series->seriesImageSquare[0], ['width' => 320])],
                    ['width' => 640, 'url' => craft()->imageUrl_url->url($series->seriesImageSquare[0], ['width' => 640])],
                    ['width' => 768, 'url' => craft()->imageUrl_url->url($series->seriesImageSquare[0], ['width' => 768])],
                    ['width' => 1536, 'url' => craft()->imageUrl_url->url($series->seriesImageSquare[0], ['width' => 1536])],
                ],
            ];

        }

        // Serialize and JSON-encode the data
        JsonHelper::sendJsonHeaders();
        $output = json_encode($data);

        // Output and the request
        echo $output;
        craft()->end();
    }

}
