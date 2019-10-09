import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../../store';

// Components
import Header from '../layout/Header';
import Map from './Map';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Map />
    </Router>
  );
};

export default App;
