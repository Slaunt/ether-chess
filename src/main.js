/* eslint-env browser */

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './components/root.jsx';

injectTapEventPlugin();

/**
 * Initialize root view.
 */
function load() {
  let container = document.getElementById('container');
  render(<Root />, container);
}

window.addEventListener('load', load);

// XXX: debug!
window.React = React;
