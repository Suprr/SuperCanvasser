import React, {Component} from 'react';
 
import Aux from '../../hoc/Auxx';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar'
import Sidebar from '../Navigation/Sidebar'
import MenuData from './MenuData'
class Layout extends Component{
  state= {
    menus : MenuData.menus,
    user : this.props.user
  }
  
  render(){
    let sidebar = null;
    let toolbar = null;
    if(this.props.role == 'manager'){
      sidebar = <Sidebar className="h-100" menus = {this.state.menus.manager} url={this.props.url}/>
    } else if(this.props.role == 'canvasser'){
      sidebar = <Sidebar className="h-100" menus = {this.state.menus.canvasser} url={this.props.url}/>
    } else{
      sidebar = <Sidebar className="h-100" menus = {this.state.menus.sysAdmin} url={this.props.url}/>
    }

    if(this.state.user){
      toolbar = <Toolbar role={this.props.role} user={this.state.user}/>
    }

    return (
      <Aux>

        <div className={["row", "fixed-top"].join(' ')}>
          {toolbar}
        </div>

        <div className={["row", "fixed-center", classes.Content].join(' ')}>
          <div className={["col-2",classes.Sidebar].join(' ')}>
            {sidebar}
          </div>

          <div className = {["col-10"].join(' ')}>
            {this.props.children}
          </div>
        </div>
        
        
      </Aux>
    );
  }
}

export default Layout;
