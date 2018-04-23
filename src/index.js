import React from 'react';
import ReactDOM from 'react-dom';
import {Grid} from './grid';
import './styles.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

ReactDOM.render(<ErrorBoundary><Grid /></ErrorBoundary>, document.getElementById('app'));
