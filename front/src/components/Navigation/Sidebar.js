import React, {Component} from 'react';
import classes from './nav.module.css'
import {NavLink} from 'react-router-dom'

class Sidebar extends Component{
	
	//Before use sidebar, the props 'menus' must be passed. 

	state={
		menus : this.props.menus
	}

	render(){

	    let menus = this.state.menus.map(menu =>{
		    return (
	    		//<Link to = {'/'+post.id}  key={post.id}> 
	    		<div key={menu.id} className = {[classes.SidebarItem, "nav-item"].join(' ')}>
		    		<NavLink
		    			className = {[classes.SidebarItemLink].join(' ')}
		    			
		    			to = {'/'+menu.title}>
				        
				        {menu.title}

			        </NavLink>
		        </div>
		        );
		  });   

		return (
			<div className={[classes.Sidebar, 'col-2', 'flex-column'].join(' ')}>
					{menus}
			</div>
		);
	}
} 

export default Sidebar;