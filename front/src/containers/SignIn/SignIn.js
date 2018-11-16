import React, {Component} from 'react';
import Aux from '../../hoc/Auxx';
import MainImage from '../../assets/images/background.jpg'
import SignInBody from '../../components/SignIn/SignInBody'

import SignInBody_n from '../../components/SignIn/SignInBody_n'
import classes from './SignIn.module.css';
import Modal from '../../components/UI/Modal/Modal'
import MessageBox from '../../components/UI/MessageBox/MessageBox'

class SignIn extends Component {
  //<SignInBody_n signedIn = {this.props.signedIn}/>

  state = {
    show : false
  }

  openModalHandelr = () => {
    this.setState({ show: true });
  }

  modalCloseHandler = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <Aux>
        <MessageBox show={this.state.show} modalClosed={this.modalCloseHandler} message="ID and Password is invalid. Try again"/>
     
        <div className={[classes.SignIn].join(" ")}>
          <div className={classes.Title}> Super Canvasser </div>
          <div className={classes.ImgContainer}>
            <div className="ImageWraper">
              <img src={MainImage} />
            </div>
          </div>
          <div>
            <SignInBody_n signedIn = {this.props.signedIn} openModal = {this.openModalHandelr}/>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignIn;
