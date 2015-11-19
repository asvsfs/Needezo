import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app.react.js';
import ShopHome from './shop/shop.react.js';
import Category from './category/categoryPage.react.js';
import MainPage from './mainpage/mainPage.react.js';
import MyItem from './pages/myitem.react.js';

// using an ES6 transpiler, like babel
import { Router, Route, Link, IndexRoute } from 'react-router'


export default function main() {
const app = document.getElementById('app');

	ReactDOM.render(
	<Router>
    <Route path="/" component={App}>
      <Route path="/category" component={Category}/>
      <IndexRoute component={MainPage}/>
      <Route path="/cat/:cat" component={MainPage}/>
      <Route path="/myitem" component={MyItem}/>

    </Route>
  </Router>
  , 
	  app
	);


}