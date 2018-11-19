import React, {Component} from 'react';
 
import Aux from '../../hoc/Auxx';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar'
import Sidebar from '../Navigation/Sidebar'
import MenuData from './MenuData'
class Layout extends Component{
  state= {
    menus : MenuData.menus,
    user : this.props.user,
    role : this.props.role
  }

  componentDidUpdate(prevProps) {
  
    if (this.props.role !== prevProps.role) {
      this.setState(prevState=>({
        role : this.props.role
      }));
    }
  }
  
  render(){
    console.log(['Layout'],this.state.role);
    let sidebar = null;
    let toolbar = null;
    if(this.state.role == 'manager'){
      sidebar = <Sidebar className="h-100" menus = {this.state.menus.manager} url={this.props.url}/>
    } else if(this.state.role == 'canvasser'){
      sidebar = <Sidebar className="h-100" menus = {this.state.menus.canvasser} url={this.props.url}/>
    } else{
      sidebar = <Sidebar className="h-100" menus = {this.state.menus.sysAdmin} url={this.props.url}/>
    }

    if(this.state.user){
      toolbar = <Toolbar role={this.state.role} user={this.state.user}/>
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
