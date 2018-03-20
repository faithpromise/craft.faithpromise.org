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
                ['width' => 320, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 320])],
                ['width' => 640, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 640])],
                ['width' => 768, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 768])],
                ['width' => 1536, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 1536])],
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
                    ['width' => 320, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 320])],
                    ['width' => 640, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 640])],
                    ['width' => 768, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 768])],
                    ['width' => 1536, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 1536])],
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
        $this->returnJson($data);
//        craft()->end();

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
                            ['width' => 320, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 320])],
                            ['width' => 640, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 640])],
                            ['width' => 768, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 768])],
                            ['width' => 1536, 'url' => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 1536])],
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
                        'url'     => 'https://faithpromise.org/app-api/series/' . $series->slug . '/' . $media->slug,
                    ],
                ],
            ];
        }

        // Serialize and JSON-encode the data
        $this->returnJson($data);
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
                        'images' => [
                            ['width' => 320, 'url' => craft()->imageUrl->url($current_series->seriesImageWide[0], ['width' => 320])],
                            ['width' => 640, 'url' => craft()->imageUrl->url($current_series->seriesImageWide[0], ['width' => 640])],
                            ['width' => 768, 'url' => craft()->imageUrl->url($current_series->seriesImageWide[0], ['width' => 768])],
                            ['width' => 1536, 'url' => craft()->imageUrl->url($current_series->seriesImageWide[0], ['width' => 1536])],
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
                        'url'     => 'https://faithpromise.org/app-api/series/' . $series->slug,
                    ],
                ],
                'images'  => [
                    ['width' => 320, 'url' => craft()->imageUrl->url($series->seriesImageSquare[0], ['width' => 320])],
                    ['width' => 640, 'url' => craft()->imageUrl->url($series->seriesImageSquare[0], ['width' => 640])],
                    ['width' => 768, 'url' => craft()->imageUrl->url($series->seriesImageSquare[0], ['width' => 768])],
                    ['width' => 1536, 'url' => craft()->imageUrl->url($series->seriesImageSquare[0], ['width' => 1536])],
                ],
            ];

        }

        // Serialize and JSON-encode the data
        $this->returnJson($data);
        craft()->end();
    }

    public function actionGetRoku() {

        $today = new DateTime();
        $today->setTime(0, 0);

        $series_entries = craft()->elements->getCriteria(ElementType::Entry)->type('series')->seriesIsOfficial(1)->with('seriesImageWide')->limit(null)->order('postDate desc')->find();
        $alignment_entries = craft()->elements->getCriteria(ElementType::Entry)->type('alignments')->with('alignmentImage')->limit(null)->order('postDate desc')->find();

        $data = [
            'providerName'    => 'Faith Promise Church',
            'lastUpdated'     => $today->atom(),
            'language'        => 'en-US',
            'series'          => [],
            'shortFormVideos' => [],
            'movies'          => [],
            'playlists'       => [],
            'categories'      => [],
        ];

        foreach ($series_entries as $series) {

            $seriesMedia = craft()->elements->getCriteria(ElementType::Entry)->section('seriesMedia')->relatedTo($series)->find();

            $episodes = [];
            $episode_number = count($seriesMedia) + 1;

            foreach ($seriesMedia as $media) {
                if ($media->videoStreamUrl) {
                    $episodes[] = [
                        'id'               => $media->id,
                        'title'            => $media->title,
                        'content'          => [
                            'dateAdded' => $media->postDate->format(DateTime::W3C_DATE),
                            'videos'    => [
                                [
                                    'url'       => $media->videoHdUrl,
                                    'quality'   => 'HD',
                                    'videoType' => 'MP4',
                                ],
                            ],
                            'duration'  => 1800, // TODO: Need to get actual duration
                        ],
                        'thumbnail'        => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 1920]),
                        'episodeNumber'    => --$episode_number,
                        'releaseDate'      => $media->postDate->format(DateTime::W3C_DATE),
                        'shortDescription' => $media->text ?: $media->title . ' is a video from Faith Promise Church.',
                    ];
                }
            }

            if (count($episodes)) {
                $data['series'][] = [
                    'id'               => $series->id,
                    'title'            => $series->title,
                    'episodes'         => $episodes,
                    'genres'           => ['educational'], // TODO: What are the available genres?
                    'thumbnail'        => craft()->imageUrl->url($series->seriesImageTall[0], ['width' => 1920]),
                    'releaseDate'      => $series->postDate->format(DateTime::W3C_DATE),
                    'shortDescription' => $series->text ?: $series->title . ' is a sermon series from Faith Promise Church.',
                    'tags'             => 'sermon',
                ];
            }

        }

        foreach ($alignment_entries as $alignment) {

            $alignmentMedia = craft()->elements->getCriteria(ElementType::Entry)->section('alignmentMedia')->relatedTo($alignment)->find();
            $episodes = [];
            $episode_number = count($alignmentMedia) + 1;

            foreach ($alignmentMedia as $media) {
                if ($media->videoHdUrl) {
                    $episodes[] = [
                        'id'               => $media->id,
                        'title'            => $media->title,
                        'content'          => [
                            'dateAdded' => $media->postDate->format(DateTime::W3C_DATE),
                            'videos'    => [
                                [
                                    'url'       => $media->videoHdUrl,
                                    'quality'   => 'HD',
                                    'videoType' => 'MP4',
                                ],
                            ],
                            'duration'  => 1800, // TODO: Need to get actual duration
                        ],
                        'thumbnail'        => craft()->imageUrl->url($alignment->alignmentImage[0], ['width' => 1920]),
                        'episodeNumber'    => --$episode_number,
                        'releaseDate'      => $media->postDate->format(DateTime::W3C_DATE),
                        'shortDescription' => $media->title . ' - Part of ' . $alignment->title . ', a group alignment from Faith Promise Church.',
                    ];
                }
            }

            if (count($episodes)) {
                $data['series'][] = [
                    'id'               => $alignment->id,
                    'title'            => $alignment->title,
                    'episodes'         => $episodes,
                    'genres'           => ['educational'], // TODO: What are the available genres?
                    'thumbnail'        => craft()->imageUrl->url($alignment->alignmentImage[0], ['width' => 1920]),
                    'releaseDate'      => $alignment->postDate->format(DateTime::W3C_DATE),
                    'shortDescription' => $alignment->title . ' is a group alignment from Faith Promise Church.',
                    'tags'             => 'study',
                ];
            }

        }

        // Serialize and JSON-encode the data
        $this->returnJson($data);
        craft()->end();

    }
}
