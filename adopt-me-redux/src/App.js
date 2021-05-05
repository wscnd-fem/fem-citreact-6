import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Details from './Details';
import store from './Redux/store';
import SearchParams from './SearchParams';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <header>
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
    </Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
