import { Component, OnInit } from "@angular/core";

import { ButtonLabels } from "./shared/constants/button-labels";
import { AuthService } from "./auth/services/auth.service";
import { UserStoreService } from "./user/services/user-store.service";
import { AuthenticationFacade } from "./store/authentication/authentication.facade";
import { UserStateFacade } from "./store/user/user.facade";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "courses-app";
  //isAuthorized!: boolean;
  isAdmin$: Observable<boolean> = this.userStateFacade.isAdmin$;
  userName: string | undefined = "";
  userName$: Observable<string | undefined> = this.userStateFacade.user$.pipe(
    map((user) => user?.name)
  );
  //loggedInUser!: User;

  //  text for buttons
  btnTextLogin: string = ButtonLabels.login;
  btnTextLogout: string = ButtonLabels.logout;

  constructor(
    public authService: AuthService,
    private userStoreService: UserStoreService,
    private userStateFacade: UserStateFacade,
    private authenticationFacade: AuthenticationFacade
  ) {}

  ngOnInit() {}

  onLogout() {
    this.authenticationFacade.logout();
  }
}
