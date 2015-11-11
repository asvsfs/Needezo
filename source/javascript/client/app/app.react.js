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
import Grid from '../components/Grid.react.js';

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
	    this.cs = [[],[],[]];
	    this.dataFething = false;
	  }

	componentDidMount(){
		var self = this;
		this.dataFetching = true;

		

		$(window).scroll(function() {
			if(this.dataFetching == true ){
				return; 
			}
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		   	self.setState({page:self.state.page+1})

		   	self.state.userMode == false ? self.fetchItemsPage() : self.fetchUserItemsPage();
		   }
		});

		window.addEventListener('resize',this.onResize.bind(this));

		this.setState({windowWidth:window.innerWidth,isLogin:window.localStorage.getItem('login')});
		

	  if (!navigator.geolocation){

	  	// BAD PATTERN!
			self.fetchItems();

	    alert("Geolocation is not supported by your browser");
	    return;
	  }

	  function success(position) {
	    var latitude  = position.coords.latitude;
	    var longitude = position.coords.longitude;
	    window.localStorage.setItem("locationX",latitude);
	    window.localStorage.setItem("locationY",longitude);

	    // BAD PATTERN!
			self.fetchItems();
	  };

	  function error() {
	  	// BAD PATTERN!
			self.fetchItems();
	    alert("Unable to retrieve your location");
	  };

	  navigator.geolocation.getCurrentPosition(success, error);
		
		
	}

	render(){
		let self = this;

		if(this.state.listHasChanged){
			self.loadList();
		}

		var funcs = <span/>;
		
			if(this.state.isLogin == "true" ){
				funcs = 
					 <DropdownList>
						<a href="#" key={0} onClick={this.onAddItemClicked.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>Add Item</a>
						<a href="#" key={1} onClick={this.onMyItemsClicked.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>My Items</a>
						<a href="/logout" key={2} onClick={this.logout.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>Logout</a>
						<a href="/help" key={3} onClick={this.logout.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>FAQ/Help</a>
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
							<li>BasedOn</li>
							<li><a href="#">Date</a></li>
							<li><a href="#">Category</a></li>
							<li><a href="#">Location</a></li>
				</ul>}

				<SearchBox loading={this.loading.bind(this)}/>
				{funcs}
				<a href="#" style={{display:'inline',textDecoration:'none',fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',marginRight:'10px'}} onClick={this.onHomeClicked.bind(this)}> Home</a>
			</div>


			<Grid col={[this.cs[0],this.cs[1],this.cs[2]]}/>

			</div>
			);
	}

	loadList() {
		var self = this;
		var cur = 0 ; 
		this.cs[0] = [];
		this.cs[1] = [];
		this.cs[2] = [];
		for (var i = 0 ; i < this.state.items.length ;  i++){
			childItem = <ItemBox loading={self.loading.bind(self)} marginTop={0} marginLeft={0} data={this.state.items[i]} key={i}/>;
			this.cs[cur].push(childItem)
			cur++;
			if (cur > 2){
				cur = 0 ;
			}
		}
		listHasChanged = false;
	}

	fetchUserItems () {
		this.loading(true);
		var self = this;
		http
      .post("/tk/fetchItems/0")
      .send({})
      .accept('application/json')
      .end(function(err, res){
      	self.loading(false);
        if(err){
          console.log(err)
        }else {
        	if(res.body.status == false){
        		alert (res.body.messsage);return;
        	}
        	
        	self.setState({items:res.body.items || [],listHasChanged:true,page:0});
          console.log(res)
        }
      });
	}

	fetchUserItemsPage () {
		this.loading(true);
		var self = this;
		http
      .post("/tk/fetchItems/"+this.state.page)
      .send({})
      .accept('application/json')
      .end(function(err, res){
      	self.loading(false);
        if(err){
          console.log(err)
        }else {
        	if(res.body.status == false){
        		alert (res.body.messsage);return;
        	}
        	var page = self.state.page ;
        	if(res.body.items.length < 1 && self.state.page > 0){
        		page = page - 1;
        	}
        	self.setState({items:self.state.items.concat(res.body.items) || [],listHasChanged:true,page:page});
          console.log(res)
        }
      });
	}

	fetchItemsPage() {
		this.loading(true);

		var self = this;
		http
      .post("/fetchItems/"+this.state.page)
      .send({location:{x:window.localStorage.getItem("locationX"),y:window.localStorage.getItem("locationY")}})
      .accept('application/json')
      .end(function(err, res){
      	self.loading(false);
        if(err){
          console.log(err)
        }else {
        	var page = self.state.page ;
        	if(res.body.items.length < 1 && self.state.page > 0){
        		page = page - 1;
        	}
        	self.setState({items:self.state.items.concat(res.body.items) || [],listHasChanged:true,page:page});
          console.log(res)
        }
      });
	}

	fetchItems() {
		this.loading(true);
		var self = this;
		http
      .post("/fetchItems/0")
      .send({location:{x:window.localStorage.getItem("locationX"),y:window.localStorage.getItem("locationY")}})
      .accept('application/json')
      .end(function(err, res){
      	self.loading(false);
        if(err){
          console.log(err)
        }else {
        	
        	self.setState({items:res.body.items || [],listHasChanged:true,page:0});
          console.log(res)
        }
      });
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