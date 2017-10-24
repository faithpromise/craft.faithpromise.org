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
    ],
];