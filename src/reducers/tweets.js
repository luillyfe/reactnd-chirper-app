import { GET_TWEETS, TOGGLE_LIKE } from "../actions/tweets";

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
    default:
      return state;
  }
};

export default tweets;
