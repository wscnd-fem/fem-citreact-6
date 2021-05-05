import { FunctionComponent } from 'react';
import Pet from './Pet';
import { Pet as IPet } from './typings/ApiResponseTypes';

const Results: FunctionComponent<{ pets: IPet[] }> = (props) => (
  <div className="search">
    {!props.pets.length ? (
      <h3> Nothing to show</h3>
    ) : (
      props.pets.map((pet) => (
        <Pet
          key={pet.id}
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          images={pet.images}
          location={`${pet.city}, ${pet.state}`}
          id={pet.id}
        />
      ))
    )}
  </div>
);

export default Results;
