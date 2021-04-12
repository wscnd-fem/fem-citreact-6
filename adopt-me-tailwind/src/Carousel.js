import { Component } from 'react';

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div>
        <img src={images[active]} alt="animal" />
        <div>
          {images.map((photo, index) => {
            return (
              <img
                src={photo}
                key={photo}
                // className={index === active ? 'active' : ''}
                alt="doggito thumbnail"
                data-index={index}
                onMouseOver={this.handleIndexClick}
                onFocus={console.log}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
