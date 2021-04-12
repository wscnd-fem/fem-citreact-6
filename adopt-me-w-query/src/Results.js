import { Fragment } from 'react';

import Pagination from './Pagination';
import Pet from './Pet';

const Results = (props) => (
  <Fragment>
    {!props.pets.length ? (
      <h3> Nothing to show</h3>
    ) : (
      <Fragment>
        {props.pets.map((pet) => (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))}
        <Pagination />
      </Fragment>
    )}
  </Fragment>
);

export default Results;
