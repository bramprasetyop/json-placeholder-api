import React from 'react';
import Home from './containers/Home/index';
import Detail from './containers/Detail/index';
import './App.scss';
import { Provider } from 'react-redux'
import store from './store/index'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header/>
          <Switch>
            <Route exact path="/" component= {Home}/>
            <Route path="/users/:id" component= {Detail}/>
            {/* <Route component= {NotFound}/> */}
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;