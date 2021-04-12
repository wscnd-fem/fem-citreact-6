import Pet from './Pet';

const Results = (props) => (
  <div className="px-6 py-8 mx-3 mb-6 bg-red-100">
    {!props.pets.length ? (
      <h3> Nothing to show</h3>
    ) : (
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {props.pets.map((pet) => {
          return (
            <li
              className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow"
              key={pet.id}
            >
              <Pet
                key={pet.id}
                name={pet.name}
                animal={pet.animal}
                breed={pet.breed}
                images={pet.images}
                location={`${pet.city}, ${pet.state}`}
                id={pet.id}
              />
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export default Results;
