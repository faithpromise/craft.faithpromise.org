<?php

namespace Craft;

use kamermans\OAuth2\Persistence\TokenPersistenceInterface;
use kamermans\OAuth2\Token\TokenInterface;

class OauthTokenPersistence implements TokenPersistenceInterface {

    const TOKEN_NAME = 'mp_api_token';

    /**
     * Restore the token data into the give token.
     *
     * @param TokenInterface $token
     *
     * @return TokenInterface Restored token
     */
    public function restoreToken(TokenInterface $token) {

        $data = @json_decode(craft()->cache->get(self::TOKEN_NAME), true);

        return is_array($data) ? $token->unserialize($data) : null;
    }

    /**
     * Save the token data.
     *
     * @param TokenInterface $token
     */
    public function saveToken(TokenInterface $token) {
        craft()->cache->set(self::TOKEN_NAME, json_encode($token->serialize()), 600);
    }

    /**
     * Delete the saved token data.
     */
    public function deleteToken() {
        craft()->cache->delete(self::TOKEN_NAME);
    }

}