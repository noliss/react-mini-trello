import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes'
import { store } from './store/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        {
          Object.entries(routes).map(([key, value]) =>
            <Route
              exact
              key={key}
              path={value.path}
              component={value.component}
            />
          )
        }
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
