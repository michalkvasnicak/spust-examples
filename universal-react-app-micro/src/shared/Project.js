// @flow

import React from 'react';
import Link from 'react-router-dom/Link';

export default function Project({ id }: { id: string }) {
  return (
    <div>
      <h1>
        Project id: {id}
      </h1>
      <Link to="/">Back to homepage</Link>
    </div>
  );
}
