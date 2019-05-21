import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "./store/actions/usersActions";
import Routes from "./Routes";
import Layout from "./components/Layout";
import {NotificationContainer} from "react-notifications";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
            <Layout user={this.props.user} logout={this.props.logoutUser}/>
        </header>
          <NotificationContainer/>
        <div className="main_div">
            <Routes user={this.props.user} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));