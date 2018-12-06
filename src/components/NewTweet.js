import React, { Component } from "react";
import { handleCreateTweet } from "../actions/tweets";
import { connect } from "react-redux";

class NewTweet extends Component {
  state = {
    text: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ text: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { author, dispatch, id } = this.props;
    const { text } = this.state;
    dispatch(handleCreateTweet({ text, author, replyingTo: id }));

    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    const tweetLeft = 280 - text.length;

    return (
      <div>
        <h3 className="center">Compose new tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="what's happening?"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return { author: authedUser };
};

const ConnectedNewTweet = connect(mapStateToProps)(NewTweet);

export default ConnectedNewTweet;
