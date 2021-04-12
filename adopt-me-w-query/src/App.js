import {
  StrictMode,
  useState
} from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './Home';
import ThemeContext from './ThemeContext';

const App = () => {
  const theme = useState('darkblue');

  return (
    <ThemeContext.Provider value={theme}>
      <Router>
        <Route path="/">
          <Home />
        </Route>
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
