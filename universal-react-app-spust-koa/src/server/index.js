// @flow

import Files from 'spust-koa/lib/Files';
import React from 'react';
import RenderApp from 'spust-koa/lib/RenderApp';
import Server from 'spust-koa/lib/Server';
import serve from 'spust-koa';
// eslint-disable-next-line
import { assets } from 'spust';
import { renderToString } from 'react-dom/server';
import type { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';

import App from '../shared/App';

// process.env.ASSETS_DIR is provided by Spust
const ASSETS_PATH = process.env.ASSETS_PATH || '';
// process.env.PORT is provided by Spust in dev mode
const PORT = parseInt(process.env.PORT || 3000, 10);

export default serve(
  <Server port={PORT}>
    <Files dir={ASSETS_PATH} />
    <RenderApp
      render={ctx => {
        const { css, js } = assets();

        const context: StaticRouterContext = {};
        const app = (
          <StaticRouter context={context} location={ctx.request.url}>
            <App />
          </StaticRouter>
        );

        const body = renderToString(app);

        return {
          body,
          stylesheets: css.map(href => ({ href })),
          scripts: js.map(src => ({ src })),
        };
      }}
    />
  </Server>,
);
