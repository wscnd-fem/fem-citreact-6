import { Fragment, Component } from 'react';

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
      <Fragment>
        {/* <div className="col-start-1 col-end-4 row-start-1 row-end-3"> */}
        <div className="flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-3">
          <img
            src={images[active]}
            // className="col-start-1 col-end-3 row-start-1 row-end-3 bg-black rounded-full w-60 h-60 "
            className="mt-5 bg-black rounded-md w-60 h-60"
            alt="animal"
          />
        </div>
        <div className="flex items-center justify-around col-span-2 col-start-2 ">
          {images.map((photo, index) => {
            return (
              <img
                src={photo}
                className="w-20 h-20 bg-black rounded-full md:w-28 xl:h-28 hover:shadow-xl hover:opacity-90"
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
      </Fragment>
    );
  }
}

export default Carousel;
