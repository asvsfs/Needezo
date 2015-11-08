import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
export default class ItemBox extends Component {

	constructor(props) {
    super(props);
    
  }

	componentDidMount(){
		console.log(ReactDOM.findDOMNode(this.refs.div).offsetHeight);
	}

	render(){
		

		return (
				<div ref="div" className="itemBox" style={{/*position:'absolute',marginTop:this.props.marginTop,marginLeft:this.props.marginLeft,width:'385px',maxHeight:'305',*/}}>
					<div className="itemHeader">
						<span style={{fontSize:'16px',
						fontWeight:'600',
						display:'inline',
						float:'left',
				    marginTop: '10px',
   					marginLeft: '5px'}}>{this.props.data.title}</span>

						<div style={{fontSize:'12px',display:'inline',float:'right',
				    marginTop: '10px',
   					marginRight: '5px'}}>
   						<span style={{display:'block'}}>10/10/2015</span>
   						<span style={{display:'block'}}>15km</span>
   					</div>

					</div>
					<div style={{marginTop:'0px',marginLeft:'10px',marginBottom:'10px',marginRight:'10px'}}>
						<div className="text">
							{this.props.data.description}
						</div>
						<img src={this.props.data.imageUrl[0]}/>
					</div>
					<div className="itemFooter">
						<span style={{fontSize:'12px',color:'#244470',
							fontWeight:'600',
							display:'inline',
							float:'left',
					    marginTop: '10px',
	   					marginLeft: '5px'}}>200-300 euros</span>
							<span style={{fontWeight:'800',color:'#244470',
							fontSize:'14px',
							display:'inline',
							float:'right',
					    marginTop: '10px',
	   					marginRight: '5px'}}>Got It!</span>
					</div>
				</div>			
			);
	}

}