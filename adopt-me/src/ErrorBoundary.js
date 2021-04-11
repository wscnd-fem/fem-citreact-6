import { Component } from 'react';

import {
  Link,
  Redirect
} from 'react-router-dom';

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error, info) {
    // log into sentry, azure, tracks, relic, etc...
    console.error('ErrorBoundary caught', error, info);

    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 3000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <div className="details">
          <h2>
            This listing has en error! <Link to="/">Click here</Link> to go back
            to the home page or wait 3 secs.
          </h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
