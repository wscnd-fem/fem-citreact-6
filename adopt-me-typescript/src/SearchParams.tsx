import { useContext, useEffect, useState, FunctionComponent } from 'react';

import Results from './Results';
import ThemeContext from './ThemeContext';
import useAnimalList from './useAnimalList';

import { Animal, Pet, PetApiResponse } from './typings/ApiResponseTypes';
import { RouteComponentProps } from 'react-router-dom';

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState<Animal>('');
  const [breed, setBreed] = useState<string>('');
  const [animalList] = useAnimalList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  const requestPets = async (
    animal: Animal,
    breed: string,
    location: string
  ) => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = (await res.json()) as PetApiResponse;
    setPets(json.pets);
    console.log(pets);
  };

  useEffect(() => {
    void requestPets(animal, breed, location);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-params">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          void requestPets(animal, breed, location);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location" /** @type {import('webpack').Configuration} */
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value as Animal)}
            onBlur={(e) => setAnimal(e.target.value as Animal)}
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
            {animalList.map((breed: string) => (
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

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
