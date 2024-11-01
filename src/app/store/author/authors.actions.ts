import { createAction, props } from "@ngrx/store";
import { AuthorsConstant } from "./authors.constants";

import { Author } from "@app/shared/models/author.model";

export const requestAllAuthors = createAction(
  AuthorsConstant.REQUEST_ALL_AUTHORS
);

export const requestAllAuthorsSuccess = createAction(
  AuthorsConstant.REQUEST_ALL_AUTHORS_SUCCESS,
  props<{ authors: Author[] }>()
);

export const requestAllAuthorsFail = createAction(
  AuthorsConstant.REQUEST_ALL_AUTHORS_FAIL,
  props<{ error: string }>()
);

export const requestAuthorsById = createAction(
  AuthorsConstant.REQUEST_AUTHORS_BY_ID,
  props<{ authors: string[] }>()
);

export const requestAuthorsByIdSuccess = createAction(
  AuthorsConstant.REQUEST_AUTHORS_BY_ID_SUCCESS,
  props<{ authors: string[] }>()
);

export const requestAuthorsByIdFail = createAction(
  AuthorsConstant.REQUEST_AUTHORS_BY_ID_FAIL,
  props<{ error: string }>()
);

export const requestCreateAuthor = createAction(
  AuthorsConstant.REQUEST_CREATE_AUTHOR,
  props<{ name: string }>()
);

export const requestCreateAuthorSuccess = createAction(
  AuthorsConstant.REQUEST_CREATE_AUTHOR_SUCCESS
  //props<{ author: Author }>()
);

export const requestCreateAuthorFail = createAction(
  AuthorsConstant.REQUEST_CREATE_AUTHOR_FAIL,
  props<{ error: string }>()
);
