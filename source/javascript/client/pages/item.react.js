
import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
import http from 'superagent';

export default class ItemPage extends Component {

	constructor(props) {
    super(props);
     this.state = {categoryList:[],imageUrl:null,Urls:[],enlargeImageModal:false,s:false,location:{},country:null,state:null}
  
  }

	componentDidMount(){
		console.log("ITEM MOUNTED")
		var self = this;
		this.dataFetching = true;

	}

	render(){
		console.log("TEST")
		var self = this;
		const images = self.props.item.imageUrl.map((value,i)=>{
			return (
				<div key={i+'b'} style={{maxHeight:'100px',maxWidth:'100px',position:'relative'}}>
					<img src={value} style={{display:'inline',maxHeight:'100px',maxWidth:'100px',marginBottom:'10px'}} key={i} onClick={self.enlargeImage.bind(self,i)} />
				</div>);
		})
		return(
			<div>
				{this.state.enlargeImageModal == true ?
					<div style={{position:'fixed',width:'100%',height:'100%',background:'#f6f6f6',zIndex:'10',top:'0px',left:'0px'}}>
						<img src={this.state.enlargeImage} style={{maxWidth:'500px',margin:'0 auto'}}/>
						<button className="gbutton" style={{display:'inline-block',fontSize:'10px',position:'absolute',top:'10px',left:'10px'}} onClick={()=>{this.setState({enlargeImageModal:false})}}>Close</button>
					</div>
				 :<span/>}

				<h2>{self.props.item.title}</h2>
				<p style={{maxWidth:'500px',wordWrap:'breakWord'}}>{self.props.item.description}</p>
				{images}
				<input type="button" className="gbutton"  value="Ask question" onClick={this.clickTest.bind(this)}/>
			</div>
			)
	}

	
	clickTest(){
		alert("HEY")
	}

	enlargeImage(index){
		this.setState({enlargeImageModal:true,enlargeImage:this.props.item.imageUrl[index]});
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