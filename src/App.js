import React, { useState } from 'react';
import './App.css';
import Dogs from './components/Dogs';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import SDogs from './components/sDogs';

export const AppContext = React.createContext(null);

function App() {
  const [dogs, setDogs] = useState('');
  const [prevImgs, setPrevImg] = useState({});

  function allClicked(breed, img) {
    setPrevImg({...prevImgs, [breed]: img});
  }

  return (
    <Router>
      <AppContext.Provider
        value={{
          dogs,
          prevImgs,
          allClicked,
          setDogs
        }}
      >
        <Switch>
          <Route exact path='/'> <Dogs /> </Route>
          <Route path='/view' exact> <SDogs /> </Route>
        </Switch>
      </AppContext.Provider>

    </Router>
  );
}



export default App;
