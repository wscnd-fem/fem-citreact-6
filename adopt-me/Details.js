import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();

    const pet = json.pets[0] ?? [];
    console.log(pet);

    this.setState({
      loading: false,
      name: pet.name ?? '',
      animal: pet.animal ?? '',
      breed: pet.breed ?? '',
      city: pet.city ?? '',
      state: pet.state ?? '',
      description: pet.description ?? '',
    });
  }

  render() {
    const { animal, breed, city, description, name, state } = this.state;

    console.log(this.state);

    return (
      <div className="details">
        <div>
          {this.state.loading ? (
            <h1>loading ...</h1>
          ) : (
            <>
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
