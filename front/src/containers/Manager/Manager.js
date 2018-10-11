import React, {Component} from 'react';
import Sidebar from '../../components/Navigation/Sidebar'
import classes from './Manager.module.css'
class Manager extends Component{
	
	state = {
		menus : [
			{
				title: 'Campaign List',
				id : 'aaa'
			},
			{
				title : 'Create Campaign',
				id : 'bbb'
			},
			{
				title : 'Canvassing Assignment',
				id : 'ccc'
			},
			{
				title : 'Campaign Result',
				id : 'ddd'
			}

		]
	}
	render(){
		return(
			<div>
			<div className={["col-2", classes.Sidebar].join(' ')}>
				<Sidebar menus = {this.state.menus}/>
			</div>
			
			<div className="col-10">

			</div>
			</div>
		)
	}

}

export default Manager;