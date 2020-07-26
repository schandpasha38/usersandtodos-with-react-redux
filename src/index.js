import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NotFound from './components/NotFound'
import { Provider } from "react-redux"
import store from './components/redux/store'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css'


ReactDOM.render(<Provider store={store}> 
<BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
