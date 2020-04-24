/* global document */
import * as React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';

import App from './App';

import './index.css';

Sentry.init({
  dsn:
    'https://ffed4c5192a74b1691116f224bb787ef@o202486.ingest.sentry.io/5202072',
});

LogRocket.init('alex-lee/colorange');

ReactDOM.render(<App />, document.getElementById('root'));
