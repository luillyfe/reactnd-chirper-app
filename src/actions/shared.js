import { getInitialData } from "../utils/api";
import { getTweets } from "./tweets";
import { getUsers } from "./users";
import { setAuthedUser } from "./authedUser";
import { hideLoading, showLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

export const initialData = () => {
  return dispatch => {
    dispatch(showLoading());
    getInitialData().then(({ users, tweets }) => {
      dispatch(getTweets(tweets));
      dispatch(getUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
};
