import React, {Component} from 'react'

class ManagerItem extends Component{

	render(){
		return <div className='row'>
			<div className='ManagerNameSection col-8'>
				{this.props.manager.firstName + " " + this.props.manager.lastName}
			</div>
			<div className="col-4">
				<button onClick={this.props.selectManager.bind(this, this.props.manager)}>Select</button>
			</div>
		</div>;
	}
}

export default ManagerItem;