import { CREATE_TWEET, GET_TWEETS, TOGGLE_LIKE } from "../actions/tweets";

const tweets = (state = {}, action) => {
  switch (action.type) {
    case GET_TWEETS:
      return { ...state, ...action.tweets };
    case TOGGLE_LIKE:
      console.log(action.info.id);
      return {
        ...state,
        [action.info.id]: {
          ...state[action.info.id],
          likes: state[action.info.id].likes.includes(action.info.authedUser)
            ? state[action.info.id].likes.filter(
                user => user !== action.info.authedUser
              )
            : [...state[action.info.id].likes, action.info.authedUser]
        }
      };
    case CREATE_TWEET:
      const { tweet } = action;
      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        };
      }

      return { ...state, [tweet.id]: tweet, ...replyingTo };
    default:
      return state;
  }
};

export default tweets;
