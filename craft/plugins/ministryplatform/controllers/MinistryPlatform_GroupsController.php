<?php

namespace Craft;

use Carbon\Carbon;
use MinistryPlatform\Http\Client;
use MinistryPlatform\Models\Group_Inquiry;

/**
 * App Feed controller
 */
class MinistryPlatform_GroupsController extends BaseController {

    protected $allowAnonymous = true;

    /**
     * @throws \Exception
     */
    public function actionSendInquiry() {

        try {

            $message = craft()->request->getRestParams()['message'];
            $persistence = new OauthTokenPersistence();

            $mp = new Client(
                craft()->config->get('domain', 'ministryplatform'),
                craft()->config->get('client_id', 'ministryplatform'),
                craft()->config->get('client_secret', 'ministryplatform'),
                craft()->config->get('username', 'ministryplatform'),
                craft()->config->get('password', 'ministryplatform'),
                $persistence
            );

            $contact = $mp->contacts()->firstOrCreate($message['First_Name'], $message['Last_Name'], $message['Email']);

            $message['Contact_ID'] = $contact->Contact_ID;
            $message['Inquiry_Date'] = Carbon::now()->format('Y-m-d\TH:i:s');

            /** @var Group_Inquiry $group_inquiry */
            $mp->groupInquiries()->create($message);

            $this->returnJson(['success' => true]);

        } catch (\Exception $e) {
            HeaderHelper::setHeader(['status' => 500]);
            $this->returnErrorJson($e->getMessage());
        }

    }

}
