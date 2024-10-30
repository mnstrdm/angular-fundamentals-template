import { Component } from "@angular/core";
import { AuthService } from "@app/auth/services/auth.service";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { AuthenticationFacade } from "@app/store/authentication/authentication.facade";
import { UserStateFacade } from "@app/store/user/user.facade";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isAuthorized$: Observable<boolean> = this.authService.isAuthorized$;
  userName$: Observable<string | undefined> = this.userStateFacade.user$.pipe(
    map((user) => user?.name)
  );
  btnTextLogout: string = ButtonLabels.logout;

  constructor(
    private authService: AuthService,
    private userStateFacade: UserStateFacade,
    private authenticationFacade: AuthenticationFacade
  ) {}

  onLogout() {
    this.authenticationFacade.logout();
  }
}
