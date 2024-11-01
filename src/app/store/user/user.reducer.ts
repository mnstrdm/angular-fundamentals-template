import { User } from "@app/shared/models/user.model";
import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export const userFatureKey = "user";

export interface UserState {
  user: User;
  isUserLoading: boolean;
  errorMessage: string | null;
  isAdmin: boolean;
}

export const initialState: UserState = {
  user: {} as User,
  isUserLoading: false,
  errorMessage: null,
  isAdmin: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.requestUserData, (state) => ({
    ...state,
    isUserLoading: true,
    errorMessage: null,
  })),
  on(UserActions.requestUserDataSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isUserLoading: false,
    errorMessage: null,
    isAdmin: user.role === "admin" ? true : false,
  })),
  on(UserActions.requestUserDataFail, (state, { error }) => ({
    ...state,
    isUserLoading: false,
    errorMessage: error,
  }))
);
