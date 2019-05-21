import React, {Component} from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {facebookLogin} from "../store/actions/usersActions";
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";

class FacebookLogin extends Component {
    facebookLogin = data => {
        if (data.error) {
            NotificationManager.error('Something went wrong');
            this.props.facebookLogin(data);
        } else if (!data.name) {
            NotificationManager.warning('You\'ve pressed cancel')
        } else {
            this.props.facebookLogin(data)
        }
    };

    render() {
        return (
            <FacebookLoginButton
                appId='352798085373485'
                callback={this.facebookLogin}
                fields="name, email, picture"
                render={renderProps => (
                    <span className="facebook_link" onClick={renderProps.onClick} color="primary">
                        Login with Facebook
                    </span>
                )
                }
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    facebookLogin: userData => dispatch(facebookLogin(userData))
});
export default connect(null, mapDispatchToProps)(FacebookLogin);