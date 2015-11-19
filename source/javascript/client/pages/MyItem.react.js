
import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
import Grid from '../components/Grid.react.js';
import http from 'superagent';
import ItemBox from '../components/itemBox.react.js';
export default class MyItemPage extends Component {

	constructor(props) {
    super(props);
    this.state={columns : [],count:0,colone:true,
	    	coltwo:true,colthree:true,
	    	loginIsOpen:false,itemModal:false,
	    	isLogin:false,page:0,items:[],listHasChanged:false,userMode:false,
	    	loading:false
	    };
    this.cs = [[],[],[]];
  }

	componentDidMount(){
		var self = this;

		this.fetchUserItems();

		this.dataFetching = true;
		$(window).scroll(function() {
			if(this.dataFetching == true ){
				return; 
			}
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		   	self.setState({page:self.state.page+1})

		   	/*self.state.userMode == false ? */self.fetchUserItemsPage() /*: self.fetchUserItemsPage()*/;
		   }
		});

	}

	render(){
		var self = this;
		console.log(this.cs[0]);
		return(
			<div>
				<Grid col={[this.cs[0],this.cs[1],this.cs[2]]}/>
			</div>
			)
	}

	loading(state){
		this.props.loading(state);
	}

	loadList(list) {
		var self = this;
		var cur = 0 ; 
		this.cs[0] = [];
		this.cs[1] = [];
		this.cs[2] = [];
		//console.log(this.state.items)
		for (var i = 0 ; i < list.length ;  i++){
			childItem = <ItemBox owner={true} loading={self.loading.bind(self)} marginTop={0} marginLeft={0} data={list[i]} key={i}/>;
			this.cs[cur].push(childItem)
			cur++;
			if (cur > 2){
				cur = 0 ;
			}
		}
		this.setState({})
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
        	self.loadList(res.body.items || []);
        	self.setState({items:res.body.items || [],listHasChanged:true,page:0});
        	
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
        	self.loadList(res.body.items || []);
        	self.setState({items:self.state.items.concat(res.body.items) || [],listHasChanged:true,page:page});
        	
        }
      });
	}



}