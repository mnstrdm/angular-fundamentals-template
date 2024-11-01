import { UserConstants } from "./user.constants";
import { createAction, props } from "@ngrx/store";

import { User } from "@app/shared/models/user.model";

export const requestUserData = createAction(UserConstants.REQUEST_USER_DATA);

export const requestUserDataSuccess = createAction(
  UserConstants.REQUEST_USER_DATA_SUCCESS,
  props<{ user: User }>()
);

export const requestUserDataFail = createAction(
  UserConstants.REQUEST_USER_DATA_FAIL,
  props<{ error: string }>()
);
