/* global document */
import * as React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import App from './App';

import './index.css';

Sentry.init({
  dsn:
    'https://ffed4c5192a74b1691116f224bb787ef@o202486.ingest.sentry.io/5202072',
});

ReactDOM.render(<App />, document.getElementById('root'));
