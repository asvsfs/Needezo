import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
export default class SearchBox extends Component {

	constructor(props) {
    super(props);
    
  }

	componentDidMount(){
		
	}

	render(){


		return (

			
				<div ref="div" className="searchBox">
					<input type="text" placeholder="Search..." className="search" required />
    			<input type="button" value="Search"  className="button"/> 
				</div>			
			);
	}


}