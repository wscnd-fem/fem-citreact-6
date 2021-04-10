import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from './Carousel';

class Details extends Component {
  state = {
    loading: true,
    name: '',
    animal: '',
    breed: '',
    city: '',
    state: '',
    description: '',
  };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();

    const pet = json.pets[0] ?? [];
    console.log(pet);

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
    const {
      animal,
      breed,
      city,
      description,
      name,
      state,
      images,
    } = this.state;

    return (
      <div className="details">
        <div>
          {this.state.loading ? (
            <h1>loading ...</h1>
          ) : (
            <>
              <Carousel images={images} />
              <h1>{name}</h1>
              <h2>
                {animal} - {breed} - {city}, {state}
              </h2>
              <button>Adopt {name} </button>
              <p>{description}</p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
