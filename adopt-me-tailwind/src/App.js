import { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Details from './Details';
import SearchParams from './SearchParams';
import ThemeContext from './ThemeContext';

const App = () => {
  const theme = useState('darkblue');

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className="p-0 m-0"
        style={{
          background:
            'url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)',
          backgroundRepeat: 'repeat',
        }}
      >
        <Router>
          <header className="header">
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route
              path="/details/:id"
              render={(props) => <Details {...props} />}
            />
            <Route path="/" component={SearchParams} />
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
