import React from 'react';
import ReactDOM from 'react-dom';
import Attraction from './components/Attraction';
import './styles/styles.css';
import Router from './components/Router';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Router/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
