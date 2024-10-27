import { Author } from "@app/shared/models/author.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as AuthorsActions from "./authors.actions";

export const authorsFeatureKey = "authors";

export interface AuthorsState {
  allAuthors: Author[];
  authorsName: string[];
  isAllAuthorsLoading: boolean;
  isAuthorLoading: boolean;
  error: string | null;
}

export const initialState: AuthorsState = {
  allAuthors: [],
  authorsName: [],
  isAllAuthorsLoading: false,
  isAuthorLoading: false,
  error: "",
};

export const authorsReducer = createReducer(
  initialState,
  on(AuthorsActions.requestAllAuthors, (state) => ({
    ...state,
    isAllAuthorsLoading: true,
    error: null,
  })),
  on(AuthorsActions.requestAllAuthorsSuccess, (state, { authors }) => ({
    ...state,
    allAuthors: authors,
    isAllAuthorsLoading: false,
    error: null,
  })),
  on(AuthorsActions.requestAllAuthorsFail, (state, { error }) => ({
    ...state,
    isAllAuthorsLoading: false,
    error: error,
  })),
  on(AuthorsActions.requestAuthorsById, (state) => ({
    ...state,
    isAuthorLoading: true,
    error: null,
  })),
  on(AuthorsActions.requestAuthorsByIdSuccess, (state, { authors }) => ({
    ...state,
    authorsName: authors,
    isAuthorLoading: false,
    error: null,
  })),
  on(AuthorsActions.requestAuthorsByIdFail, (state, { error }) => ({
    ...state,
    isAuthorLoading: false,
    error: error,
  })),
  on(AuthorsActions.requestCreateAuthor, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthorsActions.requestCreateAuthorSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthorsActions.requestCreateAuthorFail, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
