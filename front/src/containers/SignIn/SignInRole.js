import React, {Component} from 'react';
import Aux from '../../hoc/Auxx';
import MainImage from '../../assets/images/background.jpg'
import Role from '../../components/SignIn/Role'
import classes from './SignIn.module.css';


class SignInRole extends Component {

  render() {
    console.log("Role render", this.props);
    return (
      <Aux>
        <div className={[classes.SignIn].join(" ")}>
          <div className={classes.Title}> Super Canvasser </div>
          <div className={classes.ImgContainer}>
            <div className="ImageWraper">
              <img src={MainImage} />
            </div>
          </div>
          <div>
            <Role signedIn = {this.props.signedIn}/>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignInRole;
