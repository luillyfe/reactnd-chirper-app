import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";

class Dashboard extends Component {
  render() {
    const tweets = Object.values(this.props.tweets);
    return (
      <div>
        <h3 className="center">Your timeline</h3>
        <ul>
          {tweets.map(tweet => (
            <Tweet key={tweet.id} id={tweet.id} />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ tweets: state.tweets });

export default connect(mapStateToProps)(Dashboard);
