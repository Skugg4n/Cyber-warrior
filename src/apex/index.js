import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutLoggerApex from './WorkoutLoggerApex.js';
import { mockDirective, mockSessionStats } from './mockData.js';

ReactDOM.render(
  <WorkoutLoggerApex directive={mockDirective} stats={mockSessionStats} />,
  document.getElementById('root')
);
