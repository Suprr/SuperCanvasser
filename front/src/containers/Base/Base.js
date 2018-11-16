import React, {Component} from 'react'
import Layout from '../../components/Layout/Layout';
import Manager from '../Manager/Manager'
import Canvasser from '../Canvasser/Canvasser'
import SysAdmin from '../SysAdmin/SysAdmin'
class Base extends Component{
	state = {
		user : null,
	}
	componentDidMount(){
		const data = JSON.parse(sessionStorage.getItem('userInfo'));
		console.log(['Base componentDidMount'], data)
		this.setState({user:data})
	}
	render(){
		let display=null
		
		if(this.state.user&&this.state.user.email){
			if(this.props.match.params.role=='manager'){
				display = (
					<Layout role={this.props.match.params.role} user = {this.state.user} url={this.props.match.url}>
					<Manager userID = {this.state.user.email}/>
					</Layout>);
			}else if(this.props.match.params.role=='canvasser'){
				display = (<Layout role={this.props.match.params.role} user = {this.state.user} url={this.props.match.url}>
					<Canvasser userID = {this.state.user.email}/>
					</Layout>
					);
			} else{
				display = (
					<Layout role={this.props.match.params.role} user = {this.state.user} url={this.props.match.url}>
						<SysAdmin userID = {this.state.user.email}/>
						</Layout>
						);
			}
		}
		return(
			<div>
				{display}
			</div>
		);
	}
}

export default Base;