import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
import http from 'superagent';
import Modal from 'react-modal';

 class QuestionBox extends Component {

	constructor(props) {
    super(props);
    
  }

	componentDidMount(){
		
	}

	render(){
		return (
			
				<div ref="div" className="searchBox">
					<textarea  id="editArea" ref="question" placeholder="Ask/Say about what you have regarding this need " style={{marginBottom:'15px'}} required></textarea>
    			<input type="button" value="Send"  className="button" onClick={this.onSend.bind(this)}/> 
				</div>			
			);
	}

	onSend()	{
		var self = this;
		self.props.loading(true);
			http.
			post("/tk/question").
			send({question:this.refs.question.value,itemId:this.props.itemId}).
			accept('application/json').
			end(function(err, res){

				if(err){
									alert("something went wrong");console.log(err);return;}

				console.log(res)
				self.props.loading(false);

				if(res.body.status == false){
					alert(res.body.message);
					return;
				}
				alert("Question has been asked");
			})

			self.props.onRequestClose();
	}


}

const questionModalStyle = {
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
  	width : '410px',
  	height : '420px',
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

export default class ItemBox extends Component {

	constructor(props) {
    super(props);
    this.state ={questionIsOpen:false};
  }

	componentDidMount(){
		console.log(ReactDOM.findDOMNode(this.refs.div).offsetHeight);
	}

	render(){
		var self = this;
		var itemAdd = "/item/"+self.props.data._id;

		return (
				<div ref="div" className="itemBox" style={{/*position:'absolute',marginTop:this.props.marginTop,marginLeft:this.props.marginLeft,width:'385px',maxHeight:'305',*/}}>
					<Modal
						isOpen={self.state.questionIsOpen}
		        onRequestClose={()=>{self.setState({questionIsOpen:false})}}
		        style={questionModalStyle}>
		      	<QuestionBox onRequestClose={()=>{self.setState({questionIsOpen:false})}} loading={self.props.loading} itemId={self.props.data._id}/>
					</Modal>
					<div className="itemHeader">
						<a target="_blank" href={itemAdd}
						style={{fontSize:'16px',
						textDecoration:'none',
						fontWeight:'600',
						display:'inline',
						float:'left',
				    marginTop: '10px',
   					marginLeft: '5px'}}>{this.props.data.title}</a>

						<div style={{fontSize:'12px',display:'inline',float:'right',
				    marginTop: '10px',
   					marginRight: '5px'}}>
   						<span style={{display:'block'}}>{this.props.data.date.toString()}</span>
   						<span style={{display:'block'}}>{this.props.data.distance}</span>
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
	   					marginLeft: '5px'}}>{this.props.data.price}</span>
							<span style={{fontWeight:'800',color:'#244470',
							fontSize:'14px',
							display:'inline',
							float:'right',
					    marginTop: '10px',
	   					marginRight: '5px'}}><a style={{textDecoration:'none'}} href="#" onClick={self.gotIt.bind(self)}>Got It!</a></span>
					</div>
				</div>			
			);
	}

	gotIt(){
		this.setState({questionIsOpen:true})
	}
}