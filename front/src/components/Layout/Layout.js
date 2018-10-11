import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar'
import Sidebar from '../Navigation/Sidebar'

class Layout extends Component{

	render(){
		return (
			<Aux>
				<Toolbar />
				<main className = {classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}


export default Layout;