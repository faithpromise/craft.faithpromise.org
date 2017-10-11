<?php

namespace Craft;

return [
    'endpoints' => [

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