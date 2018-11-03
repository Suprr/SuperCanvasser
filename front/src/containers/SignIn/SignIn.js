import React, {Component} from 'react';
import Aux from '../../hoc/Auxx';
import MainImage from '../../assets/images/background.jpg'
import SignInBody from '../../components/SignIn/SignInBody'

import SignInBody_n from '../../components/SignIn/SignInBody_n'
import classes from './SignIn.module.css';


class SignIn extends Component {
  //<SignInBody_n signedIn = {this.props.signedIn}/>
  render() {
    console.log("SignIn render", this.props);
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
            <SignInBody_n signedIn = {this.props.signedIn}/>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignIn;
