import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class AddLocation extends Component{

		render(){
		return(
			<div className={[classes.Section, 'row'].join(' ')}>
				<div className='col-3 text-center'> 
					<p>New Location</p>
				</div>
				
				<div className = {['col-7', classes.InputSection].join(' ')}>
					<input 	
							name = 'newLocation'
							value = {this.props.location}
							className = {[classes.TextField].join(' ')}
							onChange={this.props.onChange}/>
				</div>

				<div className='col-2 text-center'> 
					<div className='row'>
						<button className = 'btn btn-light'>Add Location</button>
					</div>
				</div>
			</div>
		);
	}

}

export default AddLocation;