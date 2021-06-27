<?php

namespace TheTurk\Miserable\Listener;

use DateTime;
use Flarum\Extension\ExtensionManager;
use Flarum\Post\Post;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\Post\Exception\FloodingException;
use Flarum\Settings\SettingsRepositoryInterface;

class SetFakeFloodings
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(PostSaving $event)
    {
        $actor = $event->actor;

        if ($actor->miserable_until) {
            $multiplier = $this->settings->get('the-turk-miserable-users.flood_time_multiplier', 1);
            
            // Flarum has 10 seconds time limit between posts to prevent spamming.
            // @see https://github.com/flarum/core/blob/fcb5778705af277307060da2aa12ce39debd04fb/src/Post/PostServiceProvider.php#L37
            $floodgate = floor(10 * ($multiplier > 0 ? $multiplier : 1));
    
            if (Post::where('user_id', $actor->id)->where('created_at', '>=', new DateTime(sprintf('-%d seconds', $floodgate)))->exists()) {
                throw new FloodingException();
            }

            $shufflePostChance = $this->settings->get('the-turk-miserable-users.shuffle_post_chance', 0);
            
            if ($shufflePostChance > mt_rand(0,99)) $event->post->content = str_shuffle($event->post->content);
        }        
    }
}