<?php

namespace Craft;

return [
    'endpoints' => [

        'api/student-events' => function () {

            $category = craft()->elements->getCriteria(ElementType::Category)->slug('students')->first();

            return [
                'elementType' => ElementType::Entry,
                'criteria'    => [
                    'section'   => 'events',
                    'with'      => ['eventImageTall', 'eventImageWide'],
                    'relatedTo' => $category,
                ],
                'transformer' => function (EntryModel $entry) {

                    $description = $entry->html . '';

                    if (!empty($entry->actions)) {
                        $description .= '<p>';
                        foreach ($entry->actions as $action) {
                            $description .= '<a class="Button" href="' . $action->theUrl . '">' . $action->text . '</a>';
                        }
                        $description .= '</p>';
                        $description = str_replace('<p></p>', '', $description);
                    }

                    return [
                        'slug'        => $entry->slug,
                        'title'       => $entry->title,
                        'subtitle'    => $entry->dateRange,
                        'excerpt'     => $entry->excerpt,
                        'description' => $description,
                        'url'         => $entry->theUrl,
                        'image_tall'  => !empty($entry->eventImageTall) ? $entry->eventImageTall[0]->url : null,
                        'image_wide'  => !empty($entry->eventImageWide) ? $entry->eventImageWide[0]->url : null,
                        'publish_at'  => $entry->postDate->format('Y-m-d 00:00:00'),
                        'expire_at'   => $entry->expiryDate ? $entry->expiryDate->format('Y-m-d 00:00:00') : null,
                        'sort'        => 1,
                    ];
                },
            ];

        },

        'api/volunteer-skills' => function () {

            return [
                'elementType' => ElementType::Category,
                'criteria'    => [
                    'group' => 'volunteerSkills',
                ],
                'transformer' => function (CategoryModel $category) {
                    return [
                        'id'    => $category->id,
                        'slug'  => $category->slug,
                        'title' => $category->title,
                    ];
                },
            ];

        },

        'api/volunteer-areas' => function () {

            return [
                'elementType' => ElementType::Category,
                'criteria'    => [
                    'group' => 'volunteerAreas',
                ],
                'transformer' => function (CategoryModel $category) {
                    return [
                        'id'    => $category->id,
                        'slug'  => $category->slug,
                        'title' => $category->title,
                    ];
                },
            ];

        },

        'api/volunteer-positions' => function () {

            $area_slug = craft()->request->getParam('area');
            $skill_slug = craft()->request->getParam('skill');

            $area = $area_slug ? craft()->elements->getCriteria(ElementType::Category)->slug($area_slug)->first() : null;
            $skill = $skill_slug ? craft()->elements->getCriteria(ElementType::Category)->slug($skill_slug)->first() : null;

            return [
                'elementType' => ElementType::Entry,
                'criteria'    => [
                    'section'   => 'volunteerPositions',
                    'with'      => ['volunteerSkills', 'volunteerArea'],
                    'relatedTo' => $area && $skill ? ['and', ['targetElement' => $area], ['targetElement' => $skill]] : ($area ? $area : ($skill ? $skill : null)),
                ],
                'transformer' => function (EntryModel $entry) {

                    $skills = [];
                    foreach ($entry->volunteerSkills as $skill) {
                        $skills[] = [
                            'title' => $skill->title,
                            'slug'  => $skill->slug,
                        ];
                    }

                    return [
                        'id'           => $entry->id,
                        'title'        => $entry->title,
                        'description'  => (string)$entry->html,
                        'availability' => $entry->availability,
                        'commitment'   => $entry->timeCommitment,
                        'skills'       => $skills,
                        'area'         => [
                            'title' => $entry->volunteerArea[0]->title,
                            'slug'  => $entry->volunteerArea[0]->slug,
                        ],
                    ];
                },
            ];
        },

        'api/groups' => function () {

            $default_image = craft()->elements->getCriteria(ElementType::Asset)->id(4860)->first();
            $location = craft()->request->getParam('location');

            $criteria = [
                'section' => 'groups',
                'with'    => ['groupCategory.groupCategoryImage', 'groupImage', 'groupLifeStage'],

            ];

            if ($location) {
                $criteria['groupAddress'] = ['target' => $location, 'range' => 50];
                $criteria['order'] = ['distance'];
            }

            // If any coordinates were provided
            if (!empty($allLats) && !empty($allLngs)) {
                // Calculate center of map
                $centerLat = (min($allLats) + max($allLats)) / 2;
                $centerLng = (min($allLngs) + max($allLngs)) / 2;
                $center = [
                    'lat' => round($centerLat, 6),
                    'lng' => round($centerLng, 6),
                ];
            }


            return [
                'elementType' => ElementType::Entry,
                'criteria'    => $criteria,
                'transformer' => function (EntryModel $entry) use ($default_image, $location) {

                    $imageUrlService = new ImageUrlService();
                    $image = $entry->groupImage ? $entry->groupImage[0] : ($entry->groupCategory && $entry->groupCategory[0]->groupCategoryImage ? $entry->groupCategory[0]->groupCategoryImage[0] : $default_image);
//                    $image = $entry->groupImage ? $entry->groupImage[0] : $default_image;

//                    $image = $default_image;

                    return [
                        'id'          => $entry->id,
                        'title'       => $entry->title,
                        'subtitle'    => $entry->subtitle,
                        'category'    => count($entry->groupCategory) ? $entry->groupCategory[0]->title : null,
                        'life_stage'  => count($entry->groupLifeStage) ? $entry->groupLifeStage[0]->title : null,
                        'description' => $entry->groupDescription,
                        'city'        => $entry->groupAddress->city,
                        'day_of_week' => $entry->groupDayOfWeek,
                        'frequency'   => $entry->groupFrequency,
                        'start_time'  => $entry->groupStartTime,
                        'location'    => $entry->groupAddress->lat ? ['lat' => round(floatval($entry->groupAddress->lat), 4), 'lng' => round(floatval($entry->groupAddress->lng), 4)] : null,
                        'distance'    => $location ? round($entry->groupAddress->distance, 1) : null,
                        'image'       => $imageUrlService->url($image),
                    ];
                },
            ];
            // {% set image = group.groupImage | length ? : (group.groupCategory | length ? group.groupCategory[0].groupCategoryImage[0] : default_image) %}
//            {% set groups = craft.entries({ section: 'groups', with: ['groupCategory.groupCategoryImage', 'groupImage','groupLifeStage'] }).find() %}
        },

        'api/campuses' => function () {



        },

    ],
];