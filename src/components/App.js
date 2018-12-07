import React, { Component } from "react";
import { initialData } from "../actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import connect from "react-redux/es/connect/connect";
import { LoadingBar } from "react-redux-loading";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(initialData());
  }

  render() {
    return (
      <Router>
        <div className="container">
          <LoadingBar />
          <Nav />
          {!this.props.loading && (
            //<TweetPage match={{ id: "2mb6re13q842wu8n106bhk" }} />
            <div>
              <Route path="/" exact component={Dashboard} />
              <Route path="/tweet/:id" component={TweetPage} />
              <Route path="/new" component={NewTweet} />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ loading: state.authedUser === null });

const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
