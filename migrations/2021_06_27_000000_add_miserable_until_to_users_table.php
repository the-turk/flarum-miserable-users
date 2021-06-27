<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'miserable_until' => ['dateTime', 'nullable' => true]
]);