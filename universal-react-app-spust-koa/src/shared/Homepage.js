// @flow

import React from 'react';
import Link from 'react-router-dom/Link';

export default function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        <li>
          <Link to="/projects/abcde">Project abcde</Link>
        </li>
        <li>
          <Link to="/projects/abcdef">Project abcdef</Link>
        </li>
      </ul>
    </div>
  );
}
