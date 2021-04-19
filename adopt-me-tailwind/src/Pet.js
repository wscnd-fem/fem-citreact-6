import React from 'react';

import { Link } from 'react-router-dom';

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = 'https://pets-images.dev-apis.com/pets/none.jpg';

  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`}>
      <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-3">
        <img
          className="object-cover shadow-lg rounded-lg"
          src={hero}
          alt={name}
        />
      </div>
      <div>
        <h1 className="">{name}</h1>
        <dl className="">
          <dd className="">{animal}</dd>
          <dd className="">{breed}</dd>
          <dd className="">{location}</dd>
        </dl>
      </div>
    </Link>
  );
};

export default Pet;
