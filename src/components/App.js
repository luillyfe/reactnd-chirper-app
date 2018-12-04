import React, { Component } from "react";
import { initialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import connect from "react-redux/es/connect/connect";
import { LoadingBar } from "react-redux-loading";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(initialData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {!this.props.loading && <Dashboard />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ loading: state.authedUser === null });

const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
