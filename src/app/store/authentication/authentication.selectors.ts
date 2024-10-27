import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthenticationState } from "./authentication.reducer";

export const selectAuthenticationFeature =
  createFeatureSelector<AuthenticationState>("authentication");

export const isLoginLoadingSelector = createSelector(
  selectAuthenticationFeature,
  (state: AuthenticationState) => state.isLoginLoading
);
export const errorMessageSelector = createSelector(
  selectAuthenticationFeature,
  (state: AuthenticationState) => state.errorMessage
);
export const isAuthorizedSelector = createSelector(
  selectAuthenticationFeature,
  (state: AuthenticationState) => state.isAuthorized
);
