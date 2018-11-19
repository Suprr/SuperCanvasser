import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'
class ManagerItem extends Component{

	render(){
		return <div className={[classes.ManagerItem, 'row'].join(' ')}>
			<div className={[classes.ManagerListName, 'col-8'].join(' ')}>
				{this.props.manager.firstName + " " + this.props.manager.lastName}
			</div>
			<div className={[classes.ManagerListBtn, 'col-4'].join(' ')}>
				<button className='btn btn-danger' onClick={this.props.selectManager.bind(this, this.props.manager)}>Select</button>
			</div>
		</div>;
	}
}

export default ManagerItem;