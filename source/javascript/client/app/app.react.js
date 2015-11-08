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
  	height : '220px',
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
	    	isLogin:false,page:0,items:[],listHasChanged:false
	    };
	    this.cs = [[],[],[]];
	    this.dataFething = false;
	    this.items = [
				{
					"title":' Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo '
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'

				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":' Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":' Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":' Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo '
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
					+'Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":' Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":"Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo"
				},
				{
					"title":"Hallo"
				},
				{
					"title":' Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo Hallo'
				}

		]

	  }

	componentDidMount(){
		var self = this;
		this.dataFetching = true;

		// BAD PATTERN!
		self.fetchItems();

		$(window).scroll(function() {
			if(this.dataFetching == true ){
				return; 
			}
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		       self.fetchItems();
		   }
		});

		window.addEventListener('resize',this.onResize.bind(this));

		this.setState({windowWidth:window.innerWidth,isLogin:window.localStorage.getItem('login')});
		
		
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
						<a href="#" onClick={this.onAddItemClicked.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>Add Item</a>
						<a href="#" onClick={this.onMyItemsClicked.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>My Items</a>
						<a href="#" onClick={this.logout.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none',marginRight:'10px'}}>Logout</a>
					</DropdownList>
			}else{
			 	funcs =<a href="#" onClick={this.onSignInClicked.bind(this)} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration: 'none'}}>Sign In</a>
			}
			
		return (
			<div>
			<Modal 
				isOpen={this.state.loginIsOpen}
        onRequestClose={this.closeLoginModal.bind(self)}
        style={loginStyle}>
      	<Login/>
			</Modal>

			<Modal
				isOpen={this.state.itemModal}
				onRequestClose={this.closeItemModal.bind(self)}
				style={itemModalStyle}>
				<AddItem onClose={this.closeItemModal.bind(self)} />
			</Modal>	

			<div className="navbar">
				<div style={{fontSize:'20px', fontWeight:'800',display:'inline',float:'left',marginRight:'10px'}}>
						<img src="/assets/images/logosmall.png" height="70px"/>
				</div>

		{/*		<ul>
							<li><a href="#">BasedOn</a></li>
							<li><a href="#">Date</a></li>
							<li><a href="#">Category</a></li>
							<li><a href="#">Location</a></li>
						</ul>*/}

				<SearchBox/>
				{funcs}
			</div>

			<div className="container" style={{width:this.state.windowWidth}}>
					<div className="col">
						{this.cs[0]}
					</div>
					<div className="col">
						{this.cs[1]}
					</div>
					<div className="col">
						{this.cs[2]}
					</div>

			</div>

			</div>
			);
	}
	loadList(){
		var cur = 0 ; 
		for (var i = 0 ; i < this.state.items.length ;  i++){
			childItem = <ItemBox marginTop={0} marginLeft={0} data={this.state.items[i]} key={i}/>;
			this.cs[cur].push(childItem)
			cur++;
			if (cur > 2){
				cur = 0 ;
			}
		}
		listHasChanged = false;
	}
	fetchItems(){
		var self = this;
		$.ajax({
		  url: "/fetchItems/"+this.state.page,
		  date:{},
		  dataType:'json'
		}).done(function(data) {
			self.dataFetching = false;
			if(data.status == false){
				alert(data.message);
				return;
			}
			
		  self.setState({items:data.items,page:self.state.page+1,listHasChanged:true});
		});
	}
	closeLoginModal(){
		this.setState({loginIsOpen:false})
	}
	onSignInClicked(){
		this.setState({loginIsOpen:true});
	}
	closeItemModal(){
		this.setState({itemModal:false});
		$("body").removeClass("modal-open");

	}
	onAddItemClicked(event){
		console.log("HEY")
		this.setState({itemModal:true});
		$("body").addClass("modal-open");
		event.stopPropagation();
	}
	onMyItemsClicked(){

	}
	logout(){

	}

	onResize(){
		this.setState({windowWidth:window.innerWidth});
	}



}