<?php

namespace TheTurk\Miserable;

use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\User\User;

class AddCurrentUserMiserableAttributes
{
    public function __invoke(CurrentUserSerializer $serializer, User $user, array $attributes)
    {
        $actor = $serializer->getActor();

        if ($miserableOthers = $actor->hasPermission('user.miserable')) {
            $attributes['canMiserableOthers'] = $miserableOthers;
        }
        
        if ($actor->miserable_until) {
            $attributes['miserableUntil'] = $serializer->formatDate($actor->miserable_until);
        }

        return $attributes;
    }
}