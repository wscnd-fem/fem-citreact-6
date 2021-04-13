import Pet from './Pet';

const Results = (props) => (
  <div className="col-span-3">
    {!props.pets.length ? (
      <h3> Nothing to show</h3>
    ) : (
      // <ul className="">
      <ul className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {props.pets.map((pet) => {
          return (
            <li
              className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow hover:bg-gray-300"
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
