import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import Page from './components/page';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
     
  render() {
  return (
  <BrowserRouter>
   <Page/>
  </BrowserRouter>
  );
 }
}

export default App;
