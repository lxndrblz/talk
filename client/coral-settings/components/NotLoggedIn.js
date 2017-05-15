import React from 'react';
import styles from './NotLoggedIn.css';
import I18n from 'coral-i18n/modules/i18n/i18n';

const lang = new I18n();

export default ({showSignInDialog}) => (
  <div className={styles.message}>
    <div>
      <a onClick={showSignInDialog}>{lang.t('sign_in')}</a> {lang.t('toAccess')}
    </div>
    <div>
      {lang.t('from_settings_page')}
    </div>
  </div>
);
