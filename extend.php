<?php

/*
 * This file is part of the-turk/flarum-miserable-users.
 *
 * Copyright (c) 2020 Hasan Özbey
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE file that was distributed
 * with this source code.
 */

namespace TheTurk\Miserable;

use Flarum\Extend;

use TheTurk\Miserable\Access\UserPolicy;
use TheTurk\Miserable\AddUserMiserableAttributes;
use TheTurk\Miserable\AddCurrentUserMiserableAttributes;
use TheTurk\Miserable\Listener;
use TheTurk\Miserable\Query\MiserableFilterGambit;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\User\Event\Saving;
use Flarum\User\Filter\UserFilterer;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;
use Flarum\Post\Event\Saving as PostSaving;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Locales(__DIR__.'/locale')),
    
    (new Extend\Model(User::class))
        ->dateAttribute('miserable_until'),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(AddUserMiserableAttributes::class),

    (new Extend\ApiSerializer(CurrentUserSerializer::class))
        ->attributes(AddCurrentUserMiserableAttributes::class),

    (new Extend\Event())
        ->listen(Saving::class, Listener\SaveMiserableToDatabase::class)
        ->listen(PostSaving::class, Listener\SetFakeFloodings::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, UserPolicy::class),

    (new Extend\Filter(UserFilterer::class))
        ->addFilter(MiserableFilterGambit::class),

    (new Extend\Settings())
        ->serializeToForum('miserable_users.loading_delay_min', 'the-turk-miserable-users.loading_delay_min')
        ->serializeToForum('miserable_users.loading_delay_max', 'the-turk-miserable-users.loading_delay_max')
        ->serializeToForum('miserable_users.broken_page_chance', 'the-turk-miserable-users.broken_page_chance')
        ->serializeToForum('miserable_users.redirection_page_url', 'the-turk-miserable-users.redirection_page_url')
        ->serializeToForum('miserable_users.redirection_chance', 'the-turk-miserable-users.redirection_chance')
        ->serializeToForum('miserable_users.log_out_chance', 'the-turk-miserable-users.log_out_chance'),

    (new Extend\SimpleFlarumSearch(UserSearcher::class))
        ->addGambit(MiserableFilterGambit::class)
];
