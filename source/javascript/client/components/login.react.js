import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
import http from 'superagent';
export default class Login extends Component {

	constructor(props) {
    super(props);
    this.state = {signup:true}
  }

	componentDidMount(){
		
	}

	render(){
		var self = this;

		return (
				<div ref="div" className="loginForm" >
				<div ref="tab" style={{height:'50px'}}>
					<a href="#" onClick={()=>{self.setState({signup:true})}} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif',textDecoration:'none',marginLeft:'-50px'}} > Register / </a>
					<a href="#" onClick={()=>{self.setState({signup:false})}} style={{fontWeight:'600',fontSize:'14px',fontFamily:'Open Sans, sans-serif', textDecoration:'none',marginRight:'50px'}}> Login </a>
				</div>
				{this.state.signup == true ? 

					<form action="/signupemail" method="post"  style={{textAlign:'center'}}>
					<div style={{margin:"0 auto"}}>
						<input type="text" label="Display name" name="displayName" placeholder="Display Name..." className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
						<input type="email" placeholder="Email..." name="username" className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
						<input type="password" placeholder="Password..." name="password" className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
					</div>
    			<input type="submit" value="Register" className="gbutton" style={{marginBottom:'10px',width:'204px'}}/> 
					</form>
					:
					<form action ="/login" method="post" style={{textAlign:'center'}}>
						<div style={{margin:"0 auto"}}>
							<input type="email" placeholder="Email..." name="usernamea" ref="usernameL" className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
							<input type="password" placeholder="Password..." name="passworda" ref="passwordL" className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
						</div>
						<input type="button" value="Login" className="gbutton" style={{marginBottom:'10px',width:'204px'}} onClick={self.onLogin.bind(self)} /> 
					</form>
				}
					<a href="/auth/facebook"><img src="/assets/images/icon-login-fb.png" width="204px" /></a>
				</div>			
			);
	}

	onLogin() {
		var self = this;
		http
      .post("/login")
      .send({username:self.refs.usernameL.value,password:self.refs.passwordL.value})
      .accept('application/json')
      .end(function(err, res){
        if(err){
          console.log(err)
        }else {
        	console.log(res)
          if(res.body.status == false){
          	alert(res.body.message)
          }else{
          	location.reload();
          }
        }
      });

	}

}