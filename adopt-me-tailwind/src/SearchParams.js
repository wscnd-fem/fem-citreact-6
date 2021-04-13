import { useContext, useEffect, useState } from 'react';

import Results from './Results';
import ThemeContext from './ThemeContext';
import useAnimalList from './useAnimalList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [animalList] = useAnimalList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

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

  return (
    <div className="grid grid-cols-4 gap-4 ">
      <div>
        <form
          className="items-start p-10 bg-gray-200 divide-y divide-gray-900 rounded-lg shadow-lg"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            requestPets(animal, breed, location);
          }}
        >
          <label
            className="flex flex-col items-center justify-center w-full pt-4 mb-4 text-center"
            htmlFor="location"
          >
            Location
            <input
              className="w-40 h-auto px-4 py-2 rounded-md"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </label>

          <label
            className="flex flex-col items-center justify-center w-full pt-4 mb-4 text-center"
            htmlFor="animal"
          >
            Animal
            <select
              className="w-40 h-auto px-4 py-2 rounded-md"
              id="animal"
              value={animal}
              onChange={(e) => {
                e.target.value==="" ? setBreed("") : null
                setAnimal(e.target.value)
              }}
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

          <label
            className="flex flex-col items-center justify-center w-full pt-4 mb-4 text-center"
            htmlFor="breed"
          >
            Breed
            <select
              className="w-40 h-auto px-4 py-2 rounded-md disabled:opacity-40"
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

          <label
            className="flex flex-col items-center justify-center w-full pt-4 mb-4 text-center"
            htmlFor="theme"
          >
            Theme
            <select
              className="w-40 h-auto px-4 py-2 rounded-md"
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

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
