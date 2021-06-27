<?php

use Flarum\Database\Migration;

return Migration::addSettings([
    'the-turk-miserable-users.loading_delay_min' => '1',
    'the-turk-miserable-users.loading_delay_max' => '3',
    'the-turk-miserable-users.broken_page_chance' => '20',
    'the-turk-miserable-users.flood_time_multiplier' => '2',
    'the-turk-miserable-users.redirection_chance' => '15',
    'the-turk-miserable-users.redirection_page_url' => '',
    'the-turk-miserable-users.log_out_chance' => '2',
    'the-turk-miserable-users.shuffle_post_chance' => '0'
]);