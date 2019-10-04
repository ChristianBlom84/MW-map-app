import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from '../layout/Header';
import Map from './Map';

function App() {
  return (
    <main>
      <Header />
      <Map />
    </main>
  );
}

export default App;
