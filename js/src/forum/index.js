import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';

import Badge from 'flarum/components/Badge';
import Button from 'flarum/components/Button';
import Model from 'flarum/Model';
import Page from 'flarum/common/components/Page';
import User from 'flarum/models/User';
import UserControls from 'flarum/utils/UserControls';

import MiserableUserModal from './components/MiserableUserModal';

app.initializers.add('the-turk-miserable-users', () => {
  if (localStorage.getItem('breakFlarum')) {
    localStorage.removeItem('breakFlarum');

    try {
      undefinedFunction();
    } catch (e) {
      // to prevent console log messages
      window.onerror = () => true;

      // throw an uncaught error
      throw new Error();
    }
  }

  User.prototype.canMiserable = Model.attribute('canMiserable');
  User.prototype.canMiserableOthers = Model.attribute('canMiserableOthers');
  User.prototype.miserableUntil = Model.attribute('miserableUntil', Model.transformDate);

  // Breaks Flarum by calling an undefined function.
  const breakFlarum = () => {
    localStorage.setItem('breakFlarum', true);
    window.location = window.location.href;
  };

  const redirectToUrl = () => {
    const redirectTo = app.forum.attribute('miserable_users.redirection_page_url');
    window.location = redirectTo ? redirectTo : app.forum.attribute('baseUrl');
  };

  const logOut = () => setTimeout(app.session.logout.bind(app.session), 0);

  // Shuffles an array.
  // @see https://stackoverflow.com/a/12646864
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Calls a random function from provided list.
  // @see https://stackoverflow.com/a/50269102
  const callRandomFunction = (list) => {
    var rand = Math.random(); // get a random number between 0 and 1
    var accumulatedChance = 0; // used to figure out the current

    if (list.length > 1) shuffleArray(list);

    var found = list.find(function (element) {
      // iterate through all elements
      accumulatedChance += element.chance / 100; // accumulate the chances
      return accumulatedChance >= rand; // tests if the element is in the range and if yes this item is stored in 'found'
    });

    if (found) found.func();
  };

  // A hacky solution to mimic the C++'s sleep function.
  const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate;

    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };

  // This extender will either broke the Flarum or redirect to specified URL.
  extend(Page.prototype, 'oninit', function () {
    const user = app.session.user;

    const list = [
      { chance: app.forum.attribute('miserable_users.broken_page_chance'), func: breakFlarum },
      { chance: app.forum.attribute('miserable_users.redirection_chance'), func: redirectToUrl },
    ];

    if (user && user.miserableUntil() && new Date() < user.miserableUntil()) callRandomFunction(list);
  });

  // This extender will log out the user randomly.
  extend(Page.prototype, 'oncreate', function () {
    const user = app.session.user;

    const list = [{ chance: app.forum.attribute('miserable_users.log_out_chance'), func: logOut }];

    if (user && user.miserableUntil() && new Date() < user.miserableUntil()) callRandomFunction(list);
  });

  // This extender will slow down the browsing experience.
  extend(Page.prototype, 'onbeforeupdate', function () {
    const user = app.session.user;

    if (user && new Date() < user.miserableUntil()) {
      const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
      const minLoadingDelay = app.forum.attribute('miserable_users.loading_delay_min');
      const maxLoadingDelay = app.forum.attribute('miserable_users.loading_delay_max');

      sleep(randomIntFromInterval(minLoadingDelay, maxLoadingDelay) * 1000);
    }
  });

  // This extender adds "Miserable User" button into UserPage's Controls dropdown.
  extend(UserControls, 'moderationControls', (items, user) => {
    if (user && user.canMiserable()) {
      items.add(
        'miserable',
        Button.component(
          {
            icon: 'fas fa-sad-cry',
            onclick: () => app.modal.show(MiserableUserModal, { user }),
          },
          app.translator.trans('the-turk-miserable-users.forum.user_controls.miserable_user_button')
        )
      );
    }
  });

  // This extender adds a badge for miserable user.
  // This badge should only visible to users those have
  // classing others as miserable privileges.
  extend(User.prototype, 'badges', function (items) {
    const user = app.session.user;

    if (user && user.canMiserableOthers() && new Date() < this.miserableUntil()) {
      items.add(
        'miserable-user',
        Badge.component({
          icon: 'far fa-sad-cry',
          type: 'miserable',
          label: app.translator.trans('the-turk-miserable-users.forum.user_badge.miserable_user_tooltip'),
        })
      );
    }
  });
});
