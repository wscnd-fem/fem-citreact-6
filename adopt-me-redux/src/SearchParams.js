import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Results from './Results';
import useAnimalList from './useAnimalList';
import {
  changeAnimal,
  changeBreed,
  changeLocation,
  changeTheme,
} from './Redux/actionCreators/index';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  // const { animal, breed, location, theme } = useSelector(s=>s)
  const animal = useSelector((state) => state.animal);
  const location = useSelector((state) => state.location);
  const theme = useSelector((state) => state.theme);
  const breed = useSelector((state) => state.breed);
  const [pets, setPets] = useState([]);
  const [animalList] = useAnimalList(animal);
  const dispatch = useDispatch();

  const requestPets = async (animal, breed, location) => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
    console.log(pets);
  };

  useEffect(() => {
    requestPets(animal, breed, location);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function handleAnimalChange(e) {
    dispatch(changeAnimal(e.target.value));
    dispatch(changeBreed(''));
  }

  return (
    <div className="search-params">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          requestPets(animal, breed, location);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={(e) => dispatch(changeLocation(e.target.value))}
            placeholder="Location" /** @type {import('webpack').Configuration} */
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={handleAnimalChange}
            onBlur={handleAnimalChange}
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
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
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
            onChange={(e) => dispatch(changeTheme(e.target.value))}
            onBlur={(e) => dispatch(changeTheme(e.target.value))}
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

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
