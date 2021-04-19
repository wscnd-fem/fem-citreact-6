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
      <Router>
        <Link to="/">
          <header className="flex justify-center bg-gray-200 px-8 mb-5">
            <img
              src="https://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png"
              alt="Adopt Me!"
            />
          </header>
        </Link>
        <Switch>
          <Route
            path="/details/:id"
            render={(props) => <Details {...props} />}
          />
          <Route path="/" component={SearchParams} />
        </Switch>
      </Router>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
