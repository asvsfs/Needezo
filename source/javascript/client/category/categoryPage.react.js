import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
import http from 'superagent';

export default class AddItem extends Component {

	constructor(props) {
    super(props);
    this.state = {list:[]}
  }

	componentDidMount(){
		var self = this;
		http
		.get("/categorylist")
		.accept('application/json')
		.end(function (err, res){
			console.log(res)
			self.setState({list:res.body.categoryList});
		});
	}

	render(){
		var self = this;
		const list = this.state.list.map((item, i)=>{

			return (<li key={i} ><Link to={"/cat/"+item} key={i+'a'}> {item} </Link></li>)
		})
		
		return(
			<div>
			<ul style={{listStyleType:'none'}}>
				{list}
			</ul>

			</div>
			)
	}


}