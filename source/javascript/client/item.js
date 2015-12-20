import React from 'react';
import ReactDOM from 'react-dom';
import Item from './pages/item.react.js';

export default function main() {

const app = document.getElementById('app');
var props = JSON.parse(document.getElementById("props").innerHTML);

	ReactDOM.render(
	<Item item={props} />
  , 
	  app
	);

};

main();