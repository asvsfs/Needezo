import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-pure-render/component';
import {Link, RouteHandler} from 'react-router';
export default class Login extends Component {

	constructor(props) {
    super(props);
    
  }

	componentDidMount(){
		
	}

	render(){


		return (
				<div ref="div" className="loginForm" >
				<form action="/signupemail" method="post"  style={{textAlign:'center'}}>
					<div style={{margin:"0 auto"}}>
						<input type="text" label="Display name" name="displayName" placeholder="Display Name..." className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
						<input type="email" placeholder="Email..." name="username" className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
						<input type="password" placeholder="Password..." name="password" className="search" style={{display:'block',margin:'0 auto',marginBottom:'10px'}} required />
					</div>
    			<input type="submit" value="Login" className="gbutton" style={{marginBottom:'10px',width:'204px'}}/> 
				</form>
					<a href="/auth/facebook"><img src="/assets/images/icon-login-fb.png" width="204px" /></a>
				</div>			
			);
	}

}