import React, {Component} from 'react';
import classes from './nav.module.css'
import {NavLink} from 'react-router-dom'

class Sidebar extends Component{
	
	state={
		menus : this.props.menus
	}

	render(){

	    let menus = this.state.menus.map(menu =>{
		    return (
	    		//<Link to = {'/'+post.id}  key={post.id}> 
	    		<li className = {[classes.SidebarItem, "nav-item"].join(' ')}>
		    		<NavLink
		    			className = {[classes.SidebarItemLink].join(' ')}
		    			key={menu.id}
		    			to = {'/'+menu.title}>
				        
				        {menu.title}

			        </NavLink>
		        </li>
		        );
		  });   

		return (
			<ul className={[classes.Sidebar, "nav", "flex-column"].join(' ')}>
					{menus}
			</ul>
		);
	}
} 

export default Sidebar;