// @flow

import React from 'react';
import Link from 'react-router-dom/Link';

export default function NotFound() {
  return (
    <div>
      <h1>Project not found</h1>
      <Link to="/">Back to homepage</Link>
    </div>
  );
}
