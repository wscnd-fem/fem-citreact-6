import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from './Carousel';
import { ErrorBoundary } from './ErrorBoundary';

class Details extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();

    const pet = json.pets[0] ?? [];

    this.setState({
      loading: false,
      name: pet.name,
      animal: pet.animal,
      breed: pet.breed,
      city: pet.city,
      state: pet.state,
      description: pet.description,
      images: pet.images,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="details">
          <h1>loading ...</h1>
        </div>
      );
    }

    const {
      animal,
      breed,
      city,
      description,
      name,
      state,
      images,
    } = this.state;

    console.log(animal, breed, city, description);

    if (!animal) {
      throw new Error('error!');
    }

    return (
      <div className="details">
        <div>
          <Carousel images={images} />
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button>Adopt {name} </button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
