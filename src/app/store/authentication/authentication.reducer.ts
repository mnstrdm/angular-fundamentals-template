import { createReducer, on } from "@ngrx/store";
import * as AuthenticationActions from "./authentication.actions";

export const authenticationFeatureKey = "authentication";

export interface AuthenticationState {
  isLoginLoading: boolean;
  errorMessage: string | null;
  isAuthorized: boolean;
}

export const initialState: AuthenticationState = {
  isLoginLoading: false,
  errorMessage: null,
  isAuthorized: false,
};

export const authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.requestLogin, (state) => ({
    ...state,
    isLoginLoading: true,
    errorMessage: null,
  })),
  on(AuthenticationActions.requestLoginSuccess, (state, { result }) => ({
    ...state,
    isLoginLoading: false,
    errorMessage: null,
    isAuthorized: result ? true : false,
  })),
  on(AuthenticationActions.requestLoginFail, (state, { error }) => ({
    ...state,
    isLoginLoading: false,
    errorMessage: error,
    isAuthorized: false,
  })),
  on(AuthenticationActions.requestRegistration, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(AuthenticationActions.requestRegistrationSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(AuthenticationActions.requestRegistrationFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),
  on(AuthenticationActions.requestLogout, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(AuthenticationActions.requestLogoutSuccess, (state) => ({
    ...state,
    errorMessage: null,
    isAuthorized: false,
  })),
  on(AuthenticationActions.requestLogoutFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);
