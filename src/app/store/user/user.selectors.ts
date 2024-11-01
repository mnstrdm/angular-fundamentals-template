import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserFeature = createFeatureSelector<UserState>("user");

export const isUserLoadingSelector = createSelector(
  selectUserFeature,
  (state: UserState) => state.isUserLoading
);
export const getErrorMessageSelector = createSelector(
  selectUserFeature,
  (state: UserState) => state.errorMessage
);
export const getUserSelector = createSelector(
  selectUserFeature,
  (state: UserState) => state.user
);

export const isAdminSelector = createSelector(
  selectUserFeature,
  (state: UserState) => state.isAdmin
);
