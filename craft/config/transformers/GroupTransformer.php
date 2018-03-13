<?php

namespace Craft;

// https://craftcms.stackexchange.com/questions/23100/break-up-element-api-config-into-partials
require craft()->path->getPluginsPath() . 'elementapi/vendor/autoload.php';

use League\Fractal\TransformerAbstract;

class GroupTransformer extends TransformerAbstract {

    private $location;
    private $markers_only;
    private $default_image;

    protected $availableIncludes = ['campus'];

    public function __construct($location, $markers_only, $default_image) {

        $this->location = $location;
        $this->markers_only = $markers_only;
        $this->default_image = $default_image;

    }

    public function transform(EntryModel $entry) {

        // Prefer group image, then life stage image, then category image, then a default image
        $imageUrlService = new ImageUrlService();
        $image = $entry->groupImage ? $entry->groupImage[0] : (
        $entry->groupLifeStage && $entry->groupLifeStage[0]->groupLifeStageImage ? $entry->groupLifeStage[0]->groupLifeStageImage[0] : (
        $entry->groupCategory && $entry->groupCategory[0]->groupCategoryImage ? $entry->groupCategory[0]->groupCategoryImage[0] : $this->default_image
        )
        );

        if ($this->markers_only) {
            return [
                'id'       => $entry->id,
                'slug'     => $entry->slug,
                'location' => $entry->groupAddress->lat ? ['lat' => round(floatval($entry->groupAddress->lat), 4), 'lng' => round(floatval($entry->groupAddress->lng), 4)] : null,
            ];
        }

        return [
            'id'          => $entry->id,
            'slug'        => $entry->slug,
            'title'       => $entry->title,
            'subtitle'    => $entry->groupSubtitle,
            'category'    => count($entry->groupCategory) ? $entry->groupCategory[0]->title : null,
            'life_stage'  => count($entry->groupLifeStage) ? $entry->groupLifeStage[0]->title : null,
            'description' => $entry->groupDescription,
            'city'        => $entry->groupAddress->city,
            'day_of_week' => $entry->groupDayOfWeek,
            'frequency'   => $entry->groupFrequency,
            'start_time'  => $entry->groupStartTime,
            'location'    => $entry->groupAddress->lat ? ['lat' => round(floatval($entry->groupAddress->lat), 4), 'lng' => round(floatval($entry->groupAddress->lng), 4)] : null,
            'distance'    => $this->location ? round($entry->groupAddress->distance, 1) : null,
            'image'       => $imageUrlService->url($image),
        ];

    }

    public function includeCampus(EntryModel $entry) {

        if (!$entry->groupCampus || count($entry->groupCampus) === 0)
            return null;

        return $this->item($entry->groupCampus->first(), function ($campus) {

            return [
                'name' => $campus->title,
            ];
        });

    }

}