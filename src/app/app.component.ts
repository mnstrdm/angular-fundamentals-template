import { Component, OnInit } from "@angular/core";

import { ButtonLabels } from "./shared/constants/button-labels";
import { AuthService } from "./auth/services/auth.service";
import { UserStoreService } from "./user/services/user-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  isAuthorized: boolean = false;
  isAdmin!: boolean;
  userName: string | null = "";

  //  text for buttons
  btnTextLogin: string = ButtonLabels.login;
  btnTextLogout: string = ButtonLabels.logout;

  constructor(
    public authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.userStoreService.isAdmin$.subscribe(
      (isadmin) => (this.isAdmin = isadmin)
    );
    this.userStoreService.name$.subscribe((name) => (this.userName = name));
  }

  onLogout() {
    console.log("LOGGED OUT");
    this.authService.logout();
  }
}
