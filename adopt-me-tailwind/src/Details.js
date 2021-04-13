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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => (window.location = 'http://bit.ly/pet-adopt');

  render() {
    if (this.state.loading) {
      return (
        <div>
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
      <div className="grid grid-cols-3 grid-rows-3 bg-green-200 border-2 rounded-lg shadow-lg grid-col1">
        <Carousel images={images} />
        <div className="col-start-2 col-end-4 row-start-2 row-end-4">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <p>{description}</p>
        </div>
        <ThemeContext.Consumer>
          {([theme]) => (
            <div className="flex items-center justify-center">
              <button
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm hover:opacity-50"
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}{' '}
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
        {showModal ? (
          <Modal>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Would you like to adopt {name}?
              </h3>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={this.adopt}
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
              >
                yes!
              </button>
              <button
                type="button"
                onClick={this.toggleModal}
                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                no, I&apos;m a monster!
              </button>
            </div>
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
