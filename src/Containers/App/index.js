import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home, NotFound} from '../';

//Switch and Routes to handle browsing history
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:id" component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default App
