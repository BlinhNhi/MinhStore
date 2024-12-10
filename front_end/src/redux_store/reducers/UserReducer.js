import { GET_CURRENT_USER_ACTION, GET_USER_DETAIL, GET_USER_LIST } from "../constants";


const initialState = {
  userLogin: null,
  arrUser: [],
  userDetail: {},
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      state.arrUser = action.arrUser;
      return { ...state };
    case GET_CURRENT_USER_ACTION:
      state.userLogin = action.userLogin;
      return { ...state };
    case GET_USER_DETAIL:
      state.userDetail = action.userDetail;
      return { ...state }
    default:
      return state;
  }
};
