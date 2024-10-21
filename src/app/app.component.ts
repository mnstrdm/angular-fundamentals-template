import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { ButtonLabels } from "./shared/constants/button-labels";
import { AuthService } from "./auth/services/auth.service";
import { UserStoreService } from "./user/services/user-store.service";
import { User } from "./shared/models/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "courses-app";
  isAuthorized!: boolean;
  isAdmin!: boolean;
  userName: string | undefined = "";
  loggedInUser!: User;

  //  text for buttons
  btnTextLogin: string = ButtonLabels.login;
  btnTextLogout: string = ButtonLabels.logout;

  constructor(
    public authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.userStoreService.loggedInUser$.subscribe({
      next: (user) => {
        this.isAdmin = user.role === "admin" ? true : false;
        this.userName = user.name;
      },
    });

    this.authService.isAuthorized$.subscribe(
      (isAuth) => (this.isAuthorized = isAuth)
    );

    /* this.userStoreService.isAdmin$.subscribe(
      (isadmin) => (this.isAdmin = isadmin)
    );
    this.userStoreService.name$.subscribe((name) => (this.userName = name)); */
  }

  onLogout() {
    console.log("LOGGED OUT");
    this.authService.logout();
  }
}
