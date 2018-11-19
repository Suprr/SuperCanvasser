import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class AddManager extends Component{
	

	render(){

		return(
			<div className={[classes.Section, 'row'].join(' ')}>
			
				<div className={[classes.Title,'col-3', 'text-center'].join(' ')}> 
					<p>AddManager</p>
				</div>
				
				<div className = {['col-6', classes.InputSection].join(' ')}>
					<input 	
							name = 'newManager'
							value = {this.props.manager}
							className = {[classes.TextField].join(' ')}
							onChange={this.props.onChange}/>
				</div>

				<div className='col-3 text-center'> 
					<div className='row'>
						<button className = {['btn', 'btn-danger', classes.Btn].join(' ')} onClick={this.props.openSearchModal}>Search</button>
						<button className = {['btn', 'btn-danger', classes.Btn].join(' ')} name = 'managers' onClick={this.props.onClick}>Add</button>
					</div>
				</div>
	
			</div>
		);
	}

}

export default AddManager;