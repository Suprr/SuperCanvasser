import React, {Component} from 'react';
import classes from './nav.module.css'
import {NavLink} from 'react-router-dom'

class Sidebar extends Component{
	
	//Before use sidebar, the props 'menus' must be passed. 

	state={
		menus : this.props.menus
	}

	 componentDidUpdate(prevProps) {
	  
	    if (this.props.menus !== prevProps.menus) {
	      this.setState(prevState=>({
	        menus : this.props.menus
	      }));
	    }
	  }

	render(){

	    let menus = this.state.menus.map(menu =>{
		    return (
	    		//<Link to = {'/'+post.id}  key={post.id}> 
	    		<li key={menu.id} className = {[classes.SidebarItem, "nav-item"].join(' ')}>
		    		<NavLink
		    			className = {[classes.SidebarItemLink].join(' ')}
		    			
		    			to = {this.props.url+'/'+menu.path}>
				        
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