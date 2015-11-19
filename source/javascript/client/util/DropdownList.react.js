import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
export default class DropdownList extends Component {

	constructor(props) {
    super(props);
    this.state = {isOpen:false}
  }

	componentDidMount(){
		var self = this;

		$(document).on('click', function(event) {
		  if (!$(event.target).closest('#dropdownControl').length) {
		    // Hide the menus.
		    self.setState({isOpen:false});
		  }
		});
	}

	render(){
		var self =this;
		const menu = this.props.children.map((item,index)=>{
			return (<li style={{display:'block',width:'400px'}} key={index}>{item}</li>);
		})

		return (
				<div ref="div" className="dropdown" >
					<li id="dropdownControl" style={{display:'inline',cursor:'pointer',fontSize:'14px',fontWeight:'600'}} onClick={this.onClick.bind(this)}		 ><a >Menu</a></li>
					{self.state.isOpen == true ? 
						<ul style={{position:'absolute',display:'inline',margin:'0',marginRight:'10px',marginTop:'25px',padding:'0'}}>
							{menu}
						</ul>
						:
						<span/>}
					
				</div>			
			);
	}

	onClick(event){
		this.setState({isOpen:!this.state.isOpen})
	}

}