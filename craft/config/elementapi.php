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

            require craft()->path->getConfigPath() . 'transformers/GroupTransformer.php';

            $default_image = craft()->elements->getCriteria(ElementType::Asset)->id(4860)->first();
            $markers_only = craft()->request->getParam('dataset') === 'markers';
            $location = craft()->request->getParam('location');
            $distance = 25;
            $allow_location = true;

            $criteria = [
                'section' => 'groups',
            ];

            // Include group category, image, life stage, etc
            if (!$markers_only)
                $criteria['with'] = ['groupCategory.groupCategoryImage', 'groupImage', 'groupLifeStage.groupLifeStageImage'];

            /**
             * | Search by category and life stage
             * | -----------------------------------------
             */

            $related_to = ['and'];

            if ($category_param = craft()->request->getParam('category')) {
                $category = craft()->elements->getCriteria(ElementType::Category)->slug($category_param)->first();
                $related_to[] = $category;
                $distance = $category->groupCategoryDistance;
                $allow_location = $category->groupCategoryUsesLocation;
            }

            if ($stage = craft()->request->getParam('stage'))
                $related_to[] = craft()->elements->getCriteria(ElementType::Category)->slug($stage)->first();

            if (count($related_to) > 1)
                $criteria['relatedTo'] = $related_to;

            /**
             * | Search by location
             * | -----------------------------------------
             */
            if ($location && $allow_location) {
                $criteria['groupAddress'] = ['target' => $location, 'range' => $distance];
                $criteria['order'] = ['distance', 'title'];
            } else {
                $criteria['order'] = ['title'];
            }

            return [
                'elementType'     => ElementType::Entry,
                'criteria'        => $criteria,
                'elementsPerPage' => $markers_only ? 500 : 20,
                'transformer'     => new GroupTransformer($location, $markers_only, $default_image),
                'includes'        => 'campus',
                'with'            => ['groupCampus'], // TODO: Not sure if this actually eager loads the campus
            ];

            // {% set image = group.groupImage | length ? : (group.groupCategory | length ? group.groupCategory[0].groupCategoryImage[0] : default_image) %}
//            {% set groups = craft.entries({ section: 'groups', with: ['groupCategory.groupCategoryImage', 'groupImage','groupLifeStage'] }).find() %}
        },

        'api/groups/categories' => function () {

            return [
                'elementType' => ElementType::Category,
                'criteria'    => [
                    'group' => 'groupCategories',
                    'order' => ['title'],
                ],
                'transformer' => function (CategoryModel $entry) {

                    return [
                        'id'       => $entry->id,
                        'slug'     => $entry->slug,
                        'title'    => $entry->title,
                        'subtitle' => $entry->groupCategoryName,
                    ];
                },
            ];

        },

        'api/groups/life-stages' => function () {

            return [
                'elementType' => ElementType::Category,
                'criteria'    => [
                    'group' => 'groupLifeStages',
                    'order' => ['title'],
                ],
                'transformer' => function (CategoryModel $entry) {

                    return [
                        'id'    => $entry->id,
                        'slug'  => $entry->slug,
                        'title' => $entry->title,
                    ];
                },
            ];

        },

        'api/campuses' => function () {

            return [
                'elementType' => ElementType::Entry,
                'criteria'    => [
                    'type'  => 'campus',
                    'order' => ['title'],
                ],
                'transformer' => function (EntryModel $entry) {

                    return [
                        'id'       => $entry->id,
                        'title'    => $entry->title,
                        'location' => ['lat' => $entry->lat, 'lng' => $entry->lng],
                    ];
                },
            ];

        },

    ],
];