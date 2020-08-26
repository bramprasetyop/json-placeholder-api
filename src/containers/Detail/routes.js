import React from 'react';
import Posts from './components/posts';
import Album from './components/album';
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/users/:id/posts" component={Posts} />
        <Route path="/users/:id/album" component={Album} />
      </Switch>
    </React.Fragment>
  );
}

export default App;