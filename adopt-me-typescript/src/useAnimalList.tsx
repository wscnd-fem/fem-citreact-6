import { useEffect, useState } from 'react';

import { Animal, AnimalListAPIResponse } from './typings/ApiResponseTypes';

const localCache: Record<string, string[]> = {};

enum Status {
  UNLOADED = 'unloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
}

export default function useAnimalList(animal: Animal): [string[], Status] {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [loading, setLoading] = useState(Status.UNLOADED);

  const requestBreedList = async (animal: Animal) => {
    setBreedList([]);
    setLoading(Status.LOADING);

    const res = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );

    const json = (await res.json()) as AnimalListAPIResponse;

    localCache[animal] = json.breeds || [];

    setBreedList(localCache[animal]);
    setLoading(Status.LOADED);
  };

  useEffect(() => {
    if (animal.length === 0) {
      setLoading(Status.UNLOADED);
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      void requestBreedList(animal);
    }
  }, [animal]);

  return [breedList, loading];
}
