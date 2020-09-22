import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

export class GoogleAuth extends Component {
  // gapi only available on window scope! need window.gapi, otherwise we error out :(
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      // returns a promise
      window.gapi.client.init({
        clientId: '290799715110-3h0ss9cr7cnp3if7bi32qraqrdqhj8gq.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // use component-lvl state to keep track of sign-in
        this.auth = window.gapi.auth2.getAuthInstance();
        // check if user is signed in and set state accordingly
        this.onAuthChange(this.auth.isSignedIn.get());
        // listen for changes to sign-in, then change state
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }
  
  // takes isSignedIn as bool, changes state accordingly
  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      // if signing in, also record userId for streaming purposes
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }


  // sign-in button helper functions
  onSignInClick = () => {
    this.auth.signIn();
  }
  onSignOutClick = () => {
    this.auth.signOut();
  }

  
  // check sign in status to swap the auth button (in || out)
  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      // return nothing if unsure of login status
      return null;
    } else if(this.props.isSignedIn) {
      // if signed in, show sign out button
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      // if signed out, show sign in button
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  // punt this bad boy on outta here!
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);