<?php

/**
 * Modified from:
 * https://github.com/flarum/suspend/blob/master/src/Listener/SaveSuspensionToDatabase.php
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2019-2021 Stichting Flarum (Flarum Foundation)
 * Copyright (c) 2014-2019 Toby Zerner (toby.zerner@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

namespace TheTurk\Miserable\Listener;

use DateTime;
use TheTurk\Miserable\MiserableValidator;
use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveMiserableToDatabase
{
    /**
     * Validator for limited suspension.
     *
     * @var MiserableValidator
     */
    protected $validator;

    /**
     * @param MiserableValidator $validator
     * @param Dispatcher $events
     */
    public function __construct(MiserableValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (array_key_exists('miserableUntil', $attributes)) {
            $this->validator->assertValid($attributes);

            $user = $event->user;
            $actor = $event->actor;

            $actor->assertCan('miserable', $user);

            $user->miserable_until = $attributes['miserableUntil']
                ? new DateTime($attributes['miserableUntil'])
                : null;
        }
    }
}