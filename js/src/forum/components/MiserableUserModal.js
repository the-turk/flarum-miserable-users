/**
 * Modified from:
 * https://github.com/flarum/suspend/blob/master/js/src/forum/components/SuspendUserModal.js
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

import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

import Stream from 'flarum/utils/Stream';
import withAttr from 'flarum/utils/withAttr';

export default class MiserableUserModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    let until = this.attrs.user.miserableUntil();
    let status = null;

    if (new Date() > until) until = null;

    if (until) {
      if (until.getFullYear() === 9999) status = 'indefinitely';
      else status = 'limited';
    }

    this.status = Stream(status);
    this.daysRemaining = Stream(status === 'limited' && -dayjs().diff(until, 'days') + 1);
  }

  className() {
    return 'MiserableUserModal Modal--small';
  }

  title() {
    return app.translator.trans('the-turk-miserable-users.forum.miserable_user.title', { user: this.attrs.user });
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('the-turk-miserable-users.forum.miserable_user.status_heading')}</label>
            <div>
              <label className="checkbox">
                <input type="radio" name="status" checked={!this.status()} value="" onclick={withAttr('value', this.status)} />
                {app.translator.trans('the-turk-miserable-users.forum.miserable_user.not_miserable_label')}
              </label>

              <label className="checkbox">
                <input
                  type="radio"
                  name="status"
                  checked={this.status() === 'indefinitely'}
                  value="indefinitely"
                  onclick={withAttr('value', this.status)}
                />
                {app.translator.trans('the-turk-miserable-users.forum.miserable_user.indefinitely_label')}
              </label>

              <label className="checkbox MiserableUserModal-days">
                <input
                  type="radio"
                  name="status"
                  checked={this.status() === 'limited'}
                  value="limited"
                  onclick={(e) => {
                    this.status(e.target.value);
                    m.redraw.sync();
                    this.$('.MiserableUserModal-days-input input').select();
                    e.redraw = false;
                  }}
                />
                {app.translator.trans('the-turk-miserable-users.forum.miserable_user.limited_time_label')}
                {this.status() === 'limited' ? (
                  <div className="MiserableUserModal-days-input">
                    <input
                      type="number"
                      min="0"
                      value={this.daysRemaining()}
                      oninput={withAttr('value', this.daysRemaining)}
                      className="FormControl"
                    />
                    {app.translator.trans('the-turk-miserable-users.forum.miserable_user.limited_time_days_text')}
                  </div>
                ) : (
                  ''
                )}
              </label>
            </div>
          </div>

          <div className="Form-group">
            <Button className="Button Button--primary" loading={this.loading} type="submit">
              {app.translator.trans('the-turk-miserable-users.forum.miserable_user.submit_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    let miserableUntil = null;
    switch (this.status()) {
      case 'indefinitely':
        miserableUntil = new Date('2038-01-01');
        break;

      case 'limited':
        miserableUntil = dayjs().add(this.daysRemaining(), 'days').toDate();
        break;

      default:
      // no default
    }

    this.attrs.user.save({ miserableUntil }).then(() => this.hide(), this.loaded.bind(this));
  }
}
