import React, { Component } from "react";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { connect } from "react-redux";

class TweetPage extends Component {
  render() {
    const { id } = this.props.match;
    const { replies } = this.props;
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        <div className="center">replies</div>
        <ul>
          {replies.map(tweetId => (
            <li key={tweetId}>
              <Tweet id={tweetId} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const tweet = state.tweets[props.match.id];
  return {
    replies: tweet.replies.sort(
      (a, b) => state.tweets[b].timestamp - state.tweets[a].timestamp
    )
  };
};

const ConnectedTweetPage = connect(mapStateToProps)(TweetPage);

export default ConnectedTweetPage;
