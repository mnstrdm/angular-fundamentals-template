import { ActionReducerMap } from "@ngrx/store";
import { CoursesEffects } from "./courses/courses.effects";
import { UserEffects } from "./user/user.effects";
import { AuthorsEffects } from "./author/authors.effects";
import { CoursesState, coursesReducer } from "./courses/courses.reducer";
import { userReducer, UserState } from "./user/user.reducer";
import { authorsReducer, AuthorsState } from "./author/authors.reducer";
import {
  authenticationReducer,
  AuthenticationState,
} from "./authentication/authentication.reducer";
import { AuthenticationEffects } from "./authentication/authentication.effects";

export interface State {
  courses: CoursesState;
  user: UserState;
  authors: AuthorsState;
  authentication: AuthenticationState;
}

export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
  user: userReducer,
  authors: authorsReducer,
  authentication: authenticationReducer,
};

export const effects = [
  CoursesEffects,
  UserEffects,
  AuthorsEffects,
  AuthenticationEffects,
];
