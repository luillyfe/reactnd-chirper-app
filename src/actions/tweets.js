import { saveLikeToggle } from "../utils/api";

export const GET_TWEETS = "GET_TWEETS";
export const TOGGLE_LIKE = "TOGGLE_LIKE";

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
    saveLikeToggle(info)
      .then()
      .catch(() => dispatch(toggleLike(info)));
  };
};
