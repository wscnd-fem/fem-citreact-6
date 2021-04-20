import { Component } from 'react';

import { withRouter } from 'react-router-dom';

import Carousel from './Carousel';
import { ErrorBoundary } from './ErrorBoundary';
import Modal from './Modal';
import ThemeContext from './ThemeContext';

class Details extends Component {
  state = {
    loading: true,
    showModal: false,
  };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();

    const pet = json.pets[0] ? json.pets[0] : [];

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => (window.location = 'http://bit.ly/pet-adopt');

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
      showModal,
    } = this.state;

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
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}{' '}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
        {showModal ? (
          <Modal>
            <h1>Would you like to adopt {name}?</h1>
            <button onClick={this.adopt}>yes!</button>
            <button onClick={this.toggleModal}>no, I&apos;m a monster!</button>
          </Modal>
        ) : null}
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
