import React from 'react';
import { render } from 'react-dom';

import Root from './components/root.jsx';

function load() {
  console.clear();

  let container = document.getElementById('container');
  render(<Root />, container);
}

window.addEventListener('load', load);
