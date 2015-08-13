'use strict'

import React from 'react';
import TestComponent from './components/TestComponent.jsx';
import '../public/stylesheets/style.css';

React.render(
  <TestComponent/>,
  document.getElementById("react-container")
);