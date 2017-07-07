// @flow

import ClientSideRender from 'spust-koa/lib/react/ClientSideRender';
import Files from 'spust-koa/lib/Files';
import React from 'react';
import Server from 'spust-koa/lib/Server';
import serve from 'spust-koa';

// process.env.PORT is provided by Spust in dev mode
const PORT = parseInt(process.env.PORT || 3000, 10);

// process.env.ASSETS_DIR is provided by Spust
const ASSETS_DIR = process.env.ASSETS_PATH || '';

export default serve(
  <Server port={PORT}>
    <Files dir={ASSETS_DIR} />
    <ClientSideRender />
  </Server>,
);
