import React, { Component } from 'react';
import TodoApp from './TodoApp';
import Header from './Header';

import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from '@material-ui/core';
import welcome from './welcome';
import Footer from './footer';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={welcome} />
          <Route path="/new" exact component={TodoApp} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
