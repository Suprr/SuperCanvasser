import React, {Component} from 'react'
import ManagerItem from './ManagerItem'
import axios from '../../../axios'
class ManagerList extends Component{

  render(){
		let managerList = this.props.searchedManagers.length!=0?  this.props.searchedManagers.map(mng =>{
			let manager = <ManagerItem key={mng._id} selectManager={this.props.selectManager}manager={mng}/>
			return manager;
		}): null;
		return <div>
			{managerList}
		</div>;
	}
}

export default ManagerList;