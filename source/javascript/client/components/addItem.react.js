import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
export default class AddItem extends Component {

	constructor(props) {
    super(props);
    this.state = {imageUrl:null,Urls:[],enlargeImageModal:false,s:false,location:null,country:null,state:null}
  }

	componentDidMount(){

		populateCountries("country", "state");
	}

	render(){
		var self = this;
		console.log("render ")
		const otherImages = this.state.Urls.map((value,i)=>{

			return (<div key={i+'b'} style={{maxHeight:'75px',maxWidth:'75px',position:'relative'}}><img src={value} style={{display:'inline',maxHeight:'75px',maxWidth:'75px',marginBottom:'10px'}} key={i} onClick={self.enlargeImage.bind(self,i)} />
				<a href="#" style={{position:'absolute',right:'1px',top:'1px',textDecoration:'none'}} onClick={self.removeImage.bind(self,i)} key={i+'a'}>x</a>
				</div>);
		})
		return (
				<div ref="div" className="addItem" >
				{this.state.enlargeImageModal == true ?
					<div style={{position:'fixed',width:'100%',height:'100%',background:'#f6f6f6',zIndex:'10',top:'0px',left:'0px'}}>
						<img src={this.state.enlargeImage} style={{maxWidth:'500px',margin:'0 auto'}}/>
						<button className="gbutton" style={{display:'inline-block',fontSize:'10px',position:'absolute',top:'10px',left:'10px'}} onClick={()=>{this.setState({enlargeImageModal:false})}}>Close</button>
					</div>
				 :<span/>}
				
				<div style={{}}>
					<div style={{}}>
						<input type="text" id="title" ref="title" placeholder="Title..."  style={{display:'block',marginBottom:'10px',width:'100%'}} required />
						<textarea  id="editArea" ref="description" placeholder="Description of what you need " style={{marginBottom:'15px'}} required></textarea>
						Select your Country: <select style={{display:'block'}} id = "country" name="Country" onChange={(e)=>{this.setState({country:e.options[e.selectedIndex]})}}></select><br/>
						Select your State: <select style={{display:'block',marginBottom:'10px'}} id = "state" onChange={(e)=>{this.setState({state:e.options[e.selectedIndex]})}} name="State"></select>
						<input type="checkbox" name="location" ref="location" value="Location" id="location" onChange={this.onLocationOptionChange.bind(self)} style={{marginBottom:'10px'}}/> Use my location
						<span style={{fontSize:"10px" }}> we dont use your exact location, and nobody is able to see it </span>
						<div style={{display:'block'}}>
						<input type="text" placeholder="Image Url ..." className="search" style={{display:'inline',marginBottom:'10px',marginRight:'10px'}} onChange={this.onImageChange.bind(this)} />
						<div className="gbutton" style={{display:'inline-block',fontSize:'10px'}} onClick={this.addImage.bind(this)}>AddImage</div>
						</div>
						<img  refs="imageholder" src={this.state.imageUrl} style={{display:'block',maxHeight:'300px',maxWidth:'300px',marginBottom:'10px'}} />
						{otherImages}
					</div>
    			<input type="button" value="Share it" className="gbutton" style={{marginBottom:'10px',width:'204px'}} onClick={self.addItem.bind(self)}/> 
				</div>
				</div>			
			);
	}

	addItem(){
		if(this.refs.title.value.length < 1){
			alert("please enter a valid title");
			return;
		}
		if(this.refs.description.value.length < 100){
			alert("atleast 100 character is needed for description");
			return;
		}

		var itemToAdd = {
			title:this.refs.title.value,
			description:this.refs.description.value,
			imageUrls:this.Urls,
			country:this.state.country,
			state:this.state.state,
			location:this.state.location
		}
		$.post("/tk/addItem",
			itemToAdd,
			function(data,status,jqxhr){
				alert(jqxhr)
			},
			'json');
	}
	onLocationOptionChange(){
		if(this.refs.location.checked){
		 //var output = document.getElementById("out");

	  if (!navigator.geolocation){
	    alert("Geolocation is not supported by your browser");
	    return;
	  }

	  function success(position) {
	    var latitude  = position.coords.latitude;
	    var longitude = position.coords.longitude;
	    this.setState({location:{x:longitude,y:latitude}});
	    alert("done")
	  };

	  function error() {
	    alert("Unable to retrieve your location");
	  };

	  navigator.geolocation.getCurrentPosition(success, error);
		}
	}

	enlargeImage(index){
		this.setState({enlargeImageModal:true,enlargeImage:this.state.Urls[index]});
	}

	addImage(){
		if(this.state.imageUrl == null ){
			alert("Nothing to add");
			return;
			
		}
		for( var i =0 ; i < this.state.Urls.length ; i++){
			if(this.state.Urls[i] == this.state.imageUrl){
				alert("You've already added this image");
				return;
			}
		}
		//$.ajax({url:this.state.imageUrl,type:'HEAD',error:()=>{alert("Somethings wrong with this image");return;}});
		this.setState({Urls:this.state.Urls.concat(this.state.imageUrl)})
	}
	
	removeImage(index){
		console.log(index)
		if (index > -1) {
			var arr = this.state.Urls;
    	arr.splice(index, 1);
    	this.setState({Urls:arr,s:!this.state.s});
		}

		//return false;
		
	}

	onImageChange(e){
		this.setState({imageUrl:e.target.value})
	}
}