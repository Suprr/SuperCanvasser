import React, {Component} from 'react'
import Layout from '../../components/Layout/Layout';
import Manager from '../Manager/Manager'
import Canvasser from '../Canvasser/Canvasser'
import SysAdmin from '../SysAdmin/SysAdmin'
class Base extends Component{
	state = {
		id : null,
	}
	componentDidMount(){
		const data = JSON.parse(sessionStorage.getItem('userInfo'));
		console.log(['Base componentDidMount'], data)
		this.setState({id:data.email})
	}
	render(){
		let display=null
		console.log(this.state.email);
		// if(this.state.id){
		// 	if(this.props.match.params.role=='manager'){
		// 		display = (<Manager userID = {this.props.match.params.id}/>);
		// 	}else if(this.props.match.params.role=='canvasser'){
		// 		display = (<Canvasser userID = {this.props.match.params.id}/>);
		// 	} else{
		// 		display = (<SysAdmin userID = {this.props.match.params.id}/>);
		// 	}
		// }

		if(this.state.id){
			if(this.props.match.params.role=='manager'){
				display = (<Manager userID = {this.state.id}/>);
			}else if(this.props.match.params.role=='canvasser'){
				display = (<Canvasser userID = {this.state.id}/>);
			} else{
				display = (<SysAdmin userID = {this.state.id}/>);
			}
		}
		return(
			<div>
				<Layout role={this.props.match.params.role} userID = {this.state.id} url={this.props.match.url}>
					{display}
				</Layout>
			</div>
		);
	}
}

export default Base;