import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TodoApp from './TodoApp';
class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '803554755516-9qv4dmcv8n0aqo0kse92hf03671irpae.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          // this.auth.isSignedIn.listen(this.onAuthChange());
        });
    });
  }
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I Don't Know if we are signed in </div>;
    } else if (this.state.isSignedIn) {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/new"
          >
            Add Todo
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onSignOutClick}
          >
            SignOut
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onSignInClick}
          >
            SignIn
          </Button>
          <Link to="/" />
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
export default connect(
  null,
  { signIn, signOut }
)(GoogleAuth);
