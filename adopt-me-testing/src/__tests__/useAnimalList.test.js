import { expect, test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import useAnimalList from '../useAnimalList';

test('gives an empty array with no animal', async () => {
  const { result } = renderHook(() => useAnimalList(''));
  const [breedList, loading] = result.current;

  expect(breedList).toHaveLength(0);
  expect(loading).toBe('unloaded');
});

test('gives back breeds with an animal', async () => {
  const breeds = ['Havanese', 'Bichon Frise', 'Poodle', 'Corgie'];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: 'dog',
      breeds,
    })
  );

  const { result, waitForNextUpdate } = renderHook(() => useAnimalList('dog'));

  await waitForNextUpdate();

  const [breedList, status] = result.current;

  expect(status).toBe('loaded');
  expect(breedList).toEqual(breeds);
});
