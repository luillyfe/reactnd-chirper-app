import React, { Component } from "react";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { connect } from "react-redux";

class TweetPage extends Component {
  render() {
    const { replies, id } = this.props;
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
  const tweet = state.tweets[props.match.params.id];
  return {
    replies: tweet.replies.sort(
      (a, b) => state.tweets[b].timestamp - state.tweets[a].timestamp
    ),
    id: props.match.params.id
  };
};

const ConnectedTweetPage = connect(mapStateToProps)(TweetPage);

export default ConnectedTweetPage;
