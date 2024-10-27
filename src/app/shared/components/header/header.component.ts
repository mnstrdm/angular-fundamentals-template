import { Component } from "@angular/core";
import { AuthService } from "@app/auth/services/auth.service";
import { AuthenticationFacade } from "@app/store/authentication/authentication.facade";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isAuthorised: boolean = false;

  constructor(
    public authService: AuthService,
    public authenticationFacade: AuthenticationFacade
  ) {}
}
