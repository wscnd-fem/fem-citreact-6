import { useState, useEffect } from 'react';

const localCache = {};

const state = Object.freeze({
  UNLOADED: 'unloaded',
  LOADING: 'loading',
  LOADED: 'loaded',
});

export default function useBreedList(animal = []) {
  const [breedList, setBreedList] = useState([]);
  const [loading, setLoading] = useState(state.UNLOADED);

  const requestBreedList = async (animal) => {
    setBreedList([]);
    setLoading(state.LOADING);

    const res = await fetch(
      `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );

    const json = await res.json();

    localCache[animal] = json.breeds || [];

    setBreedList(localCache[animal]);
    setLoading(state.LOADED);
  };

  useEffect(() => {
    if (animal.length === 0) {
      setLoading(state.UNLOADED);
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList(animal);
    }
  }, [animal]);

  return [breedList, loading];
}
