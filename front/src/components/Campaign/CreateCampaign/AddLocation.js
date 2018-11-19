import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class AddLocation extends Component{
		state={
					address1 : '',
					address2 : '',
					city : '',
					state : '',
					zipcode : ''
		}

		handleInputChange = (event)=> {
		    const target = event.target;
		    const value = target.value;
		    const name = target.name;
		    
	   	 	this.setState({[name]: value });
		}
		
		addLocation=()=>{
			this.props.onClick(this.state)
			this.setState({
				address1 : '',
				address2 : '',
				city : '',
				state : '',
				zipcode : ''
			})
		}

		render(){
		return(
			<div className=''>
				
				<div className={[classes.Section, 'row'].join(' ')}>
					<div className='col-3 text-center'> 
						<p>New Location</p>
					</div>
				</div>
				<div className={['row'].join(' ')}>
					<div className='col-2 text-center'> 
					</div>
					<div className={[classes.AddLocation,'col-10'].join(' ')}>
						<div className={['row'].join(' ')}>
						

							<div className = {['col-7', classes.InputSection].join(' ')}>
								<input 	
										name = 'address1'
										placeholder='Address1'
										value = {this.state.address1}
										className = {[classes.TextField].join(' ')}
										onChange={(event)=>this.handleInputChange(event)}
										/>
							</div>
						</div>


						<div className={[classes.Section, 'row'].join(' ')}>
						
							<div className = {['col-7', classes.InputSection].join(' ')}>
								<input 	
										name = 'address2'
										placeholder='Address2'
										value = {this.state.address2}
										className = {[classes.TextField].join(' ')}
										onChange={(event)=>this.handleInputChange(event)}
										/>
							</div>
						</div>

						<div className={[classes.Section, 'row'].join(' ')}>
							
							<div className = {['col-7', classes.InputSection].join(' ')}>
								<input 	
										name = 'city'
										placeholder='City'
										value = {this.state.city}
										className = {[classes.TextField].join(' ')}
										onChange={(event)=>this.handleInputChange(event)}
										/>
							</div>
							<div className = {['col-4', classes.InputSection].join(' ')}>
								<input 	
										name = 'zipcode'
										placeholder='Zipcode'
										value = {this.state.zipcode}
										className = {[classes.TextField].join(' ')}
										onChange={(event)=>this.handleInputChange(event)}/>
							</div>
						</div>

						<div className={[classes.Section, 'row'].join(' ')}>
							
							<div className = {['col-7', classes.InputSection].join(' ')}>
								<input 	
										name = 'state'
										placeholder='State'
										value = {this.state.state}
										className = {[classes.TextField].join(' ')}
										onChange={(event)=>this.handleInputChange(event)}
										/>
							</div>

							<div className='col-3 text-center'> 
									<div className='row'>
										<button className = 'btn btn-light' onClick = {this.addLocation}>Add Location</button>
									</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default AddLocation;