import {
  useEffect,
  useState
} from 'react';

import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import Details from './Details';
import Results from './Results';
import SearchParams from './SearchParams';

const Home = () => {
  const [pets, setPets] = useState([]);

  const requestPets = async (
    animal = '',
    breed = '',
    location = '',
    page = ''
  ) => {
    console.log(`requesting ${animal} - ${breed} - ${location} - ${page}`);
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`
    );
    const json = await res.json();
    setPets(json.pets);
  };

  // useEffect(() => {
  //   console.log('new pets', pets);
  // }, [pets]);

  useEffect(() => {
    // requestPets(animal, breed, location, page);
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Router>
        <header>
          <Link to="/">
            <h1>Adopt Me!</h1>
          </Link>
        </header>

        <Route
          path="/details/:id"
          component={Details}
          render={(props) => <Details {...props} />}
        />
        <Route exact path="/">
          <div className="search-params">
            <SearchParams req={requestPets} />
            <div className="search">
              <Results pets={pets} />
            </div>
          </div>
        </Route>
      </Router>
    </div>
  );
};

export default Home;
