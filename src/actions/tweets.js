import { saveLikeToggle, saveTweet } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";

export const GET_TWEETS = "GET_TWEETS";
export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const CREATE_TWEET = "CREATE_TWEET";

export const getTweets = tweets => ({
  type: GET_TWEETS,
  tweets
});

const toggleLike = info => ({
  type: TOGGLE_LIKE,
  info
});

export const handleToggleAction = info => {
  return dispatch => {
    dispatch(toggleLike(info));
    saveLikeToggle(info).catch(() => dispatch(toggleLike(info)));
  };
};

const createTweet = tweet => {
  return { type: CREATE_TWEET, tweet };
};

export const handleCreateTweet = tweet => {
  return dispatch => {
    dispatch(showLoading());
    return saveTweet(tweet)
      .then(tweet => {
        dispatch(createTweet(tweet));
        debugger;
      })
      .then(() => dispatch(hideLoading()))
      .catch(error => console.log(`there was an error, cod: ${error}`));
  };
};
