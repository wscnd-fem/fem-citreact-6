import React from 'react';

import { Link } from 'react-router-dom';

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = 'https://pets-images.dev-apis.com/pets/none.jpg';

  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`}>
      <img
        className="w-32 h-32 mx-auto bg-black rounded-full "
        src={hero}
        alt={name}
      />
      <h1 className="mt-6 text-sm font-medium text-gray-900">{name}</h1>
      <dl className="flex flex-col justify-between flex-grow mt-1">
        <dd className="text-sm text-gray-500">{animal}</dd>
        <dd className="text-sm text-gray-500">{breed}</dd>
        <dd className="text-sm text-gray-500">{location}</dd>
      </dl>
    </Link>
  );
};

export default Pet;
