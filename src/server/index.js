// @flow

// src/server/index.js
import micro, { send } from 'micro';
import React from 'react';
import { assets } from 'spust';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../shared/App';

const server = micro(async (req, res) => {
  const { css, js } = assets();

  const context: { status?: number } = {};
  const app = (
    <StaticRouter context={{}} location={req.url}>
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
        ${js.map(src => `<script src="${src}" />`).join('\n')}
      </body>
    </html>
  `;

  send(res, context.status || 200, payload);
});

// default port is 3000 provided by Spust in dev mode
server.listen(process.env.PORT);

export default server;
