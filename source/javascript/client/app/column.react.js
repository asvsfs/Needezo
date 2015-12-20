import React from 'react';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
export default class Column extends Component {

	constructor(props) {
    super(props);
    
  }

	componentDidMount(){

	}

	render(){
		var columns =[1,2,3,];
		var cols = columns.map((val,index)=>{
			return (<div> Hello </div>)
		});
		cols.push(<div> NA HELLO </div>);
		console.log(cols) ;

		return (
			this.props.detail == null ? <span/> :
				<div className={this.props.detail.className} style={{width:this.props.detail.width}}>
					WHAT?
				</div>
			
			
			);
	}

}