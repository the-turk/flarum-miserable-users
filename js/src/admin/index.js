import app from 'flarum/admin/app';
import withAttr from 'flarum/utils/withAttr';

app.initializers.add('the-turk-miserable-users', (app) => {
  const setMinLoadingDelay = (minLoadingDelay, maxLoadingDelay, value) => {
    minLoadingDelay(value);
    maxLoadingDelay(Math.max(value, maxLoadingDelay()));
  };

  app.extensionData
    .for('the-turk-miserable-users')
    .registerSetting(function () {
      const minLoadingDelay = this.setting('the-turk-miserable-users.loading_delay_min');
      const maxLoadingDelay = this.setting('the-turk-miserable-users.loading_delay_max');

      return (
        <div className="Form-group">
          <label>{app.translator.trans('the-turk-miserable-users.admin.settings.loading_delay_label')}</label>
          <div className="helpText">{app.translator.trans('the-turk-miserable-users.admin.settings.loading_delay_text')}</div>
          <div className="MiserableUsers-rangeInput">
            <input
              className="FormControl"
              type="number"
              min="0"
              value={minLoadingDelay()}
              oninput={withAttr('value', setMinLoadingDelay.bind(this, minLoadingDelay, maxLoadingDelay))}
            />
            {app.translator.trans('the-turk-miserable-users.admin.settings.range_separator_text')}
            <input className="FormControl" type="number" min={minLoadingDelay()} bidi={maxLoadingDelay} />
            {app.translator.trans('the-turk-miserable-users.admin.settings.range_seconds_text')}
          </div>
        </div>
      );
    })
    .registerSetting({
      setting: 'the-turk-miserable-users.broken_page_chance',
      type: 'number',
      label: app.translator.trans('the-turk-miserable-users.admin.settings.broken_page_chance_label'),
      help: app.translator.trans('the-turk-miserable-users.admin.settings.broken_page_chance_text'),
    })
    .registerSetting({
      setting: 'the-turk-miserable-users.flood_time_multiplier',
      type: 'number',
      label: app.translator.trans('the-turk-miserable-users.admin.settings.flood_time_multiplier_label'),
      help: app.translator.trans('the-turk-miserable-users.admin.settings.flood_time_multiplier_text'),
    })
    .registerSetting({
      setting: 'the-turk-miserable-users.redirection_chance',
      type: 'number',
      label: app.translator.trans('the-turk-miserable-users.admin.settings.redirection_chance_label'),
      help: app.translator.trans('the-turk-miserable-users.admin.settings.redirection_chance_text'),
    })
    .registerSetting({
      setting: 'the-turk-miserable-users.redirection_page_url',
      label: app.translator.trans('the-turk-miserable-users.admin.settings.redirection_page_url_label'),
      help: app.translator.trans('the-turk-miserable-users.admin.settings.redirection_page_url_text'),
    })
    .registerSetting({
      setting: 'the-turk-miserable-users.log_out_chance',
      type: 'number',
      label: app.translator.trans('the-turk-miserable-users.admin.settings.log_out_chance_label'),
      help: app.translator.trans('the-turk-miserable-users.admin.settings.log_out_chance_text'),
    })
    .registerPermission(
      {
        icon: 'fas fa-sad-cry',
        label: app.translator.trans('the-turk-miserable-users.admin.permissions.miserable_user_label'),
        permission: 'user.miserable',
      },
      'moderate'
    );
});
