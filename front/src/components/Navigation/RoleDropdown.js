import 

class roleDropdown extends Component{
	state = {
		roles : this.props.roles
	}
	changeRoleHandler=(role)=>{
		
		let roleName = null;
		// const role = event.target.name
		if(role=='MANAGER')
			roleName = 'manager'
		else if(role=='CANVASSER')
			roleName='canvasser'
		else
			roleName='sysad'
		//console.log('ChangeRoleHadler',role)
		axios.get('/login/role/?role='+role).then(response=>{
				this.setState({showDropdown:false},()=>{
					this.props.history.push('/'+roleName)
				});
				
		}).catch(error=>{
			console.log('Error',this.state.selectedRole);
			console.log("Error", error);
		})
	}

	render(){
		const dropDown = this.state.roles? 
			this.state.roles.map(role=>{
				let roleName = null;

				if(role=='MANAGER')
					roleName='Manager'
				else if(role=='CANVASSER')
					roleName='Canvasser'
				else
					roleName='System Admin'

				let r = <li key={role} name={role} onClick={this.changeRoleHandler.bind(this, role)}className={[classes.roleItem].join(' ')}>{roleName}</li>
				return r;
			}) :null;

		return (
			<div className={[classes.RoleDropDown, this.state.showDropdown?classes.Visible : classes.Invisible].join(' ')}>
					<ul >
						{dropDown}
					</ul>
			</div>
		)
	}
}