import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { formatDate, formatTweet } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from "react-icons/ti";
import { handleToggleAction } from "../actions/tweets";

class Tweet extends Component {
  toParent(e, parentId) {
    e.preventDefault();
    this.props.history.push(`/tweet/${parentId}`);
  }

  handleLike = e => {
    e.preventDefault();
    const { tweet, authedUser, dispatch } = this.props;
    dispatch(
      handleToggleAction({ hasLiked: tweet.hasLiked, id: tweet.id, authedUser })
    );
  };

  render() {
    const { tweet, id } = this.props;

    if (tweet === null) {
      return <p>This Tweet doesn't exist</p>
    }

    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent
    } = tweet;

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies > 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes > 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  };
};

const ConnectedTweet = connect(mapStateToProps)(Tweet);
export default withRouter(ConnectedTweet);
