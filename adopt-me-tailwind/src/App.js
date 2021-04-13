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
      <div className="float-none w-11/12 m-auto mx-auto my-0 max-w-7xl">
        <Router>
          <header className="w-full mb-10 text-6xl text-center text-white p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 hover:text-gray-500">
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
