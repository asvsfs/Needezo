import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import App from './app/app.react.js';
import ShopHome from './shop/shop.react.js';
// // TODO: Add app storage example.
// // import storage from 'redux-storage';



export default function main() {
const app = document.getElementById('app');

	ReactDOM.render(
	<App/>
  , 
	  app
	);


}