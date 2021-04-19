import Pet from './Pet';

const Results = (props) => (
  <div className=" col-start-2 col-span-2 ">
    <div className=" mx-auto py-12 px-4 max-w-7xl">
      <div className="space-y-12 bg-gray-300 ">
        <h2 className="text-3xl font-bold tracking-tight">Pets for Adoption</h2>
        {!props.pets.length ? (
          <p className="text-xl text-gray-500"> Nothing to show</p>
        ) : (
          <ul className="space-y-12  sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
            {props.pets.map((pet) => {
              return (
                <li key={pet.id}>
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
    </div>
  </div>
);

export default Results;
