import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import Upload from './components/Upload/Upload';
import Welcome from './components/Welcome/Welcome';
import Catalog from './components/Catalog/Catalog';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Route path='/' exact component={Welcome} />
        <Route path='/upload' component={Upload} />
        <Route path='/catalog' component={Catalog} />
      </BrowserRouter>
    </div>
  );
}

export default App;
