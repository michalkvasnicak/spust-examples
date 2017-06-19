// @flow

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// src/client/index.js
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/App';

OfflinePluginRuntime.install();

render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));
