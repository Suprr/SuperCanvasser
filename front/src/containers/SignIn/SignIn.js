import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import MainImage from '../../assets/images/background.jpg'
import SignInBody from '../../components/SignIn/SignInBody';
import classes from './SignIn.module.css';

class SignIn extends Component{

	render(){
		
		return (<Aux>
					<div className={[classes.SignIn].join(' ')}>
						<div className={classes.Title}> Super Canvasser </div>
						<div className={classes.ImgContainer}>
							<div className="ImageWraper">
								<img src={MainImage}/>
							</div>
						</div>
						<div>
							<SignInBody/>
						</div>
					</div>

				</Aux>);
	}
}

export default SignIn;