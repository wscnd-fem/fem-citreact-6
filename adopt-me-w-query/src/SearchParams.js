import {
  useContext,
  useEffect,
  useState
} from 'react';

import {
  useHistory,
  useParams
} from 'react-router-dom';

import ThemeContext from './ThemeContext';
import useAnimalList from './useAnimalList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = (props) => {
  
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [animalList] = useAnimalList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  const [query, setQuery] = useState({ location, breed, animal });
  const history = useHistory();
  const { params: pageParams } = useParams();

  useEffect(() => {
    const appendToParams = (params, nameToAppend, value) => {
      if (value) {
        params.append(nameToAppend, value);
      } else {
        params.delete(nameToAppend);
      }
    };

    const { animal, breed, location } = query;
    const params = new URLSearchParams();

    appendToParams(params, 'animal', animal);
    appendToParams(params, 'breed', breed);
    appendToParams(params, 'location', location);

    console.log('page params:', pageParams);
    console.log('params:', params.toString());
    console.log('query', query);
    history.push({ search: params.toString() });
  }, [pageParams, query, history]);

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          props.req(animal, breed, location);
          setQuery({ animal, breed, location });
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option value="" />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!animalList.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option value="" />
            {animalList.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchParams;
