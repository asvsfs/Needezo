import React from 'react';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
import Column from './column.react.js'
import ItemBox from '../components/itemBox.react.js';
import SearchBox from '../components/searchBox.react.js';
import Login from '../components/login.react.js';
import Modal from 'react-modal';
import AddItem from '../components/additem.react.js';
import DropdownList from '../util/DropdownList.react.js';
import http from 'superagent';


const itemModalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
 
  }
}
const loginStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
  	margin:" 0 auto",
  	width : '310px',
  	height : '320px',
    position : 'absolute',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
 
  }
}
export default class App extends Component {
	constructor(props) {
	    super(props);
	    this.state={columns : [],count:0,colone:true,
	    	coltwo:true,colthree:true,
	    	loginIsOpen:false,itemModal:false,
	    	isLogin:false,page:0,items:[],listHasChanged:false,userMode:false,
	    	loading:false
	    };
	    
	    this.dataFething = false;
	  }

	componentDidMount(){
		var self = this;
		

		window.addEventListener('resize',this.onResize.bind(this));

		this.setState({windowWidth:window.innerWidth,isLogin:window.localStorage.getItem('login')});
		

	  if (!navigator.geolocation){

	    alert("Geolocation is not supported by your browser");
	    return;
	  }

	  function success(position) {
	    var latitude  = position.coords.latitude;
	    var longitude = position.coords.longitude;
	    window.localStorage.setItem("locationX",latitude);
	    window.localStorage.setItem("locationY",longitude);

	  };

	  function error() {

	    alert("Unable to retrieve your location");
	  };

	  navigator.geolocation.getCurrentPosition(success, error);
		
		
	}

	render(){
		let self = this;

		var funcs = <span/>;
		
			if(this.state.isLogin == "true" ){
				funcs = 
					 <DropdownList>
						<a href="#" key={0} onClick={this.onAddItemClicked.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>Add Item</a>
						<Link to={`/myitem`}  key={1} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>My Items</Link>
						<a href="/logout" key={2} onClick={this.logout.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>Logout</a>
						
					</DropdownList>
			}else{
			 	funcs =<a href="#" onClick={this.onSignInClicked.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>Sign In</a>
			}
			
		return (
			<div>
			{this.state.loading == true ? 
				<div className="overlay">
				<img id="loading" src="http://bit.ly/pMtW1K"/>
				</div>:<span/> }
			
			<Modal 
				isOpen={this.state.loginIsOpen}
        onRequestClose={this.closeLoginModal.bind(self)}
        style={loginStyle}>
      	<Login onRequestClose={self.closeItemModal.bind(self)} loading={this.loading.bind(this)}/>
			</Modal>

			<Modal
				isOpen={this.state.itemModal}
				onRequestClose={this.closeItemModal.bind(self)}
				style={itemModalStyle}>
				<AddItem onRequestClose={self.closeItemModal.bind(self)} loading={this.loading.bind(this)} onClose={this.closeItemModal.bind(self)} />
			</Modal>	

			<div className="navbar">
				<div style={{fontSize:'20px', fontWeight:'800',display:'inline',float:'left',marginRight:'10px'}}>
						<img src="/assets/images/logosmall.png" height="70px"/>
				</div>

				{<ul className="ull">
					<li><Link to={`/category`} >Category</Link></li>
				</ul>}

				<SearchBox loading={this.loading.bind(this)}/>
				{funcs}
				<Link to={`/`} onClick={this.onHomeClicked.bind(this)} style={{display:'inline',textDecoration:'none',fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',marginRight:'10px'}} > Home</Link>
			</div>


 			{this.props.children && React.cloneElement(self.props.children , {loading:self.loading.bind(self)})}

			{/*<Grid col={[this.cs[0],this.cs[1],this.cs[2]]}/>*/}

			</div>
			);
	}

	
	loading(state){
		this.setState({loading:state})
	}
	onHomeClicked() {
		this.setState({page:0,items:[],userMode:false});
		this.fetchItems();
	}

	closeLoginModal() {
		this.setState({loginIsOpen:false})
	}

	onSignInClicked() {
		this.setState({loginIsOpen:true});
	}

	closeItemModal() {
		this.setState({itemModal:false});
		$("body").removeClass("modal-open");
	}

	onAddItemClicked(event) {
		this.setState({itemModal:true});
		$("body").addClass("modal-open");
		event.stopPropagation();
	}

	onMyItemsClicked() {
		this.setState({page:0,items:[],listHasChanged:true,userMode:true});
		this.fetchUserItems();
		
	}

	logout(){

	}

	onResize(){
		this.setState({windowWidth:window.innerWidth});
	}



}