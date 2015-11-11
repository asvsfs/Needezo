import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
export default class ItemBox extends Component {

	constructor(props) {
    super(props);
    
  }

	componentDidMount(){
		
	}

	render(){
		

		return (
				<div className="container" style={{width:this.props.windowWidth}}>
					<div className="col">
						{this.props.col[0]}
					</div>
					<div className="col">
						{this.props.col[1]}
					</div>
					<div className="col">
						{this.props.col[2]}
					</div>
				</div>			
			);
	}

}