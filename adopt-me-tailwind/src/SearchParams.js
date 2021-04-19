import { useContext, useEffect, useState, useLayoutEffect } from 'react';

import Results from './Results';
import ThemeContext from './ThemeContext';
import useAnimalList from './useAnimalList';

import ListBox from './Listbox';
import Button from './Button';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [animalList] = useAnimalList(animal);
  const [search, setSearch] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);

  const requestPets = async (animal, breed, location) => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  };

  useEffect(() => {
    setBreed('');
  }, [animal]);

  useLayoutEffect(() => {
    console.log(pets);
  }, [pets]);

  useEffect(() => {
    const func = async () => {
      setAnimal('');
      setLocation('');
      setBreed('');
      requestPets(animal, breed, location);
    };
    func();
    setSearch(false);
  }, [search]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    requestPets(animal, breed, location);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="">
      <div className="px-4 py-12 space-y-12 max-w-md mx-auto  bg-pink-300 rounded-md text-gray-700 ">
        <form
          className="flex flex-col space-y-6 divide-y-2 divide-red-100 justify-items-center items-center"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            requestPets(animal, breed, location);
          }}
        >
          <div className="w-64">
            <div className="flex justify-between">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="location"
              >
                Location
              </label>
              <span className="text-sm text-gray-500" id="email-optional">
                Optional
              </span>
            </div>
            <div className="mt-1">
              <input
                className="shadow-sm focus:ring-red-500 focus:border-red-700 block w-full sm:text-sm border-gray-300 rounded-md"
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>
          </div>

          <ListBox
            value={animal}
            onChange={setAnimal}
            disabled={false}
            array={ANIMALS}
            placeHolder={['Select Animal', 'Select Animal']}
            label={'Animal'}
          />

          {}

          <ListBox
            value={breed}
            onChange={setBreed}
            disabled={animal === ''}
            array={animalList}
            placeHolder={['Choose Animal', 'Select Breed']}
            label={'Breed'}
          />

          <ListBox
            value={theme}
            onChange={setTheme}
            disabled={false}
            array={['darkblue', 'peru', 'chartreuse', 'mediumorchid']}
            placeHolder={['Choose Animal', 'Select Breed']}
            label={'Color'}
            bg={theme}
          />

          <div className="py-5 mx-auto">
            <Button
              onClick={() => {
                if (breed !== '' || animal !== '' || location !== '') {
                  setSearch(true);
                } else {
                  console.log('not empty');
                }
              }}
              type="button"
              placeHolder="Reset"
            />
            <Button
              onClick={() => {}}
              type="submit"
              placeHolder="Submit"
              bg={theme}
            />
          </div>
        </form>
      </div>

      <Results pets={pets} />
    </div>
  );
};

/*  button {
    @apply inline-flex items-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm hover:opacity-50;
  } */

export default SearchParams;
