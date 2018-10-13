import React, {Component} from 'react'
import Layout from '../../components/Layout/Layout';
import Manager from '../Manager/Manager'
import Canvasser from '../Canvasser/Canvasser'
import SysAdmin from '../SysAdmin/SysAdmin'
class Base extends Component{


	render(){
		let display=null
		console.log(this.props);
		 if(this.props.match.params.role=='manager'){
			display = (<Manager userID = {this.props.match.params.id}/>);
		}else if(this.props.match.params.role=='canvasser'){
			display = (<Canvasser userID = {this.props.match.params.id}/>);
		} else{
			display = (<SysAdmin userID = {this.props.match.params.id}/>);
		}
		
		return(
			<div>
				<Layout role={this.props.match.params.role} userID = {this.props.match.params.id} url={this.props.match.url}>
					{display}
				</Layout>
			</div>
		);
	}
}

export default Base;