// @flow

import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Homepage from './Homepage';
import NotFound from './NotFound';
import Project from './Project';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Homepage />} />
        <Route path="/projects/:id" render={({ match }) => <Project id={match.params.id} />} />
        <Route
          render={({ staticContext }) => {
            if (staticContext) {
              // eslint-disable-next-line
              staticContext.status = 404;
            }

            return <NotFound />;
          }}
        />
      </Switch>
    </div>
  );
}
