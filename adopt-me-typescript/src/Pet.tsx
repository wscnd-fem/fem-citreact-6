import React, { FunctionComponent } from 'react';

import { Link } from 'react-router-dom';
import { Pet } from './typings/ApiResponseTypes';

type IProps = Pick<Pet, 'id' | 'name' | 'breed' | 'images' | 'animal'> & {
  location: string;
};

const Pet: FunctionComponent<IProps> = ({
  name,
  animal,
  breed,
  images,
  location,
  id,
}) => {
  let hero = 'https://pets-images.dev-apis.com/pets/none.jpg';

  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
