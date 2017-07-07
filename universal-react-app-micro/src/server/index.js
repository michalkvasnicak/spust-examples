// @flow

import micro, { send } from 'micro';
import React from 'react';
import staticServerHandler from 'serve/lib/server';
// eslint-disable-next-line
import { assets } from 'spust';
import { renderToString } from 'react-dom/server';
import type { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { parse } from 'url';

import App from '../shared/App';

// ASSET_DIR is used by serve's server handler
// this is coppied from server/bin/serve.js
process.env.ASSET_DIR = `/${Math.random().toString(36).substr(2, 10)}`;

const server = micro(async (req, res) => {
  const url = parse(req.url);

  // try to serve only files with extensions *.*
  // this is just a hack because I haven't found nice static files serving middleware for micro
  if (url.pathname && url.pathname.match(/\..+$/)) {
    return staticServerHandler(req, res, {}, process.env.ASSETS_PATH);
  }

  const { css, js } = assets();

  const context: StaticRouterContext = {};
  const app = (
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );

  const html = renderToString(app);
  const payload = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Spust</title>
        ${css.map(href => `<link href="${href}" rel="stylesheet" />`).join('\n')}
      </head>
      <body>
        <div id="app">${html}</div>
        ${js.map(src => `<script src="${src}"></script>`).join('\n')}
      </body>
    </html>
  `;

  return send(res, context.status || 200, payload);
});

// default port is 3000 provided by Spust in dev mode
server.listen(process.env.PORT || 3000);

export default server;
