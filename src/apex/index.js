const { render } = ReactDOM;

render(
  <WorkoutLoggerApex directive={window.mockDirective} stats={window.mockSessionStats} />,
  document.getElementById('root')
);
