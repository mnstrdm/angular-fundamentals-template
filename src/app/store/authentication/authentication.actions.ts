import { createAction, props } from "@ngrx/store";
import { AuthenticationConstants } from "./authentication.constants";
import { User } from "@app/shared/models/user.model";

export const requestLogin = createAction(
  AuthenticationConstants.REQUEST_LOGIN,
  props<{ credentials: User }>()
);
export const requestLoginSuccess = createAction(
  AuthenticationConstants.REQUEST_LOGIN_SUCCESS,
  props<{ result: string }>()
);
export const requestLoginFail = createAction(
  AuthenticationConstants.REQUEST_LOGIN_FAIL,
  props<{ error: string }>()
);
export const requestRegistration = createAction(
  AuthenticationConstants.REQUEST_REGISTRATION,
  props<{ credentials: User }>()
);
export const requestRegistrationSuccess = createAction(
  AuthenticationConstants.REQUEST_REGISTRATION_SUCCESS
  //props<{ result: {} }>()
);
export const requestRegistrationFail = createAction(
  AuthenticationConstants.REQUEST_REGISTRATION_FAIL,
  props<{ error: string }>()
);
export const requestLogout = createAction(
  AuthenticationConstants.REQUEST_LOGOUT
);
export const requestLogoutSuccess = createAction(
  AuthenticationConstants.REQUEST_LOGOUT_SUCCESS
);
export const requestLogoutFail = createAction(
  AuthenticationConstants.REQUEST_LOGOUT_FAIL,
  props<{ error: string }>()
);
