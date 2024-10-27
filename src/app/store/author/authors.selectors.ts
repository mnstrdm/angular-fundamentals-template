import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthorsState } from "./authors.reducer";

export const selectAuthorsFeature =
  createFeatureSelector<AuthorsState>("authors");

export const getAllAuthorsSelector = createSelector(
  selectAuthorsFeature,
  (state: AuthorsState) => state.allAuthors
);
export const getAuthorsNameSelector = createSelector(
  selectAuthorsFeature,
  (state: AuthorsState) => state.authorsName
);
export const isAllAuthorsLoadingSelector = createSelector(
  selectAuthorsFeature,
  (state: AuthorsState) => state.isAllAuthorsLoading
);
export const isAuthorLoadingSelector = createSelector(
  selectAuthorsFeature,
  (state: AuthorsState) => state.isAuthorLoading
);
export const getErrorMessageSelector = createSelector(
  selectAuthorsFeature,
  (state: AuthorsState) => state.error
);
